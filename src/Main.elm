port module Main exposing
    ( Lang(..)
    , Letter(..)
    , main
    , saveStore
    , storeChanged
    , validateGuess
    )

import Browser
import Browser.Dom as Dom
import Browser.Events as BE
import Dict exposing (Dict)
import FormatNumber
import FormatNumber.Locales exposing (Decimals(..), frenchLocale)
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
    , guesses : Int
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
    , menuOpened : Bool
    }


type GameState
    = Idle
    | Errored Error
    | Ongoing WordToFind (List Guess) UserInput (Maybe AttemptError)
    | Lost WordToFind (List Guess)
    | Won WordToFind (List Guess)


type Letter
    = Unused Char
    | Correct Char
    | Misplaced Char
    | Handled Char


type Modal
    = HelpModal
    | StatsModal


type Error
    = DecodeError String
    | LoadError
    | StateError


type alias KeyState =
    ( Char, Maybe Letter )


type alias Guess =
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
    | ToggleMenu


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

        ( model, cmds ) =
            case store of
                Ok store_ ->
                    ( initialModel store_, Cmd.none )

                Err error ->
                    let
                        newStore =
                            defaultStore lang

                        newModel =
                            initialModel newStore
                    in
                    ( { newModel
                        | state =
                            error
                                |> Decode.errorToString
                                |> DecodeError
                                |> Errored
                      }
                    , newStore |> encodeStore |> Encode.encode 0 |> saveStore
                    )
    in
    ( model
    , Cmd.batch
        [ Random.generate NewWord (randomWord model.words)
        , cmds
        ]
    )


initialModel : Store -> Model
initialModel store =
    { store = store
    , words = getWords store.lang
    , state = Idle
    , modal = Nothing
    , time = Time.millisToPosix 0
    , menuOpened = False
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


validateGuess : Lang -> WordToFind -> UserInput -> Result String Guess
validateGuess lang word input =
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
then check for misplaced same letter in the guess and mark them as Handled.
-}
handleCorrectDuplicates : List Char -> Guess -> Guess
handleCorrectDuplicates wordChars guess =
    guess
        |> List.map
            (\letter ->
                case letter of
                    Misplaced c ->
                        let
                            ( nbCharsInWord, nbCorrectInAttempt ) =
                                ( -- count number of this char in target word
                                  List.length (List.filter ((==) c) wordChars)
                                  -- number of already correct char for
                                , List.length (List.filter (letterIs Correct c) guess)
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


{-| If a word contains a single A, and you provide an guess with 3 As, you'll have 3
misplaced As while we only want one, ideally the first one, with others marked as Handled.
-}
handleMisplacedDuplicates : List Char -> Guess -> Guess
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


hasWon : List Guess -> Bool
hasWon guesses =
    case guesses of
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


checkGame : WordToFind -> List Guess -> GameState
checkGame word guesses =
    if hasWon guesses then
        Won word guesses

    else if List.length guesses >= maxAttempts then
        Lost word guesses

    else
        Ongoing word guesses "" Nothing


defocus : String -> Cmd Msg
defocus domId =
    Process.sleep 1
        |> Task.andThen (\_ -> Dom.blur domId)
        |> Task.attempt (always NoOp)


update : Msg -> Model -> ( Model, Cmd Msg )
update msg ({ store } as model) =
    case ( msg, model.state ) of
        ( BackSpace, Ongoing word guesses input _ ) ->
            let
                newInput =
                    String.toList input
                        |> List.reverse
                        |> List.drop 1
                        |> List.reverse
                        |> String.fromList
            in
            ( { model
                | state = Ongoing word guesses newInput Nothing
                , menuOpened = False
              }
            , Cmd.none
            )

        ( BackSpace, _ ) ->
            ( { model | menuOpened = False }
            , Cmd.none
            )

        ( CloseModal, _ ) ->
            ( { model | modal = Nothing, menuOpened = False }
            , Cmd.none
            )

        ( KeyPressed char, Ongoing word guesses input _ ) ->
            let
                newInput =
                    String.toList input
                        ++ [ char ]
                        |> List.take numberOfLetters
                        |> String.fromList
            in
            ( { model
                | state = Ongoing word guesses newInput Nothing
                , menuOpened = False
              }
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
            ( { model
                | state = Ongoing newWord [] "" Nothing
                , menuOpened = False
              }
            , [ "btn-lang-en", "btn-lang-fr", "btn-stats", "btn-help" ]
                |> List.map defocus
                |> Cmd.batch
            )

        ( NewWord Nothing, Idle ) ->
            ( { model
                | state = Errored LoadError
                , menuOpened = False
              }
            , Cmd.none
            )

        ( NewWord _, Errored _ ) ->
            ( { model | menuOpened = False }
            , Cmd.none
            )

        ( NoOp, _ ) ->
            ( model, Cmd.none )

        ( OpenModal modal, _ ) ->
            ( { model | modal = Just modal, menuOpened = False }, Cmd.none )

        ( StoreChanged rawStore, _ ) ->
            case Decode.decodeString decodeStore rawStore of
                Ok newStore ->
                    ( { model | store = newStore }, Cmd.none )

                Err _ ->
                    ( model, Cmd.none )

        ( Submit, Ongoing word guesses input _ ) ->
            case validateGuess store.lang word input of
                Ok guess ->
                    logResult
                        ( { model
                            | state = checkGame word (guess :: guesses)
                            , menuOpened = False
                          }
                        , Cmd.none
                        )

                Err error ->
                    ( { model
                        | state = Ongoing word guesses input (Just error)
                        , menuOpened = False
                      }
                    , Cmd.none
                    )

        ( Submit, _ ) ->
            ( { model | menuOpened = False }, Cmd.none )

        ( SwitchLang lang, _ ) ->
            update NewGame
                { model
                    | store = { store | lang = lang }
                    , menuOpened = False
                }

        ( ToggleMenu, _ ) ->
            ( { model | menuOpened = not model.menuOpened }
            , Cmd.none
            )

        _ ->
            ( { model | state = Errored StateError, menuOpened = False }
            , Cmd.none
            )


charToText : Char -> String
charToText =
    Char.toUpper >> List.singleton >> String.fromList


viewAttempt : Guess -> Html Msg
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


keyState : List Guess -> Char -> KeyState
keyState guesses char =
    ( char
    , if List.any (List.any (letterIs Correct char)) guesses then
        Just (Correct char)

      else if List.any (List.any (letterIs Misplaced char)) guesses then
        Just (Misplaced char)

      else if List.any (List.any (letterIs Unused char)) guesses then
        Just (Unused char)

      else
        Nothing
    )


viewKeyboard : Lang -> List Guess -> Html Msg
viewKeyboard lang guesses =
    dispositions lang
        |> List.map
            (div [ class "KeyboardRow" ]
                << List.map (keyState guesses >> viewKeyState)
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


viewBoard : Maybe UserInput -> List Guess -> Html Msg
viewBoard input guesses =
    let
        remaining =
            maxAttempts
                - List.length guesses
                - (input |> Maybe.map (always 2) |> Maybe.withDefault 1)
    in
    div [ class "BoardContainer" ]
        [ [ guesses
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


guessDescription : Lang -> Guess -> List String
guessDescription lang =
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
        [ "Guess a {0} letters {1} word in {2} guesses or less."
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
    , guessDescription lang demo
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
viewStats { lang, logs } =
    case logs of
        [] ->
            [ "No game data yet" |> translate lang [] |> text ]

        logs_ ->
            [ viewStatsTable lang logs_ ]


formatPercent : Float -> String
formatPercent float =
    FormatNumber.format { frenchLocale | decimals = Exact 2 } float ++ "%"


progressBar : Float -> Html Msg
progressBar percent =
    div
        [ class "progress" ]
        [ div
            [ class "progress-bar bg-success"
            , style "width" <| String.fromFloat percent ++ "%"
            ]
            []
        ]


viewStatsTable : Lang -> List Log -> Html Msg
viewStatsTable lang logs =
    let
        totalWins =
            logs |> List.filter .victory |> List.length

        row nbGuess =
            let
                wins =
                    logs
                        |> List.filter (\{ victory, guesses } -> victory && guesses == nbGuess)
                        |> List.length

                percent =
                    toFloat wins / toFloat totalWins * 100
            in
            tr []
                [ th [ class "text-end" ] [ text (String.fromInt nbGuess) ]
                , td [ class "text-end" ] [ wins |> String.fromInt |> text ]
                , td [ class "text-end" ] [ text (formatPercent percent) ]
                , td [ class "w-100" ] [ progressBar percent ]
                ]
    in
    div [ class "table-responsive" ]
        [ h2 [ class "fs-5" ] [ "Guess distribution" |> translate lang [] |> text ]
        , table [ class "table" ]
            [ List.range 1 6
                |> List.map row
                |> tbody []
            ]
        ]


layout : Model -> List (Html Msg) -> Html Msg
layout ({ store, modal } as model) content =
    div []
        [ main_ [ class "Game" ]
            (viewHeader model :: content)
        , case modal of
            Just HelpModal ->
                viewModal store "Help" (viewHelp store)

            Just StatsModal ->
                viewModal store "Stats" (viewStats store)

            Nothing ->
                text ""
        ]


icon : String -> Html Msg
icon name =
    i [ class <| "me-1 icon icon-" ++ name ] []


viewHeader : Model -> Html Msg
viewHeader { store, menuOpened } =
    nav [ class "navbar fixed-top navbar-expand-lg navbar-dark bg-dark" ]
        [ div [ class "Header container" ]
            [ span [ class "navbar-brand" ] [ text "Wordlem" ]
            , button
                [ type_ "button"
                , class "navbar-toggler"
                , classList [ ( "collapsed", not menuOpened ) ]
                , onClick ToggleMenu
                , attribute "aria-label" "Navigation"
                , attribute "aria-controls" "menuBar"
                , attribute "aria-expanded"
                    (if menuOpened then
                        "true"

                     else
                        "false"
                    )
                ]
                [ span [ class "navbar-toggler-icon" ] [] ]
            , div
                [ id "menuBar"
                , class "navbar-collapse collapse"
                , classList [ ( "show", menuOpened ) ]
                ]
                [ ul [ class "navbar-nav me-auto mb-2 mb-lg-0" ]
                    [ li [ class "nav-item" ]
                        [ button
                            [ type_ "button"
                            , id "btn-lang-fr"
                            , class "btn btn-link nav-link"
                            , classList [ ( "active", store.lang == French ) ]
                            , onClick (SwitchLang French)
                            ]
                            [ text "Jouer en Français" ]
                        ]
                    , li [ class "nav-item" ]
                        [ button
                            [ type_ "button"
                            , id "btn-lang-en"
                            , class "btn btn-link nav-link"
                            , classList [ ( "active", store.lang == English ) ]
                            , onClick (SwitchLang English)
                            ]
                            [ text "Play in English" ]
                        ]
                    , li [ class "nav-item" ]
                        [ button
                            [ type_ "button"
                            , id "btn-stats"
                            , class "btn btn-link nav-link"
                            , onClick (OpenModal StatsModal)
                            ]
                            [ icon "stats"
                            , "Stats" |> translate store.lang [] |> text
                            ]
                        ]
                    , li [ class "nav-item" ]
                        [ button
                            [ type_ "button"
                            , id "btn-help"
                            , class "btn btn-link nav-link"
                            , onClick (OpenModal HelpModal)
                            ]
                            [ icon "help"
                            , "Help" |> translate store.lang [] |> text
                            ]
                        ]
                    ]
                ]
            ]
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


viewError : Lang -> Error -> Html Msg
viewError lang error =
    div [ class "alert alert-danger m-3" ]
        [ case error of
            DecodeError details ->
                div []
                    [ p []
                        [ "Unable to restore previously saved data."
                            |> translate lang []
                            |> text
                        ]
                    , pre [ class "pb-3" ] [ text details ]
                    ]

            LoadError ->
                "Unable to pick a word."
                    |> translate lang []
                    |> text

            StateError ->
                "General game state error. This is bad."
                    |> translate lang []
                    |> text
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

            Errored error ->
                [ viewError store.lang error
                , p [ class "text-center" ]
                    [ newGameButton store.lang ]
                ]

            Won word guesses ->
                [ viewBoard Nothing guesses
                , endGameButtons store.lang word
                , viewKeyboard store.lang guesses
                , "Well done!"
                    |> translate store.lang []
                    |> alert "success"
                ]

            Lost word guesses ->
                [ word
                    |> String.toList
                    |> List.map Correct
                    |> (\a -> a :: guesses)
                    |> viewBoard Nothing
                , endGameButtons store.lang word
                , viewKeyboard store.lang guesses
                , "Ok that was hard."
                    |> translate store.lang []
                    |> alert "success"
                ]

            Ongoing _ guesses input error ->
                [ viewBoard (Just input) guesses
                , error |> Maybe.map (alert "warning") |> Maybe.withDefault (text "")
                , viewKeyboard store.lang guesses
                ]
        )



-- Logging


logResult : ( Model, Cmd Msg ) -> ( Model, Cmd Msg )
logResult ( { store, state, time } as model, cmds ) =
    let
        logData =
            case state of
                Won word guesses ->
                    Just ( True, word, List.length guesses )

                Lost word guesses ->
                    Just ( False, word, List.length guesses )

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
        , ( "Erreur: {0}"
          , "Erreur\u{00A0}: {0}"
          )
        , ( "Game data couldn't load: {0}"
          , "Les données du jeu n'ont pas été chargé\u{00A0}: {0}"
          )
        , ( "General game state error. This is bad."
          , "Erreur générale. C'est pas bon signe."
          )
        , ( "Guess a {0} letters {1} word in {2} guesses or less."
          , "Devinez un mot {1} de {0} lettres en {2} essais ou moins."
          )
        , ( "Guess distribution"
          , "Distribution des scores"
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
        , ( "No game data yet"
          , "Pas de données de parties jouées"
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
        , ( "Unable to restore previously saved data."
          , "Impossible de restaurer les données précedemment sauvegardées."
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
        , ( "guesses", log.guesses |> Encode.int )
        ]



-- Decoders


decodeStore : Decoder Store
decodeStore =
    Decode.map2 Store
        (Decode.field "lang" (Decode.map langFromString Decode.string))
        (Decode.field "logs" (Decode.list decodeLog))


decodeLog : Decoder Log
decodeLog =
    Decode.map5 Log
        (Decode.field "time" (Decode.map Time.millisToPosix Decode.int))
        (Decode.field "lang" (Decode.map langFromString Decode.string))
        (Decode.field "word" Decode.string)
        (Decode.field "victory" Decode.bool)
        (Decode.field "guesses" Decode.int)


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
                        case String.toList string of
                            [] ->
                                Decode.fail ("Discarded key " ++ string)

                            [ char ] ->
                                if Char.toCode char < 65 || Char.toCode char > 122 then
                                    Decode.fail ("Unsupported char: " ++ String.fromList [ char ])

                                else
                                    Decode.succeed (KeyPressed (Char.toLower char))

                            _ ->
                                Decode.fail ("Discarded key " ++ string)
            )



-- Main & subs


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



-- Ports


port saveStore : String -> Cmd msg


port storeChanged : (String -> msg) -> Sub msg
