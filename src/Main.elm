port module Main exposing
    ( Lang(..)
    , Letter(..)
    , main
    , saveStore
    , storeChanged
    , validateAttempt
    )

import Browser
import Browser.Dom as Dom
import Browser.Events as BE
import Dict exposing (Dict)
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import Json.Decode as Decode exposing (Decoder)
import Json.Encode as Encode
import List.Extra as LE
import Markdown
import Process
import Random
import String.Extra as SE
import String.Interpolate exposing (interpolate)
import Task
import Time exposing (Posix)
import Words


type alias Flags =
    { lang : String
    , rawStore : String
    }


type alias Store =
    { lang : Lang
    , logs : List Log
    }


type alias Log =
    { time : Posix
    , lang : Lang
    , word : WordToFind
    , victory : Bool
    , attempts : Int
    }


type Lang
    = English
    | French


type alias Model =
    { store : Store
    , words : List WordToFind
    , state : GameState
    , modal : Maybe Modal
    , time : Posix
    }


type GameState
    = Idle
    | Errored String
    | Ongoing WordToFind (List Attempt) UserInput (Maybe AttemptError)
    | Lost WordToFind (List Attempt)
    | Won WordToFind (List Attempt)


type Letter
    = Unused Char
    | Correct Char
    | Misplaced Char
    | Handled Char


type Modal
    = HelpModal
    | StatsModal


type alias KeyState =
    ( Char, Maybe Letter )


type alias Attempt =
    List Letter


type alias AttemptError =
    String


type alias UserInput =
    String


type alias WordToFind =
    String


type Msg
    = BackSpace
    | CloseModal
    | KeyPressed Char
    | NewGame
    | NewTime Posix
    | NewWord (Maybe WordToFind)
    | NoOp
    | OpenModal Modal
    | StoreChanged String
    | Submit
    | SwitchLang Lang


numberOfLetters : Int
numberOfLetters =
    5


maxAttempts : Int
maxAttempts =
    6


defaultStore : Lang -> Store
defaultStore lang =
    { lang = lang
    , logs = []
    }


init : Flags -> ( Model, Cmd Msg )
init flags =
    let
        lang =
            parseLang flags.lang

        store =
            flags.rawStore
                |> Decode.decodeString decodeStore
                |> Result.withDefault (defaultStore lang)

        model =
            initialModel store
    in
    ( model
    , Random.generate NewWord (randomWord model.words)
    )


initialModel : Store -> Model
initialModel store =
    { store = store
    , words = getWords store.lang
    , state = Idle
    , modal = Nothing
    , time = Time.millisToPosix 0
    }


parseLang : String -> Lang
parseLang string =
    if String.startsWith "fr" string then
        French

    else
        English


langToString : Lang -> String
langToString lang =
    case lang of
        English ->
            "English"

        French ->
            "Français"


langFromString : String -> Lang
langFromString string =
    case string of
        "Français" ->
            French

        _ ->
            English


getWords : Lang -> List WordToFind
getWords lang =
    case lang of
        English ->
            Words.english

        French ->
            Words.french


randomWord : List WordToFind -> Random.Generator (Maybe WordToFind)
randomWord words =
    Random.int 0 (List.length words - 1)
        |> Random.andThen
            (\int ->
                words
                    |> LE.getAt int
                    |> Random.constant
            )


validateAttempt : Lang -> WordToFind -> UserInput -> Result String Attempt
validateAttempt lang word input =
    let
        normalize =
            String.toLower >> SE.removeAccents

        ( wordChars, inputChars ) =
            ( String.toList (normalize word)
            , String.toList (normalize input)
            )
    in
    if List.length inputChars /= numberOfLetters then
        "Not enough letters" |> translate lang [] |> Err

    else if not (List.member (normalize input) (getWords lang)) then
        "Not in dictionary: {0}" |> translate lang [ String.toUpper input ] |> Err

    else
        wordChars
            |> List.map2 (mapChars wordChars) inputChars
            |> handleCorrectDuplicates wordChars
            |> handleMisplacedDuplicates wordChars
            |> Ok


mapChars : List Char -> Char -> Char -> Letter
mapChars wordChars inputChar wordChar =
    if inputChar == wordChar then
        Correct inputChar

    else if List.member inputChar wordChars then
        Misplaced inputChar

    else
        Unused inputChar


{-| Find correctly placed letters; for each, if there's only one occurence in the word,
then check for misplaced same letter in the attempt and mark them as Handled.
-}
handleCorrectDuplicates : List Char -> Attempt -> Attempt
handleCorrectDuplicates wordChars attempt =
    attempt
        |> List.map
            (\letter ->
                case letter of
                    Misplaced c ->
                        let
                            ( nbCharsInWord, nbCorrectInAttempt ) =
                                ( -- count number of this char in target word
                                  List.length (List.filter ((==) c) wordChars)
                                  -- number of already correct char for
                                , List.length (List.filter (letterIs Correct c) attempt)
                                )
                        in
                        if nbCorrectInAttempt >= nbCharsInWord then
                            -- there's enough correct letters for this char already
                            Handled c

                        else
                            letter

                    _ ->
                        letter
            )


{-| If a word contains a single A, and you provide an attempt with 3 As, you'll have 3
misplaced As while we only want one, ideally the first one, with others marked as Handled.
-}
handleMisplacedDuplicates : List Char -> Attempt -> Attempt
handleMisplacedDuplicates wordChars =
    List.foldl
        (\letter acc ->
            case letter of
                Misplaced c ->
                    let
                        ( nbCharInWord, nbCharInAcc ) =
                            -- count number of this char in target word
                            ( List.length (List.filter ((==) c) wordChars)
                              -- number of already misplaced char for in accumulator
                            , List.length (List.filter (letterIs Misplaced c) acc)
                            )
                    in
                    if nbCharInAcc >= nbCharInWord then
                        -- there's enough misplaced letters for this char already
                        acc ++ [ Handled c ]

                    else
                        acc ++ [ letter ]

                _ ->
                    acc ++ [ letter ]
        )
        []


hasWon : List Attempt -> Bool
hasWon attempts =
    case attempts of
        [] ->
            False

        last :: _ ->
            List.all
                (\letter ->
                    case letter of
                        Correct _ ->
                            True

                        _ ->
                            False
                )
                last


checkGame : WordToFind -> List Attempt -> GameState
checkGame word attempts =
    if hasWon attempts then
        Won word attempts

    else if List.length attempts >= maxAttempts then
        Lost word attempts

    else
        Ongoing word attempts "" Nothing


defocus : String -> Cmd Msg
defocus domId =
    Process.sleep 1
        |> Task.andThen (\_ -> Dom.blur domId)
        |> Task.attempt (always NoOp)


update : Msg -> Model -> ( Model, Cmd Msg )
update msg ({ store } as model) =
    case ( msg, model.state ) of
        ( BackSpace, Ongoing word attempts input _ ) ->
            let
                newInput =
                    String.toList input
                        |> List.reverse
                        |> List.drop 1
                        |> List.reverse
                        |> String.fromList
            in
            ( { model | state = Ongoing word attempts newInput Nothing }
            , Cmd.none
            )

        ( BackSpace, _ ) ->
            ( model, Cmd.none )

        ( CloseModal, _ ) ->
            ( { model | modal = Nothing }, Cmd.none )

        ( KeyPressed char, Ongoing word attempts input _ ) ->
            let
                newInput =
                    String.toList input
                        ++ [ char ]
                        |> List.take numberOfLetters
                        |> String.fromList
            in
            ( { model | state = Ongoing word attempts newInput Nothing }
            , Cmd.none
            )

        ( KeyPressed _, _ ) ->
            ( model, Cmd.none )

        ( NewGame, _ ) ->
            let
                newModel =
                    initialModel store
            in
            ( newModel
            , Random.generate NewWord (randomWord newModel.words)
            )

        ( NewTime time, _ ) ->
            ( { model | time = time }, Cmd.none )

        ( NewWord (Just newWord), Idle ) ->
            ( { model | state = Ongoing newWord [] "" Nothing }
            , [ English, French ]
                |> List.map (langBtnId >> defocus)
                |> Cmd.batch
            )

        ( NewWord Nothing, Idle ) ->
            ( { model
                | state =
                    "Unable to pick a word."
                        |> translate store.lang []
                        |> Errored
              }
            , Cmd.none
            )

        ( NoOp, _ ) ->
            ( model, Cmd.none )

        ( OpenModal modal, _ ) ->
            ( { model | modal = Just modal }, Cmd.none )

        ( StoreChanged rawStore, _ ) ->
            case Decode.decodeString decodeStore rawStore of
                Ok newStore ->
                    ( { model | store = newStore }, Cmd.none )

                Err _ ->
                    ( model, Cmd.none )

        ( Submit, Ongoing word attempts input _ ) ->
            case validateAttempt store.lang word input of
                Ok attempt ->
                    logResult
                        ( { model | state = checkGame word (attempt :: attempts) }
                        , Cmd.none
                        )

                Err error ->
                    ( { model | state = Ongoing word attempts input (Just error) }
                    , Cmd.none
                    )

        ( Submit, _ ) ->
            ( model, Cmd.none )

        ( SwitchLang lang, _ ) ->
            update NewGame { model | store = { store | lang = lang } }

        _ ->
            ( { model
                | state =
                    "General game state error. This is bad."
                        |> translate store.lang []
                        |> Errored
              }
            , Cmd.none
            )


charToText : Char -> String
charToText =
    Char.toUpper >> List.singleton >> String.fromList


viewAttempt : Attempt -> Html Msg
viewAttempt =
    List.map
        (\letter ->
            case letter of
                Misplaced char ->
                    viewTile "btn-warning" char

                Correct char ->
                    viewTile "btn-success" char

                Unused char ->
                    viewTile "btn-dark" char

                Handled char ->
                    viewTile "btn-secondary" char
        )
        >> viewBoardRow


viewBoardRow : List (Html Msg) -> Html Msg
viewBoardRow =
    div
        [ class "BoardRow"
        , style "grid-template-columns"
            (interpolate "repeat({0}, 1fr)"
                [ String.fromInt numberOfLetters ]
            )
        ]


letterIs : (Char -> Letter) -> Char -> Letter -> Bool
letterIs build char =
    (==) (build char)


newGameButton : Lang -> Html Msg
newGameButton lang =
    button
        [ class "btn btn-lg btn-primary"
        , onClick NewGame
        ]
        [ "Play again"
            |> translate lang []
            |> text
        ]


definitionLink : Lang -> WordToFind -> Html Msg
definitionLink lang word =
    a
        [ class "btn btn-lg btn-info"
        , target "_blank"
        , href
            (case lang of
                French ->
                    "https://fr.wiktionary.org/wiki/" ++ word

                English ->
                    "https://en.wiktionary.org/wiki/" ++ word
            )
        ]
        [ "Definition"
            |> translate lang [ String.toUpper word ]
            |> text
        ]


endGameButtons : Lang -> WordToFind -> Html Msg
endGameButtons lang word =
    div [ class "EndGameButtons btn-group" ]
        [ definitionLink lang word
        , newGameButton lang
        ]


dispositions : Lang -> List (List Char)
dispositions lang =
    List.map String.toList
        (case lang of
            French ->
                [ "azertyuiop", "qsdfghjklm", "⏎wxcvbn⌫" ]

            English ->
                [ "qwertyuiop", "asdfghjkl", "⏎zxcvbnm⌫" ]
        )


keyState : List Attempt -> Char -> KeyState
keyState attempts char =
    ( char
    , if List.any (List.any (letterIs Correct char)) attempts then
        Just (Correct char)

      else if List.any (List.any (letterIs Misplaced char)) attempts then
        Just (Misplaced char)

      else if List.any (List.any (letterIs Unused char)) attempts then
        Just (Unused char)

      else
        Nothing
    )


viewKeyboard : Lang -> List Attempt -> Html Msg
viewKeyboard lang attempts =
    dispositions lang
        |> List.map
            (div [ class "KeyboardRow" ]
                << List.map (keyState attempts >> viewKeyState)
            )
        |> footer [ class "Keyboard" ]


viewKeyState : KeyState -> Html Msg
viewKeyState ( char, letter ) =
    let
        baseClasses =
            "KeyboardKey btn"

        ( classes, msg ) =
            case letter of
                Just (Correct _) ->
                    ( "btn-success", KeyPressed char )

                Just (Misplaced _) ->
                    ( "btn-warning", KeyPressed char )

                Just (Unused _) ->
                    ( "bg-dark text-light", KeyPressed char )

                _ ->
                    if char == '⌫' then
                        ( "btn-info px-3", BackSpace )

                    else if char == '⏎' then
                        ( "btn-info px-3", Submit )

                    else
                        ( "btn-secondary", KeyPressed char )
    in
    button
        [ class (String.join " " [ baseClasses, classes ])
        , onClick msg
        ]
        [ text (charToText char) ]


viewBoard : Maybe UserInput -> List Attempt -> Html Msg
viewBoard input attempts =
    let
        remaining =
            maxAttempts
                - List.length attempts
                - (input |> Maybe.map (always 2) |> Maybe.withDefault 1)
    in
    div [ class "BoardContainer" ]
        [ [ attempts
                |> List.reverse
                |> List.map (viewAttempt >> Just)
          , [ input |> Maybe.map viewInput ]
          , List.range 0 remaining
                |> List.map
                    (\_ ->
                        List.repeat numberOfLetters '\u{00A0}'
                            |> String.fromList
                            |> viewInput
                            |> Just
                    )
          ]
            |> List.concat
            |> List.filterMap identity
            |> viewBoardElement
        ]


viewBoardElement : List (Html Msg) -> Html Msg
viewBoardElement =
    div
        [ class "Board"
        , style "grid-template-rows"
            (interpolate "repeat({0}, 1fr)"
                [ String.fromInt maxAttempts ]
            )
        ]


viewTile : String -> Char -> Html Msg
viewTile classes char =
    div
        [ class <| "btn BoardTile rounded-0 " ++ classes ]
        [ text (charToText char) ]


viewInput : UserInput -> Html Msg
viewInput input =
    let
        chars =
            String.toList input

        spots =
            chars ++ LE.initialize (numberOfLetters - List.length chars) (always '\u{00A0}')
    in
    spots
        |> List.map (viewTile "btn-secondary")
        |> viewBoardRow


langBtnId : Lang -> String
langBtnId =
    langToString
        >> String.toLower
        >> String.slice 0 2
        >> (++) "btn-lang-"


selectLang : Lang -> Html Msg
selectLang lang =
    [ English, French ]
        |> List.map
            (\lang_ ->
                li [ class "nav-item" ]
                    [ button
                        [ type_ "button"
                        , id (langBtnId lang_)
                        , class "nav-link px-2 py-1 mx-1"
                        , classList [ ( "active", lang == lang_ ) ]
                        , title (langToString lang_)
                        , onClick (SwitchLang lang_)
                        ]
                        [ span [ class "d-none d-sm-block" ]
                            [ lang_ |> langToString |> text ]
                        , span [ class "d-block d-sm-none" ]
                            [ lang_ |> langToString |> String.slice 0 2 |> text ]
                        ]
                    ]
            )
        |> div [ class "nav nav-pills nav-fill" ]


attemptDescription : Lang -> Attempt -> List String
attemptDescription lang =
    List.map
        (\letter ->
            let
                ( char, trans ) =
                    case letter of
                        Correct c ->
                            ( c, "{0} is at the correct spot" )

                        Misplaced c ->
                            ( c, "{0} is misplaced" )

                        Unused c ->
                            ( c, "{0} is unused" )

                        Handled c ->
                            ( c, "{0} is unused" )
            in
            trans |> translate lang [ charToText char ]
        )


viewHelp : Store -> List (Html Msg)
viewHelp { lang } =
    let
        demo =
            [ Correct 'm'
            , Misplaced 'e'
            , Unused 't'
            , Correct 'a'
            , Unused 's'
            ]
    in
    [ p []
        [ "Guess a {0} letters {1} word in {2} attempts or less."
            |> translate lang
                [ String.fromInt numberOfLetters
                , langToString lang
                , String.fromInt maxAttempts
                ]
            |> text
        ]
    , p []
        [ "Use your dekstop computer keyboard to enter words, or the virtual one at the bottom."
            |> translate lang []
            |> text
        ]
    , div [ class "mb-3" ] [ viewAttempt demo ]
    , p [] [ "In this example:" |> translate lang [] |> text ]
    , attemptDescription lang demo
        |> List.map (\line -> li [] [ text line ])
        |> ul []
    , p []
        [ "The keyboard at the bottom highlight letters which have been played already."
            |> translate lang []
            |> text
        ]
    , "Inspired by [Wordle]({0}) - [Source code]({1})."
        |> translate lang
            [ "https://www.powerlanguage.co.uk/wordle/"
            , "https://github.com/n1k0/wordlem"
            ]
        |> Markdown.toHtml [ class "Markdown" ]
    ]


viewStats : Store -> List (Html Msg)
viewStats { lang } =
    [ text "stats" ]


layout : Model -> List (Html Msg) -> Html Msg
layout { store, modal } content =
    div []
        [ main_ [ class "Game" ]
            (header [ class "d-flex justify-content-between align-items-center p-2 pb-0" ]
                [ h1 [ class "p-0 fs-2" ] [ text "Wordlem" ]
                , selectLang store.lang
                , button
                    [ class "btn btn-sm btn-dark fw-bold rounded-circle"
                    , title "Stats"
                    , onClick (OpenModal StatsModal)
                    ]
                    [ text "\u{00A0}🏆\u{00A0}" ]
                , button
                    [ class "btn btn-sm btn-dark fw-bold rounded-circle"
                    , title "Help"
                    , onClick (OpenModal HelpModal)
                    ]
                    [ text "\u{00A0}?\u{00A0}" ]
                ]
                :: content
            )
        , case modal of
            Just HelpModal ->
                viewModal store "Help" (viewHelp store)

            Just StatsModal ->
                viewModal store "Stats" (viewStats store)

            Nothing ->
                text ""
        ]


alert : String -> String -> Html Msg
alert level message =
    div
        [ class <| "Flash alert alert-" ++ level ]
        [ text message ]


viewModal : Store -> String -> List (Html Msg) -> Html Msg
viewModal { lang } title content =
    let
        modalContentAttrs =
            [ class "modal-content"
            , custom "mouseup"
                (Decode.succeed
                    { message = NoOp
                    , stopPropagation = True
                    , preventDefault = True
                    }
                )
            ]
    in
    div [ class "d-block" ]
        [ div
            [ class "modal d-block fade show"
            , attribute "tabindex" "-1"
            , attribute "aria-modal" "true"
            , attribute "role" "dialog"
            , custom "mouseup"
                (Decode.succeed
                    { message = CloseModal
                    , stopPropagation = True
                    , preventDefault = True
                    }
                )
            ]
            [ div
                [ class "modal-dialog modal-dialog-centered modal-dialog-scrollable"
                , attribute "aria-modal" "true"
                ]
                [ div modalContentAttrs
                    [ div [ class "modal-header" ]
                        [ h6 [ class "modal-title" ]
                            [ title |> translate lang [] |> text ]
                        , button
                            [ type_ "button"
                            , class "btn-close"
                            , attribute "aria-label" "Close"
                            , onClick CloseModal
                            ]
                            []
                        ]
                    , div
                        [ class "modal-body no-scroll-chaining" ]
                        content
                    ]
                ]
            ]
        , div [ class "modal-backdrop fade show" ] []
        ]


view : Model -> Html Msg
view ({ store, state } as model) =
    layout model
        (case state of
            Idle ->
                [ "Loading game…"
                    |> translate store.lang []
                    |> text
                ]

            Errored gameError ->
                [ "Game data couldn't load: {0}"
                    |> translate store.lang [ gameError ]
                    |> alert "danger"
                , newGameButton store.lang
                ]

            Won word attempts ->
                [ viewBoard Nothing attempts
                , endGameButtons store.lang word
                , viewKeyboard store.lang attempts
                , "Well done!"
                    |> translate store.lang []
                    |> alert "success"
                ]

            Lost word attempts ->
                [ word
                    |> String.toList
                    |> List.map Correct
                    |> (\a -> a :: attempts)
                    |> viewBoard Nothing
                , endGameButtons store.lang word
                , viewKeyboard store.lang attempts
                , "Ok that was hard."
                    |> translate store.lang []
                    |> alert "success"
                ]

            Ongoing _ attempts input error ->
                [ viewBoard (Just input) attempts
                , error |> Maybe.map (alert "warning") |> Maybe.withDefault (text "")
                , viewKeyboard store.lang attempts
                ]
        )



-- Logging


logResult : ( Model, Cmd Msg ) -> ( Model, Cmd Msg )
logResult ( { store, state, time } as model, cmds ) =
    let
        logData =
            case state of
                Won word attempts ->
                    Just ( True, word, List.length attempts )

                Lost word attempts ->
                    Just ( False, word, List.length attempts )

                _ ->
                    Nothing
    in
    case logData of
        Just ( victory, word, nbAttempts ) ->
            let
                newStore =
                    store |> logEntry (Log time store.lang word victory nbAttempts)
            in
            ( { model | store = newStore }
            , newStore |> encodeStore |> Encode.encode 0 |> saveStore
            )

        Nothing ->
            ( model, cmds )


logEntry : Log -> Store -> Store
logEntry log ({ logs } as store) =
    { store | logs = log :: logs }



-- I18n


translate : Lang -> List String -> String -> String
translate lang params string =
    case lang of
        English ->
            interpolate string params

        French ->
            translations
                |> Dict.get string
                |> Maybe.withDefault string
                |> (\s -> interpolate s params)


translations : Dict String String
translations =
    Dict.fromList
        [ ( "{0} is at the correct spot"
          , "{0} est à la bonne position"
          )
        , ( "{0} is misplaced"
          , "{0} est mal positionnée"
          )
        , ( "{0} is unused"
          , "{0} n'est pas utilisée"
          )
        , ( "Definition"
          , "Définition"
          )
        , ( "Game data couldn't load: {0}"
          , "Les données du jeu n'ont pas été chargé\u{00A0}: {0}"
          )
        , ( "General game state error. This is bad."
          , "Erreur générale. C'est pas bon signe."
          )
        , ( "Guess a {0} letters {1} word in {2} attempts or less."
          , "Devinez un mot {1} de {0} lettres en {2} essais ou moins."
          )
        , ( "Help"
          , "Aide"
          )
        , ( "In this example:"
          , "Dans cet exemple\u{00A0}:"
          )
        , ( "Inspired by [Wordle]({0}) - [Source code]({1})."
          , "Inspiré de [Wordle]({0}) - [Code source]({1})."
          )
        , ( "Loading game…"
          , "Chargement du jeu…"
          )
        , ( "Ok that was hard."
          , "Pas facile, hein\u{00A0}?"
          )
        , ( "Play again"
          , "Rejouer"
          )
        , ( "Not in dictionary: {0}"
          , "Absent du dictionnaire\u{00A0}: {0}"
          )
        , ( "Not enough letters"
          , "Mot trop court"
          )
        , ( "Stats"
          , "Statistiques"
          )
        , ( "Unable to pick a word."
          , "Impossible de sélectionner un mot à trouver."
          )
        , ( "Use your dekstop computer keyboard to enter words, or the virtual one at the bottom."
          , "Utilisez le clavier de votre ordinateur pour saisir vos propositions, ou celui proposé au bas de l'écran."
          )
        , ( "Well done!"
          , "Bien joué\u{00A0}!"
          )
        ]



-- Encoders


encodeStore : Store -> Encode.Value
encodeStore store =
    Encode.object
        [ ( "lang", Encode.string (langToString store.lang) )
        , ( "logs", Encode.list encodeLog store.logs )
        ]


encodeLog : Log -> Encode.Value
encodeLog log =
    Encode.object
        [ ( "time", log.time |> Time.posixToMillis |> Encode.int )
        , ( "lang", log.lang |> langToString |> Encode.string )
        , ( "word", log.word |> Encode.string )
        , ( "victory", log.victory |> Encode.bool )
        , ( "attempts", log.attempts |> Encode.int )
        ]



-- Decoders


decodeStore : Decoder Store
decodeStore =
    Decode.map2 Store
        (Decode.field "lang" (Decode.map langFromString Decode.string))
        (Decode.field "log" (Decode.list decodeLog))


decodeLog : Decoder Log
decodeLog =
    Decode.map5 Log
        (Decode.field "time" (Decode.map Time.millisToPosix Decode.int))
        (Decode.field "lang" (Decode.map langFromString Decode.string))
        (Decode.field "word" Decode.string)
        (Decode.field "victory" Decode.bool)
        (Decode.field "attemps" Decode.int)


decodeKey : Decoder Msg
decodeKey =
    Decode.field "key" Decode.string
        |> Decode.andThen
            (\keyCode ->
                case keyCode of
                    "Backspace" ->
                        Decode.succeed BackSpace

                    "Enter" ->
                        Decode.succeed Submit

                    "Escape" ->
                        Decode.succeed CloseModal

                    string ->
                        if String.length string /= 1 then
                            Decode.fail "no char"

                        else
                            case List.head (String.toList string) of
                                Just char ->
                                    if Char.toCode char < 65 || Char.toCode char > 122 then
                                        Decode.fail "no char"

                                    else
                                        Decode.succeed (KeyPressed (Char.toLower char))

                                Nothing ->
                                    Decode.fail "no char"
            )



-- Ports


port saveStore : String -> Cmd msg


port storeChanged : (String -> msg) -> Sub msg



-- Main stuff


main : Program Flags Model Msg
main =
    Browser.element
        { init = init
        , view = view
        , update = update
        , subscriptions = subscriptions
        }


subscriptions : Model -> Sub Msg
subscriptions { state } =
    Sub.batch
        [ Time.every 1000 NewTime
        , storeChanged StoreChanged
        , case state of
            Ongoing _ _ _ _ ->
                BE.onKeyDown decodeKey

            _ ->
                Sub.none
        ]
