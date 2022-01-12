module Main exposing (Lang(..), Letter(..), main, validateAttempt)

-- import Markdown

import Browser
import Browser.Dom as Dom
import Browser.Events as BE
import Dict exposing (Dict)
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import Json.Decode as Decode
import List.Extra as LE
import Process
import Random
import String.Extra as SE
import String.Interpolate exposing (interpolate)
import Task
import Words


type alias Flags =
    { lang : String }


type Lang
    = English
    | French


type alias Model =
    { lang : Lang
    , words : List WordToFind
    , state : GameState
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
    | KeyPressed Char
    | NewGame
    | NewWord (Maybe WordToFind)
    | NoOp
    | Submit
    | SwitchLang Lang


maxAttempts : Int
maxAttempts =
    6


init : Flags -> ( Model, Cmd Msg )
init flags =
    let
        model =
            initialModel (parseLang flags.lang)
    in
    ( model
    , Random.generate NewWord (randomWord model.words)
    )


initialModel : Lang -> Model
initialModel lang =
    { lang = lang
    , words = getWords lang
    , state = Idle
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
            String.toLower
                >> String.trim
                >> SE.removeAccents
                -- French being French…
                >> String.replace "œ" "oe"

        ( wordChars, inputChars ) =
            ( String.toList (normalize word)
            , String.toList (normalize input)
            )
    in
    if List.any (Char.isAlpha >> not) inputChars then
        "Invalid word" |> translate lang [] |> Err

    else if List.length inputChars /= 5 then
        "Not enough letters" |> translate lang [] |> Err

    else if not (List.member (normalize input) (getWords lang)) then
        "Unknown word: {0}" |> translate lang [ input ] |> Err

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
                                , List.length (List.filter (isCorrectChar c) attempt)
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
                            , List.length (List.filter (isMisplacedChar c) acc)
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
update msg model =
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

        ( KeyPressed char, Ongoing word attempts input _ ) ->
            let
                newInput =
                    String.toList input
                        ++ [ char ]
                        |> List.take 5
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
                    initialModel model.lang
            in
            ( newModel
            , Random.generate NewWord (randomWord newModel.words)
            )

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
                        |> translate model.lang []
                        |> Errored
              }
            , Cmd.none
            )

        ( NoOp, _ ) ->
            ( model, Cmd.none )

        ( Submit, Ongoing word attempts input _ ) ->
            case validateAttempt model.lang word input of
                Ok attempt ->
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
            update NewGame { model | lang = lang }

        _ ->
            ( { model
                | state =
                    "General game state error. This is bad."
                        |> translate model.lang []
                        |> Errored
              }
            , Cmd.none
            )


charToText : Char -> Html Msg
charToText =
    Char.toUpper >> List.singleton >> String.fromList >> text


viewAttempt : Attempt -> Html Msg
viewAttempt =
    List.map
        (\letter ->
            case letter of
                Misplaced char ->
                    letterSpot "bg-warning" char

                Correct char ->
                    letterSpot "bg-success" char

                Unused char ->
                    letterSpot "bg-secondary" char

                Handled char ->
                    letterSpot "bg-secondary" char
        )
        >> attemptRow


isCorrectChar : Char -> Letter -> Bool
isCorrectChar char letter =
    case letter of
        Correct c ->
            c == char

        _ ->
            False


isMisplacedChar : Char -> Letter -> Bool
isMisplacedChar char letter =
    case letter of
        Misplaced c ->
            c == char

        _ ->
            False


isUnusedChar : Char -> Letter -> Bool
isUnusedChar char letter =
    case letter of
        Unused c ->
            c == char

        _ ->
            False


newGameButton : Lang -> Html Msg
newGameButton lang =
    button
        [ class "btn btn-lg btn-primary rounded-0"
        , onClick NewGame
        ]
        [ "Play again"
            |> translate lang []
            |> text
        ]


definitionLink : Lang -> WordToFind -> Html Msg
definitionLink lang word =
    a
        [ class "btn btn-lg btn-info rounded-0"
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
    div [ class "bg-kark btn-group w-100", style "z-index" "1000" ]
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
    , if List.any (List.any (isCorrectChar char)) attempts then
        Just (Correct char)

      else if List.any (List.any (isMisplacedChar char)) attempts then
        Just (Misplaced char)

      else if List.any (List.any (isUnusedChar char)) attempts then
        Just (Unused char)

      else
        Nothing
    )


keyboardRow : List (Html Msg) -> Html Msg
keyboardRow =
    div
        [ class "d-flex justify-content-evenly"
        , style "gap" "1px"
        , style "margin" "1px 0"
        ]


viewKeyboard : Lang -> List Attempt -> Html Msg
viewKeyboard lang attempts =
    dispositions lang
        |> List.map
            (List.map (keyState attempts >> viewKeyState)
                >> keyboardRow
            )
        |> footer
            [ style "position" "absolute"
            , style "bottom" "5px"
            , style "left" "0"
            , style "right" "0"
            ]


viewKeyState : KeyState -> Html Msg
viewKeyState ( char, letter ) =
    let
        baseClasses =
            "btn px-1 py-2"

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
        , style "flex" "1"
        , style "height" "10vh"
        , style "max-height" "50px"
        , onClick msg
        ]
        [ charToText char ]


viewAttempts : List Attempt -> Html Msg
viewAttempts =
    List.reverse
        >> List.map viewAttempt
        >> div []


attemptRow : List (Html Msg) -> Html Msg
attemptRow =
    div
        [ class "d-flex justify-content-evenly"
        , style "margin" "1px 0"
        , style "gap" "1px"
        , style "z-index" "1000"
        ]


letterSpot : String -> Char -> Html Msg
letterSpot classes char =
    div
        [ class classes
        , class "fs-2 text-center"
        , style "padding" "3px 0"
        , style "flex" "1"
        ]
        [ charToText char ]


viewInput : UserInput -> Html Msg
viewInput input =
    let
        chars =
            String.toList input

        spots =
            chars ++ LE.initialize (5 - List.length chars) (always '\u{00A0}')
    in
    spots
        |> List.map (letterSpot "bg-secondary")
        |> attemptRow


langBtnId : Lang -> String
langBtnId =
    langToString
        >> String.toLower
        >> String.toList
        >> List.take 2
        >> String.fromList
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
                        , class "nav-link"
                        , classList [ ( "active", lang == lang_ ) ]
                        , onClick (SwitchLang lang_)
                        ]
                        [ text <| langToString lang_ ]
                    ]
            )
        |> div [ class "nav nav-pills nav-fill" ]



-- TODO: help modal
-- viewHelp : Lang -> Html Msg
-- viewHelp lang =
--     div []
--         [ p []
--             [ "Guess a 5 letters {0} word in {1} attempts or less!"
--                 |> translate lang
--                     [ langToString lang
--                     , String.fromInt maxAttempts
--                     ]
--                 |> text
--             ]
--         , "Inspired by [Wordle]({0}) - [Source code]({1})"
--             |> translate lang
--                 [ "https://www.powerlanguage.co.uk/wordle/"
--                 , "https://github.com/n1k0/wordlem"
--                 ]
--             |> Markdown.toHtml
--                 [ class "text-center text-muted"
--                 , style "font-size" ".8em"
--                 ]
--         ]


layout : Lang -> List (Html Msg) -> Html Msg
layout lang content =
    div [ class "game container" ]
        [ div [ class "d-flex justify-content-between align-items-center my-2" ]
            [ h1 [ class "p-0 fs-2" ] [ text "Wordlem" ]
            , selectLang lang
            ]
        , main_ [] content
        ]


alert : String -> Html Msg
alert message =
    div
        [ class "alert alert-info"

        -- , style "position" "absolute"
        -- , style "top" "10%"
        -- , style "left" "50%"
        -- , style "transform" "translate(-50%, 0)"
        -- , style "pointer-events" "none"
        -- , style "width" "fit-content"
        ]
        [ text message ]


gameLayout : List (Html Msg) -> Html Msg
gameLayout =
    div
        [ style "position" "relative"
        , style "height" "calc(100% - 60px)"
        ]


view : Model -> Html Msg
view model =
    layout model.lang
        [ case model.state of
            Idle ->
                "Loading game…"
                    |> translate model.lang []
                    |> text

            Errored gameError ->
                div []
                    [ "Game data couldn't be loaded: {0}"
                        |> translate model.lang [ gameError ]
                        |> alert
                    , newGameButton model.lang
                    ]

            Won word attempts ->
                gameLayout
                    [ viewAttempts attempts
                    , endGameButtons model.lang word
                    , viewKeyboard model.lang attempts
                    ]

            Lost word attempts ->
                gameLayout
                    [ viewAttempts attempts
                    , word
                        |> String.toList
                        |> List.map Correct
                        |> List.singleton
                        |> viewAttempts
                    , endGameButtons model.lang word
                    , viewKeyboard model.lang attempts
                    ]

            Ongoing _ attempts input error ->
                gameLayout
                    [ viewAttempts attempts
                    , viewInput input
                    , error |> Maybe.map alert |> Maybe.withDefault (text "")
                    , viewKeyboard model.lang attempts
                    ]
        ]


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
        [ ( "Enter a 5 letters {0} word"
          , "Entrez un mot {0} de 5 lettres"
          )
        , ( "Game data couldn't be loaded: {0}"
          , "Les données du jeu n'ont pas été chargé\u{00A0}: {0}"
          )
        , ( "General game state error. This is bad."
          , "Erreur générale. C'est pas bon signe."
          )
        , ( "Guess a 5 letters {0} word in {1} attempts or less!"
          , "Devinez un mot {0} de 5 lettres en {1} essais ou moins\u{00A0}!"
          )
        , ( "Inspired by [Wordle]({0}) - [Source code]({1})"
          , "Inspiré de [Wordle]({0}) - [Code source]({1})"
          )
        , ( "Loading game…"
          , "Chargement du jeu…"
          )
        , ( "Definition"
          , "Définition"
          )
        , ( "Play again"
          , "Rejouer"
          )
        , ( "Unknown word: {0}"
          , "Mot inconnu\u{00A0}: {0}"
          )
        , ( "Not enough letters"
          , "Mot trop court"
          )
        , ( "Invalid word"
          , "Mot invalide"
          )
        , ( "Unable to pick a word."
          , "Impossible de sélectionner un mot à trouver."
          )
        ]


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
    case state of
        Ongoing _ _ _ _ ->
            BE.onKeyDown decodeKey

        _ ->
            Sub.none



-- Key event


decodeKey : Decode.Decoder Msg
decodeKey =
    Decode.field "key" Decode.string
        |> Decode.andThen
            (\keyCode ->
                case keyCode of
                    "Backspace" ->
                        Decode.succeed BackSpace

                    "Enter" ->
                        Decode.succeed Submit

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
