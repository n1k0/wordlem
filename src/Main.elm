port module Main exposing
    ( Letter(..)
    , Msg(..)
    , main
    , saveStore
    , storeChanged
    , validateGuess
    )

import Browser
import Browser.Dom as Dom
import Browser.Events as BE
import Charts
import Event
import FormatNumber
import FormatNumber.Locales exposing (Decimals(..), frenchLocale)
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import I18n exposing (Lang(..), translate)
import Json.Decode as Decode
import List.Extra as LE
import Log exposing (Log)
import Markdown
import Process
import Random
import Store exposing (Store)
import String.Extra as SE
import String.Interpolate exposing (interpolate)
import Task
import Time exposing (Posix)
import Words


type alias Flags =
    { lang : String
    , rawStore : String
    }


type alias Model =
    { store : Store
    , state : GameState
    , modal : Maybe Modal
    , time : Posix
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
    | StoreChanged (Result Decode.Error Store)
    | Submit
    | SwitchLang Lang


numberOfLetters : Int
numberOfLetters =
    5


maxAttempts : Int
maxAttempts =
    6


init : Flags -> ( Model, Cmd Msg )
init flags =
    let
        store =
            Store.fromJson flags.rawStore

        ( model, cmds ) =
            case store of
                Ok store_ ->
                    ( initialModel store_, Cmd.none )

                Err error ->
                    let
                        newStore =
                            Store.default (I18n.parseLang flags.lang)

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
                    , encodeAndSaveStore newStore
                    )
    in
    ( model
    , Cmd.batch [ getRandomWord model.store.lang, cmds ]
    )


initialModel : Store -> Model
initialModel store =
    { store = store
    , state = Idle
    , modal = Nothing
    , time = Time.millisToPosix 0
    }



-- sampleOngoingState : GameState
-- sampleOngoingState =
--     -- this is useful to debug specific states
--     Ongoing "xxxxx"
--         ("voila"
--             |> String.toList
--             |> List.map Unused
--             |> List.repeat 5
--         )
--         "voila"
--         Nothing


getWords : Lang -> List WordToFind
getWords lang =
    case lang of
        English ->
            Words.english

        French ->
            Words.french


getRandomWord : Lang -> Cmd Msg
getRandomWord =
    getWords >> randomWord >> Random.generate NewWord


randomWord : List WordToFind -> Random.Generator (Maybe WordToFind)
randomWord words =
    Random.int 0 (List.length words - 1)
        |> Random.andThen
            (\int -> words |> LE.getAt int |> Random.constant)


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
        I18n.NotEnoughLetters
            |> translate lang
            |> Err

    else if not (List.member (normalize input) (getWords lang)) then
        I18n.AbsentFromDictionary { lang = lang, word = input }
            |> translate lang
            |> Err

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


defocusMenuButtons : Cmd Msg
defocusMenuButtons =
    [ "btn-lang-en", "btn-lang-fr", "btn-stats", "btn-help" ]
        |> List.map defocus
        |> Cmd.batch


scrollToBottom : String -> Cmd Msg
scrollToBottom id =
    Process.sleep 10
        |> Task.andThen (\_ -> Dom.getViewportOf id)
        |> Task.andThen (\{ scene } -> Dom.setViewportOf id 0 scene.height)
        |> Task.attempt (always NoOp)


addChar : Char -> UserInput -> UserInput
addChar char input =
    (input ++ String.fromChar char)
        |> String.slice 0 numberOfLetters


update : Msg -> Model -> ( Model, Cmd Msg )
update msg ({ store } as model) =
    case ( msg, model.state ) of
        ( BackSpace, Ongoing word guesses input _ ) ->
            ( { model | state = Ongoing word guesses (String.dropRight 1 input) Nothing }
            , Cmd.none
            )

        ( BackSpace, _ ) ->
            ( model, Cmd.none )

        ( CloseModal, _ ) ->
            ( { model | modal = Nothing }
            , defocusMenuButtons
            )

        ( KeyPressed char, Ongoing word guesses input _ ) ->
            ( { model | state = Ongoing word guesses (addChar char input) Nothing }
            , scrollToBottom "board-container"
            )

        ( KeyPressed _, _ ) ->
            ( model, Cmd.none )

        ( NewGame, _ ) ->
            let
                newModel =
                    initialModel store
            in
            ( newModel
            , getRandomWord store.lang
            )

        ( NewTime time, _ ) ->
            ( { model | time = time }, Cmd.none )

        ( NewWord (Just newWord), Idle ) ->
            ( { model | state = Ongoing newWord [] "" Nothing }
            , defocusMenuButtons
            )

        ( NewWord Nothing, Idle ) ->
            ( { model | state = Errored LoadError }
            , Cmd.none
            )

        ( NewWord _, _ ) ->
            ( model, Cmd.none )

        ( NoOp, _ ) ->
            ( model, Cmd.none )

        ( OpenModal modal, _ ) ->
            ( { model
                | modal = Just modal
                , state = removeAlert model.state
              }
            , Cmd.none
            )

        ( StoreChanged (Ok newStore), _ ) ->
            ( { model | store = newStore }, Cmd.none )

        ( StoreChanged (Err _), _ ) ->
            -- FIXME: render a toast when we have them
            ( model, Cmd.none )

        ( Submit, Ongoing word guesses input _ ) ->
            case validateGuess store.lang word input of
                Ok guess ->
                    logResult
                        ( { model | state = checkGame word (guess :: guesses) }
                        , scrollToBottom "board-container"
                        )

                Err error ->
                    ( { model | state = Ongoing word guesses input (Just error) }
                    , Cmd.none
                    )

        ( Submit, _ ) ->
            ( model, Cmd.none )

        ( SwitchLang lang, _ ) ->
            let
                newStore =
                    { store | lang = lang }

                newModel =
                    initialModel newStore
            in
            ( newModel
            , Cmd.batch
                [ encodeAndSaveStore newStore
                , getRandomWord lang
                ]
            )


removeAlert : GameState -> GameState
removeAlert state =
    case state of
        Ongoing word guesses input (Just _) ->
            Ongoing word guesses input Nothing

        _ ->
            state


charToText : Char -> String
charToText =
    Char.toUpper >> String.fromChar


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
        [ class "btn btn-lg btn-success"
        , onClick NewGame
        ]
        [ icon "play-again"
        , I18n.htmlText lang I18n.PlayAgain
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
        [ icon "definition"
        , I18n.htmlText lang I18n.Definition
        ]


endGameButtons : Lang -> WordToFind -> Html Msg
endGameButtons lang word =
    div [ class "EndGameButtons" ]
        [ div [ class "btn-group w-100" ]
            [ definitionLink lang word
            , newGameButton lang
            ]
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
                        ( "btn-info large-key", BackSpace )

                    else if char == '⏎' then
                        ( "btn-info large-key", Submit )

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
    div [ class "BoardContainer", id "board-container" ]
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
            translate lang
                (case letter of
                    Correct c ->
                        I18n.HelpLetterCorrectlyPlaced { letter = charToText c }

                    Misplaced c ->
                        I18n.HelpLetterMisplaced { letter = charToText c }

                    Unused c ->
                        I18n.HelpLetterUnused { letter = charToText c }

                    Handled c ->
                        I18n.HelpLetterUnused { letter = charToText c }
                )
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
        [ I18n.HelpGamePitch
            { nbLetters = numberOfLetters
            , lang = lang
            , maxGuesses = maxAttempts
            }
            |> I18n.htmlText lang
        ]
    , p []
        [ I18n.htmlText lang I18n.HelpKeyboard ]
    , div [ class "mb-3" ]
        [ viewAttempt demo ]
    , p []
        [ I18n.htmlText lang I18n.HelpInThisExample ]
    , guessDescription lang demo
        |> List.map (\line -> li [] [ text line ])
        |> ul []
    , p [] [ I18n.htmlText lang I18n.HelpKeyboardLetter ]
    , I18n.HelpInspiredBy
        { wordleUrl = "https://www.powerlanguage.co.uk/wordle/"
        , githubUrl = "https://github.com/n1k0/wordlem"
        }
        |> translate lang
        |> Markdown.toHtml [ class "Markdown" ]
    ]


formatFloat : Int -> Float -> String
formatFloat decimals =
    FormatNumber.format { frenchLocale | decimals = Exact decimals }


formatPercent : Float -> String
formatPercent float =
    formatFloat 0 float ++ "%"


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


viewStats : Store -> List (Html Msg)
viewStats { lang, logs } =
    case List.filter (.lang >> (==) lang) logs of
        [] ->
            [ I18n.StatsLangDataMissing { lang = lang }
                |> I18n.htmlText lang
            ]

        logs_ ->
            viewLangStats lang logs_


viewLangStats : Lang -> List Log -> List (Html Msg)
viewLangStats lang langLogs =
    let
        onlyVictories =
            List.filter .victory

        totalPlayed =
            List.length langLogs

        totalWins =
            List.length (onlyVictories langLogs)

        percentWin =
            toFloat totalWins / toFloat totalPlayed * 100

        totalGuesses =
            langLogs |> onlyVictories |> List.map .guesses |> List.sum

        guessAvg =
            toFloat totalGuesses / toFloat totalWins

        chartLogs =
            langLogs
                |> List.reverse
                |> List.take 100

        row nbGuess =
            let
                wins =
                    langLogs
                        |> onlyVictories
                        |> List.filter (.guesses >> (==) nbGuess)
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
    [ div [ class "card-group mb-3" ]
        [ div [ class "card py-0" ]
            [ div [ class "card-body text-center" ]
                [ div [ class "fs-3" ] [ text (String.fromInt totalPlayed) ]
                , small [] [ I18n.htmlText lang (I18n.StatsGamesPlayed { lang = lang }) ]
                ]
            ]
        , div [ class "card py-0" ]
            [ div [ class "card-body text-center" ]
                [ div [ class "fs-3" ] [ text (formatPercent percentWin) ]
                , small [] [ I18n.htmlText lang I18n.StatsWinRate ]
                ]
            ]
        , if guessAvg > 0 then
            div [ class "card py-0" ]
                [ div [ class "card-body text-center" ]
                    [ div [ class "fs-3" ] [ text (formatFloat 2 guessAvg) ]
                    , small [] [ I18n.htmlText lang I18n.StatsAverageGuesses ]
                    ]
                ]

          else
            text ""
        ]
    , div [ class "table-responsive" ]
        [ h2 [ class "fs-5" ]
            [ I18n.StatsGuessDistribution { lang = lang }
                |> I18n.htmlText lang
            ]
        , table [ class "table" ]
            [ List.range 1 6
                |> List.map row
                |> tbody []
            ]
        ]
    , div []
        [ h2 [ class "fs-5" ]
            [ I18n.StatsGuessEvolution { lang = lang }
                |> I18n.htmlText lang
            ]
        , p []
            [ I18n.StatsGuessEvolutionHelp { lang = lang, length = List.length chartLogs }
                |> I18n.htmlText lang
            ]
        , chartLogs
            |> Charts.logs
        ]
    ]


layout : Model -> List (Html Msg) -> Html Msg
layout ({ store, modal } as model) content =
    div []
        [ main_ [ class "Game" ]
            (viewHeader model :: content)
        , case modal of
            Just HelpModal ->
                viewModal store I18n.Help (viewHelp store)

            Just StatsModal ->
                viewModal store
                    (I18n.StatsLang { lang = store.lang })
                    (viewStats store)

            Nothing ->
                text ""
        ]


icon : String -> Html Msg
icon name =
    i [ class <| "me-1 icon icon-" ++ name ] []


viewHeader : Model -> Html Msg
viewHeader { store, modal } =
    let
        btnClass active =
            classList
                [ ( "btn-dark", not active )
                , ( "btn-primary", active )
                ]
    in
    nav [ class "navbar sticky-top navbar-dark bg-dark" ]
        [ div [ class "Header container-fluid flex-nowrap" ]
            [ span [ class "text-white fw-bold me-2" ] [ text "Wordlem" ]
            , button
                [ type_ "button"
                , id "btn-lang-en"
                , class "HeaderButton btn btn-sm text-truncate"
                , btnClass (store.lang == English)
                , onClick (SwitchLang English)
                ]
                [ text "English" ]
            , button
                [ type_ "button"
                , id "btn-lang-fr"
                , class "HeaderButton btn btn-sm text-truncate"
                , btnClass (store.lang == French)
                , onClick (SwitchLang French)
                ]
                [ text "Français" ]
            , button
                [ type_ "button"
                , id "btn-stats"
                , class "HeaderButton btn btn-sm text-truncate"
                , btnClass (modal == Just StatsModal)
                , onClick (OpenModal StatsModal)
                ]
                [ icon "stats"
                , I18n.htmlText store.lang I18n.StatsButton
                ]
            , button
                [ type_ "button"
                , id "btn-help"
                , class "HeaderButton btn btn-sm text-truncate"
                , btnClass (modal == Just HelpModal)
                , onClick (OpenModal HelpModal)
                ]
                [ icon "help"
                , I18n.htmlText store.lang I18n.Help
                ]
            ]
        ]


alert : String -> String -> Html Msg
alert level message =
    div
        [ class <| "Flash alert alert-" ++ level ]
        [ text message ]


viewModal : Store -> I18n.Id -> List (Html Msg) -> Html Msg
viewModal { lang } transationId content =
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
                            [ I18n.htmlText lang transationId ]
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
                        [ I18n.htmlText lang I18n.DecodeError ]
                    , pre [ class "pb-3" ]
                        [ text details ]
                    ]

            LoadError ->
                I18n.htmlText lang I18n.LoadError
        ]


view : Model -> Html Msg
view ({ store, state } as model) =
    layout model
        (case state of
            Idle ->
                [ I18n.htmlText store.lang I18n.GameLoading ]

            Errored error ->
                [ viewError store.lang error
                , p [ class "text-center" ]
                    [ newGameButton store.lang ]
                ]

            Won word guesses ->
                [ viewBoard Nothing guesses
                , endGameButtons store.lang word
                , viewKeyboard store.lang guesses
                , translate store.lang I18n.GameWin
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
                , translate store.lang I18n.GameLost
                    |> alert "info"
                ]

            Ongoing _ guesses input error ->
                [ viewBoard (Just input) guesses
                , error |> Maybe.map (alert "warning") |> Maybe.withDefault (text "")
                , viewKeyboard store.lang guesses
                ]
        )


encodeAndSaveStore : Store -> Cmd Msg
encodeAndSaveStore =
    Store.toJson >> saveStore



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
            , encodeAndSaveStore newStore
            )

        Nothing ->
            ( model, cmds )


logEntry : Log -> Store -> Store
logEntry log ({ logs } as store) =
    { store | logs = log :: logs }


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
        , storeChanged (Store.fromJson >> StoreChanged)
        , case state of
            Ongoing _ _ _ _ ->
                BE.onKeyDown
                    (Event.decodeKey
                        { onKeyPress = KeyPressed
                        , onBackSpace = BackSpace
                        , onEnter = Submit
                        , onEscape = CloseModal
                        }
                    )

            _ ->
                Sub.none
        ]



-- Ports


port saveStore : String -> Cmd msg


port storeChanged : (String -> msg) -> Sub msg
