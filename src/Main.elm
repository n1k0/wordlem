port module Main exposing
    ( Msg(..)
    , main
    , saveStore
    , storeChanged
    )

import Browser
import Browser.Dom as Dom
import Browser.Events as BE
import Charts
import Event
import FormatNumber
import FormatNumber.Locales exposing (Decimals(..), frenchLocale)
import Game
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import I18n exposing (Lang(..), translate)
import Icon
import Json.Decode as Decode
import Keyboard
import List.Extra as LE
import Log exposing (Log)
import Markdown
import Notif exposing (Notif)
import Process
import Random
import Store exposing (Store)
import String.Interpolate exposing (interpolate)
import Task
import Time exposing (Posix)
import Toasty
import Words


type alias Flags =
    { lang : String
    , rawStore : String
    }


type alias Model =
    { store : Store
    , state : Game.State
    , modal : Maybe Modal
    , toasties : Toasty.Stack Notif
    , time : Posix
    }


type Modal
    = HelpModal
    | StatsModal


type Msg
    = BackSpace
    | CloseModal
    | KeyPressed Char
    | NewGame
    | NewTime Posix
    | NewWord (Maybe Game.WordToFind)
    | NoOp
    | OpenModal Modal
    | StoreChanged (Result Decode.Error Store)
    | Submit
    | SwitchLang Lang
    | ToastyMsg (Toasty.Msg Notif)


numberOfLetters : Int
numberOfLetters =
    5


maxAttempts : Int
maxAttempts =
    6


init : Flags -> ( Model, Cmd Msg )
init flags =
    let
        ( model, cmds ) =
            case Store.fromJson flags.rawStore of
                Ok store ->
                    ( initialModel store, Cmd.none )

                Err error ->
                    let
                        store =
                            Store.default (I18n.parseLang flags.lang)

                        newModel =
                            initialModel store
                    in
                    ( { newModel
                        | state =
                            error
                                |> Decode.errorToString
                                |> Game.DecodeError
                                |> Game.Errored
                      }
                    , encodeAndSaveStore store
                    )
    in
    ( model
    , Cmd.batch [ getRandomWord model.store.lang, cmds ]
    )


initialModel : Store -> Model
initialModel store =
    { store = store
    , state = Game.Idle
    , modal =
        if store.helpViewed then
            Nothing

        else
            Just HelpModal
    , toasties = Toasty.initialState
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


getWords : Lang -> List Game.WordToFind
getWords lang =
    case lang of
        English ->
            Words.english

        French ->
            Words.french


getRandomWord : Lang -> Cmd Msg
getRandomWord =
    getWords >> randomWord >> Random.generate NewWord


randomWord : List Game.WordToFind -> Random.Generator (Maybe Game.WordToFind)
randomWord words =
    Random.int 0 (List.length words - 1)
        |> Random.andThen
            (\int -> words |> LE.getAt int |> Random.constant)


processStateNotif : ( Model, Cmd Msg ) -> ( Model, Cmd Msg )
processStateNotif ( { store, state } as model, cmds ) =
    case state of
        Game.Won _ _ ->
            ( model, cmds )
                |> Notif.add ToastyMsg (Notif.Success (translate store.lang I18n.GameWin))

        Game.Lost _ _ ->
            ( model, cmds )
                |> Notif.add ToastyMsg (Notif.Info (translate store.lang I18n.GameLost))

        _ ->
            ( model, cmds )


handleHelpViewed : ( Model, Cmd Msg ) -> ( Model, Cmd Msg )
handleHelpViewed ( { store } as model, cmds ) =
    if not store.helpViewed then
        let
            newStore =
                { store | helpViewed = True }
        in
        ( { model | store = newStore }
        , Cmd.batch [ cmds, encodeAndSaveStore newStore ]
        )

    else
        ( model, cmds )


logResult : ( Model, Cmd Msg ) -> ( Model, Cmd Msg )
logResult ( { store, state, time } as model, cmds ) =
    let
        logData =
            case state of
                Game.Won word guesses ->
                    Just ( True, word, List.length guesses )

                Game.Lost word guesses ->
                    Just ( False, word, List.length guesses )

                _ ->
                    Nothing
    in
    case logData of
        Just ( victory, word, nbAttempts ) ->
            let
                newStore =
                    Store.addLog
                        { time = time
                        , lang = store.lang
                        , word = word
                        , victory = victory
                        , guesses = nbAttempts
                        }
                        store
            in
            ( { model | store = newStore }
            , Cmd.batch [ cmds, encodeAndSaveStore newStore ]
            )

        Nothing ->
            ( model, cmds )


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


addChar : Char -> Game.UserInput -> Game.UserInput
addChar char input =
    (input ++ String.fromChar char)
        |> String.slice 0 numberOfLetters


update : Msg -> Model -> ( Model, Cmd Msg )
update msg ({ store } as model) =
    case ( msg, model.state ) of
        ( BackSpace, Game.Ongoing word guesses input ) ->
            ( { model | state = Game.Ongoing word guesses (String.dropRight 1 input) }
            , Cmd.none
            )

        ( BackSpace, _ ) ->
            ( model, Cmd.none )

        ( CloseModal, _ ) ->
            handleHelpViewed
                ( { model | modal = Nothing }
                , defocusMenuButtons
                )

        ( KeyPressed char, Game.Ongoing word guesses input ) ->
            ( { model | state = Game.Ongoing word guesses (addChar char input) }
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

        ( NewWord (Just newWord), Game.Idle ) ->
            ( { model | state = Game.Ongoing newWord [] "" }
            , defocusMenuButtons
            )

        ( NewWord Nothing, Game.Idle ) ->
            ( { model | state = Game.Errored Game.LoadError }
            , Cmd.none
            )

        ( NewWord _, _ ) ->
            ( model, Cmd.none )

        ( NoOp, _ ) ->
            ( model, Cmd.none )

        ( OpenModal modal, _ ) ->
            ( { model | modal = Just modal }
            , Cmd.none
            )

        ( StoreChanged (Ok newStore), _ ) ->
            ( { model | store = newStore }, Cmd.none )

        ( StoreChanged (Err _), _ ) ->
            -- FIXME: render a toast when we have them
            ( model, Cmd.none )

        ( Submit, Game.Ongoing word guesses input ) ->
            case Game.validateGuess store.lang (getWords store.lang) word input of
                Ok guess ->
                    ( { model | state = Game.checkGame maxAttempts word (guess :: guesses) }
                    , scrollToBottom "board-container"
                    )
                        |> processStateNotif
                        |> logResult

                Err error ->
                    ( { model | state = Game.Ongoing word guesses input }
                    , Cmd.none
                    )
                        |> Notif.add ToastyMsg (Notif.Warning error)

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

        ( ToastyMsg subMsg, _ ) ->
            Toasty.update Notif.config ToastyMsg subMsg model


charToText : Char -> String
charToText =
    Char.toUpper >> String.fromChar


viewAttempt : Game.Guess -> Html Msg
viewAttempt =
    List.map
        (\letter ->
            case letter of
                Game.Misplaced char ->
                    viewTile "btn-warning" char

                Game.Correct char ->
                    viewTile "btn-success" char

                Game.Unused char ->
                    viewTile "btn-dark" char

                Game.Handled char ->
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


newGameButton : Lang -> Html Msg
newGameButton lang =
    button
        [ class "btn btn-lg btn-success"
        , onClick NewGame
        ]
        [ Icon.icon Icon.PlayAgain [ class "me-1" ]
        , I18n.htmlText lang I18n.PlayAgain
        ]


definitionLink : Lang -> Game.WordToFind -> Html Msg
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
        [ Icon.icon Icon.Definition [ class "me-1" ]
        , I18n.htmlText lang I18n.Definition
        ]


endGameButtons : Lang -> Game.WordToFind -> Html Msg
endGameButtons lang word =
    div [ class "EndGameButtons" ]
        [ div [ class "btn-group w-100" ]
            [ definitionLink lang word
            , newGameButton lang
            ]
        ]


viewKeyboard : Lang -> Game.Board -> Html Msg
viewKeyboard lang guesses =
    Keyboard.dispositions lang
        |> List.map
            (div [ class "KeyboardRow" ]
                << List.map (Keyboard.keyState guesses >> viewKeyState)
            )
        |> footer [ class "Keyboard" ]


viewKeyState : Keyboard.KeyState -> Html Msg
viewKeyState ( char, letter ) =
    let
        baseClasses =
            "KeyboardKey btn"

        ( classes, msg ) =
            case letter of
                Just (Game.Correct _) ->
                    ( "btn-success", KeyPressed char )

                Just (Game.Misplaced _) ->
                    ( "btn-warning", KeyPressed char )

                Just (Game.Unused _) ->
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
        [ case char of
            '⌫' ->
                Icon.icon Icon.Backspace []

            '⏎' ->
                Icon.icon Icon.Enter []

            _ ->
                text (charToText char)
        ]


viewBoard : Maybe Game.UserInput -> Game.Board -> Html Msg
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
            |> div
                [ class "Board"
                , style "grid-template-rows"
                    (interpolate "repeat({0}, 1fr)"
                        [ String.fromInt maxAttempts ]
                    )
                ]
        ]


viewTile : String -> Char -> Html Msg
viewTile classes char =
    div
        [ class <| "btn BoardTile rounded-0 " ++ classes ]
        [ text (charToText char) ]


viewInput : Game.UserInput -> Html Msg
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


guessDescription : Lang -> Game.Guess -> List String
guessDescription lang =
    List.map
        (\letter ->
            translate lang
                (case letter of
                    Game.Correct c ->
                        I18n.HelpLetterCorrectlyPlaced { letter = charToText c }

                    Game.Misplaced c ->
                        I18n.HelpLetterMisplaced { letter = charToText c }

                    Game.Unused c ->
                        I18n.HelpLetterUnused { letter = charToText c }

                    Game.Handled c ->
                        I18n.HelpLetterUnused { letter = charToText c }
                )
        )


viewHelp : Store -> List (Html Msg)
viewHelp { lang } =
    let
        demo =
            [ Game.Correct 'm'
            , Game.Misplaced 'e'
            , Game.Unused 't'
            , Game.Correct 'a'
            , Game.Unused 's'
            ]
    in
    [ I18n.HelpGamePitch
        { nbLetters = numberOfLetters
        , lang = lang
        , maxGuesses = maxAttempts
        }
        |> I18n.paragraph lang
    , I18n.paragraph lang I18n.HelpKeyboard
    , div [ class "BoardRowExample mb-3" ]
        [ viewAttempt demo ]
    , I18n.paragraph lang I18n.HelpInThisExample
    , guessDescription lang demo
        |> List.map (\line -> li [] [ text line ])
        |> ul []
    , I18n.paragraph lang I18n.HelpKeyboardLetter
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

        card nodes =
            div [ class "card py-0" ]
                [ div [ class "card-body text-center" ] nodes ]
    in
    [ div [ class "card-group mb-3" ]
        [ card
            [ div [ class "fs-3" ] [ text (String.fromInt totalPlayed) ]
            , small [] [ I18n.htmlText lang (I18n.StatsGamesPlayed { lang = lang }) ]
            ]
        , card
            [ div [ class "fs-3" ] [ text (formatPercent percentWin) ]
            , small [] [ I18n.htmlText lang I18n.StatsWinRate ]
            ]
        , if guessAvg > 0 then
            card
                [ div [ class "fs-3" ] [ text (formatFloat 2 guessAvg) ]
                , small [] [ I18n.htmlText lang I18n.StatsAverageGuesses ]
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
        , I18n.StatsGuessEvolutionHelp
            { lang = lang, length = List.length chartLogs }
            |> I18n.paragraph lang
        , chartLogs
            |> Charts.logs
        ]
    ]


layout : Model -> List (Html Msg) -> Html Msg
layout ({ store, modal, toasties } as model) content =
    div []
        [ Notif.view ToastyMsg toasties
        , main_ [ class "Game" ]
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
                [ Icon.icon Icon.Stats [ class "me-1" ]
                , I18n.htmlText store.lang I18n.StatsButton
                ]
            , button
                [ type_ "button"
                , id "btn-help"
                , class "HeaderButton btn btn-sm text-truncate"
                , btnClass (modal == Just HelpModal)
                , onClick (OpenModal HelpModal)
                ]
                [ Icon.icon Icon.Help [ class "me-1" ]
                , I18n.htmlText store.lang I18n.Help
                ]
            ]
        ]


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
                            , class "btn fs-5 p-0"
                            , attribute "aria-label" "Close"
                            , onClick CloseModal
                            ]
                            [ Icon.icon Icon.Close [] ]
                        ]
                    , div
                        [ class "modal-body no-scroll-chaining" ]
                        content
                    ]
                ]
            ]
        , div [ class "modal-backdrop fade show" ] []
        ]


viewError : Lang -> Game.Error -> Html Msg
viewError lang error =
    div [ class "alert alert-danger m-3" ]
        [ case error of
            Game.DecodeError details ->
                div []
                    [ I18n.paragraph lang I18n.DecodeError
                    , pre [ class "pb-3" ]
                        [ text details ]
                    ]

            Game.LoadError ->
                I18n.htmlText lang I18n.LoadError
        ]


view : Model -> Html Msg
view ({ store, state } as model) =
    layout model
        (case state of
            Game.Idle ->
                [ I18n.htmlText store.lang I18n.GameLoading ]

            Game.Errored error ->
                [ viewError store.lang error
                , p [ class "text-center" ]
                    [ newGameButton store.lang ]
                ]

            Game.Won word guesses ->
                [ viewBoard Nothing guesses
                , endGameButtons store.lang word
                , viewKeyboard store.lang guesses
                ]

            Game.Lost word guesses ->
                [ word
                    |> String.toList
                    |> List.map Game.Correct
                    |> (\a -> a :: guesses)
                    |> viewBoard Nothing
                , endGameButtons store.lang word
                , viewKeyboard store.lang guesses
                ]

            Game.Ongoing _ guesses input ->
                [ viewBoard (Just input) guesses
                , viewKeyboard store.lang guesses
                ]
        )


encodeAndSaveStore : Store -> Cmd Msg
encodeAndSaveStore =
    Store.toJson >> saveStore


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
            Game.Ongoing _ _ _ ->
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
