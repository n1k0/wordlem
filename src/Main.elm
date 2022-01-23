port module Main exposing
    ( Msg(..)
    , main
    , saveStore
    , storeChanged
    )

import Browser
import Browser.Dom as Dom
import Browser.Events as BE
import Browser.Navigation as Nav
import Charts
import Client
import Event
import FormatNumber
import FormatNumber.Locales exposing (Decimals(..), frenchLocale)
import Game
import Hashids
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import Http
import I18n exposing (Id(..), Lang(..), translate)
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
import Url
import Url.Parser exposing ((</>), Parser, int, map, oneOf, s, string)


type alias Flags =
    { lang : String
    , rawStore : String
    }


type alias Model =
    { store : Store
    , key : Nav.Key
    , wordRef : WordRef
    , state : Game.State
    , words : List Game.WordToFind
    , modal : Maybe Modal
    , toasties : Toasty.Stack Notif
    , time : Posix
    , wordSize : Int
    }


type Modal
    = HelpModal
    | SettingsModal
    | StatsModal


type Msg
    = BackSpace
    | CloseModal
    | KeyPressed Char
    | LinkClicked Browser.UrlRequest
    | NewGame
    | NewTime Posix
    | NewWord ( String, Maybe Game.WordToFind )
    | NoOp
    | OpenModal Modal
    | StoreChanged (Result Decode.Error Store)
    | Submit
    | SwitchLang Lang
    | SwitchLayout Keyboard.Layout
    | SwitchWordSize (Maybe Int)
    | ToastyMsg (Toasty.Msg Notif)
    | UpdateWordSize Int
    | UrlChanged Url.Url
    | WordsReceived (Result Http.Error String)
    | WordsReceivedForWordRef (Result Http.Error String)


maxAttempts : Int
maxAttempts =
    6


type alias WordRef =
    { lang : String
    , size : Int
    , id : String
    }


type Route
    = WordUri String Int String


urlToWordref : Url.Url -> Maybe WordRef
urlToWordref url =
    url
        |> urlFragmentToPath
        |> Url.Parser.parse routeParser
        |> Maybe.map (\(WordUri lang wordSize wordId) -> { lang = lang, size = wordSize, id = wordId })


wordrefToUrl : WordRef -> String
wordrefToUrl { lang, size, id } =
    "#" ++ lang ++ "/" ++ String.fromInt size ++ "/" ++ id



-- hack : use the url parser on the fragment, cf. https://github.com/elm/url/issues/24


urlFragmentToPath : Url.Url -> Url.Url
urlFragmentToPath url =
    { url | path = Maybe.withDefault "" url.fragment, fragment = Nothing }


routeParser : Parser (Route -> a) a
routeParser =
    oneOf
        [ Url.Parser.map WordUri (string </> int </> string)
        ]


init : Flags -> Url.Url -> Nav.Key -> ( Model, Cmd Msg )
init flags url key =
    let
        maybeWordRef =
            urlToWordref url

        defaultLang =
            flags.lang

        ( model, cmds ) =
            case Store.fromJson flags.rawStore of
                Ok store ->
                    let
                        defaultSize =
                            store.settings.wordSize |> Maybe.withDefault 5

                        wordRef =
                            maybeWordRef |> Maybe.withDefault { lang = defaultLang, size = defaultSize, id = "" }
                    in
                    ( initialModel (Store.default (I18n.parseLang wordRef.lang)) key wordRef Game.Idle, Cmd.none )

                Err error ->
                    let
                        wordRef =
                            maybeWordRef |> Maybe.withDefault { lang = defaultLang, size = 5, id = "" }

                        store =
                            Store.default (I18n.parseLang wordRef.lang)

                        newModel =
                            initialModel store key wordRef Game.Idle
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
                        |> notifyWarning I18n.ErrorCorruptedSession
    in
    ( model
    , Cmd.batch [ startNewGame model.store maybeWordRef, cmds ]
    )


initialModel : Store -> Nav.Key -> WordRef -> Game.State -> Model
initialModel store key wordRef state =
    { store = store
    , key = key
    , state = state
    , wordRef = wordRef
    , words = []
    , modal =
        if store.helpViewed then
            Nothing

        else
            Just HelpModal
    , toasties = Toasty.initialState
    , time = Time.millisToPosix 0
    , wordSize = wordRef.size
    }


startNewGame : Store -> Maybe WordRef -> Cmd Msg
startNewGame { lang, settings } maybeWordRef =
    case ( maybeWordRef, settings.wordSize ) of
        ( Just wordRef, _ ) ->
            Client.getWords (I18n.parseLang wordRef.lang) WordsReceivedForWordRef

        ( _, Just _ ) ->
            Client.getWords lang WordsReceived

        ( _, Nothing ) ->
            getRandomWordSize


getRandomWordSize : Cmd Msg
getRandomWordSize =
    Random.int 5 7
        |> Random.generate UpdateWordSize


getRandomWord : Int -> List Game.WordToFind -> Cmd Msg
getRandomWord wordSize words =
    words
        |> List.filter (String.length >> (==) wordSize)
        |> randomWord
        |> Random.generate NewWord


randomWord : List Game.WordToFind -> Random.Generator ( String, Maybe Game.WordToFind )
randomWord words =
    Random.int 0 (List.length words - 1)
        |> Random.andThen (\int -> pickWord words int |> Random.constant)


hashids =
    Hashids.hashidsSimple "wordelm salt"


pickWord : List Game.WordToFind -> Int -> ( String, Maybe Game.WordToFind )
pickWord words int =
    ( Hashids.encode hashids int, LE.getAt int words )


wordFromRef : List Game.WordToFind -> WordRef -> Maybe Game.WordToFind
wordFromRef words wordRef =
    Hashids.decode hashids wordRef.id
        |> List.head
        |> Maybe.andThen (\int -> LE.getAt int words)


processStateNotif : ( Model, Cmd Msg ) -> ( Model, Cmd Msg )
processStateNotif ( { store, state } as model, cmds ) =
    case state of
        Game.Won _ _ ->
            notifySuccess I18n.GameWin ( model, cmds )

        Game.Lost _ _ ->
            notifyInfo I18n.GameLost ( model, cmds )

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
    [ "btn-lang-en", "btn-lang-fr", "btn-stats", "btn-help", "btn-settings" ]
        |> List.map defocus
        |> Cmd.batch


scrollToBottom : String -> Cmd Msg
scrollToBottom id =
    Process.sleep 10
        |> Task.andThen (\_ -> Dom.getViewportOf id)
        |> Task.andThen (\{ scene } -> Dom.setViewportOf id 0 scene.height)
        |> Task.attempt (always NoOp)


addChar : Int -> Char -> Game.UserInput -> Game.UserInput
addChar wordSize char input =
    (input ++ String.fromChar char)
        |> String.slice 0 wordSize


update : Msg -> Model -> ( Model, Cmd Msg )
update msg ({ store, wordRef } as model) =
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
            ( { model | state = Game.Ongoing word guesses (addChar model.wordSize char input) }
            , scrollToBottom "board-container"
            )

        ( KeyPressed _, _ ) ->
            ( model, Cmd.none )

        ( LinkClicked _, _ ) ->
            ( model, Cmd.none )

        ( NewGame, _ ) ->
            ( initialModel store model.key wordRef Game.Idle
            , startNewGame store Nothing
            )

        ( NewTime time, _ ) ->
            ( { model | time = time }, Cmd.none )

        ( NewWord ( hashid, Just newWord ), Game.Idle ) ->
            ( { model | state = Game.Ongoing newWord [] "", wordRef = { wordRef | id = hashid } }
            , Cmd.batch
                [ defocusMenuButtons
                , Nav.pushUrl model.key (wordrefToUrl { wordRef | id = hashid })
                ]
            )

        ( NewWord ( _, Nothing ), Game.Idle ) ->
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
            case Game.validateGuess store.lang model.words word input of
                Ok guess ->
                    ( { model | state = Game.checkGame maxAttempts word (guess :: guesses) }
                    , scrollToBottom "board-container"
                    )
                        |> processStateNotif
                        |> logResult

                Err error ->
                    notifyWarning error
                        ( { model | state = Game.Ongoing word guesses input }
                        , Cmd.none
                        )

        ( Submit, _ ) ->
            ( model, Cmd.none )

        ( SwitchLang lang, _ ) ->
            let
                newStore =
                    { store | lang = lang }

                newModel =
                    initialModel newStore model.key { wordRef | lang = I18n.langToCode lang } Game.Idle
            in
            ( newModel
            , Cmd.batch
                [ encodeAndSaveStore newStore
                , Client.getWords lang WordsReceived
                ]
            )
                |> notifySuccess (I18n.NewGameLang { lang = newStore.lang })

        ( SwitchLayout layout_, _ ) ->
            let
                newStore =
                    store |> Store.updateSettings (\s -> { s | layout = layout_ })
            in
            ( { model | store = newStore }
            , encodeAndSaveStore newStore
            )

        ( SwitchWordSize (Just wordSize), _ ) ->
            let
                newStore =
                    store |> Store.updateSettings (\s -> { s | wordSize = Just wordSize })

                newModel =
                    initialModel newStore model.key { wordRef | size = wordSize } Game.Idle
            in
            ( { newModel | store = newStore, wordSize = wordSize }
            , Cmd.batch
                [ Client.getWords newStore.lang WordsReceived
                , encodeAndSaveStore newStore
                ]
            )

        ( SwitchWordSize Nothing, _ ) ->
            let
                newStore =
                    store |> Store.updateSettings (\s -> { s | wordSize = Nothing })
            in
            ( { model | store = newStore }
            , Cmd.batch
                [ getRandomWordSize
                , encodeAndSaveStore newStore
                ]
            )

        ( ToastyMsg subMsg, _ ) ->
            Toasty.update Notif.config ToastyMsg subMsg model

        ( UpdateWordSize wordSize, _ ) ->
            let
                newModel =
                    initialModel store model.key { wordRef | size = wordSize } Game.Idle
            in
            ( { newModel | wordSize = wordSize }
            , Client.getWords store.lang WordsReceived
            )

        ( UrlChanged url, _ ) ->
            let
                maybeWordRef =
                    urlToWordref url
            in
            if maybeWordRef == Just wordRef then
                ( model, Cmd.none )

            else
                let
                    newWordRef =
                        maybeWordRef |> Maybe.withDefault wordRef

                    newStore =
                        { store | lang = I18n.parseLang newWordRef.lang }

                    newModel =
                        initialModel newStore model.key newWordRef Game.Idle
                in
                ( newModel, startNewGame newStore maybeWordRef )

        ( WordsReceived (Ok rawWords), _ ) ->
            let
                words =
                    rawWords
                        |> String.lines
                        |> List.filter (not << String.isEmpty)
                        |> List.filter (String.length >> (==) model.wordSize)
            in
            ( { model | words = words }
            , getRandomWord model.wordSize words
            )

        ( WordsReceived (Err _), _ ) ->
            notifyWarning I18n.LoadError ( model, Cmd.none )

        ( WordsReceivedForWordRef (Ok rawWords), _ ) ->
            let
                words =
                    rawWords
                        |> String.lines
                        |> List.filter (not << String.isEmpty)
                        |> List.filter (String.length >> (==) model.wordSize)

                maybeWordToFind =
                    wordFromRef words model.wordRef

                ( state, cmd ) =
                    case maybeWordToFind of
                        Nothing ->
                            ( Game.Idle, getRandomWord model.wordSize words )

                        Just wordToFind ->
                            ( Game.Ongoing wordToFind [] "", Cmd.none )
            in
            ( { model | words = words, state = state }
            , cmd
            )

        ( WordsReceivedForWordRef (Err _), _ ) ->
            notifyWarning I18n.LoadError ( model, Cmd.none )


notifyInfo : I18n.Id -> ( Model, Cmd Msg ) -> ( Model, Cmd Msg )
notifyInfo i18nId ( model, cmds ) =
    ( model, cmds )
        |> Notif.add ToastyMsg (Notif.Info (translate model.store.lang i18nId))


notifySuccess : I18n.Id -> ( Model, Cmd Msg ) -> ( Model, Cmd Msg )
notifySuccess i18nId ( model, cmds ) =
    ( model, cmds )
        |> Notif.add ToastyMsg (Notif.Success (translate model.store.lang i18nId))


notifyWarning : I18n.Id -> ( Model, Cmd Msg ) -> ( Model, Cmd Msg )
notifyWarning i18nId ( model, cmds ) =
    ( model, cmds )
        |> Notif.add ToastyMsg (Notif.Warning (translate model.store.lang i18nId))


charToText : Char -> String
charToText =
    Char.toUpper >> String.fromChar


viewAttempt : Int -> Game.Guess -> Html Msg
viewAttempt wordSize =
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
        >> viewBoardRow wordSize


viewBoardRow : Int -> List (Html Msg) -> Html Msg
viewBoardRow wordSize =
    div
        [ class "BoardRow"
        , style "grid-template-columns"
            (interpolate "repeat({0}, 1fr)"
                [ String.fromInt wordSize ]
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


viewKeyboard : Store -> Game.Board -> Html Msg
viewKeyboard { lang, settings } guesses =
    settings.layout
        |> Keyboard.disposition lang
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


viewBoard : Int -> Maybe Game.UserInput -> Game.Board -> Html Msg
viewBoard wordSize input guesses =
    let
        remaining =
            maxAttempts
                - List.length guesses
                - (input |> Maybe.map (always 2) |> Maybe.withDefault 1)
    in
    div [ class "BoardContainer", id "board-container" ]
        [ [ guesses
                |> List.reverse
                |> List.map (viewAttempt wordSize >> Just)
          , [ input |> Maybe.map (viewInput wordSize) ]
          , List.range 0 remaining
                |> List.map
                    (\_ ->
                        List.repeat wordSize '\u{00A0}'
                            |> String.fromList
                            |> viewInput wordSize
                            |> Just
                    )
          ]
            |> List.concat
            |> List.filterMap identity
            |> div
                [ class <| "Board Board-" ++ String.fromInt wordSize
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


viewInput : Int -> Game.UserInput -> Html Msg
viewInput wordSize input =
    let
        chars =
            String.toList input

        spots =
            chars ++ LE.initialize (wordSize - List.length chars) (always '\u{00A0}')
    in
    spots
        |> List.map (viewTile "btn-secondary")
        |> viewBoardRow wordSize


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


viewHelp : Store -> Int -> List (Html Msg)
viewHelp { lang } wordSize =
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
        { nbLetters = wordSize
        , lang = lang
        , maxGuesses = maxAttempts
        }
        |> I18n.paragraph lang
    , I18n.paragraph lang I18n.HelpKeyboard
    , div [ class "BoardRowExample mb-3" ]
        [ viewAttempt wordSize demo ]
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


viewSettings : Store -> List (Html Msg)
viewSettings { lang, settings } =
    [ -- Keyboard layout setting
      div [ class "mb-3" ]
        [ label []
            [ I18n.SettingsKeyboardLayout |> I18n.htmlText lang
            ]
        , [ Keyboard.Auto, Keyboard.Azerty, Keyboard.Qwerty ]
            |> List.map
                (\l ->
                    option
                        [ value (Keyboard.layoutToString l)
                        , selected <| l == settings.layout
                        ]
                        [ l |> Keyboard.layoutToString |> String.toUpper |> text ]
                )
            |> select
                [ class "form-select w-100 mt-1"
                , onInput (Keyboard.layoutFromString >> SwitchLayout)
                ]
        ]

    -- Word size setting
    , div [ class "mb-3" ]
        [ label []
            [ I18n.SettingsWordSize |> I18n.htmlText lang
            ]
        , [ ( Nothing, I18n.SettingsWordSizeRandom )
          , ( Just 5, I18n.SettingsWordSizeInt { size = 5 } )
          , ( Just 6, I18n.SettingsWordSizeInt { size = 6 } )
          , ( Just 7, I18n.SettingsWordSizeInt { size = 7 } )
          ]
            |> List.map
                (\( wordSize, i18n ) ->
                    option
                        [ selected <| wordSize == settings.wordSize
                        , wordSize
                            |> Maybe.map String.fromInt
                            |> Maybe.withDefault ""
                            |> value
                        ]
                        [ text (I18n.translate lang i18n) ]
                )
            |> select
                [ class "form-select w-100 mt-1"
                , onInput (String.toInt >> SwitchWordSize)
                ]
        ]
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

        stat nodes =
            div [ class "col-4 text-center mb-4" ]
                nodes
    in
    [ div [ class "row" ]
        [ stat
            [ div [ class "fs-3" ] [ text (String.fromInt totalPlayed) ]
            , small [] [ I18n.htmlText lang I18n.StatsGamesPlayed ]
            ]
        , stat
            [ div [ class "fs-3" ] [ text (formatPercent percentWin) ]
            , small [] [ I18n.htmlText lang I18n.StatsWinRate ]
            ]
        , if guessAvg > 0 then
            stat
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
                viewModal store I18n.Help (viewHelp store model.wordSize)

            Just SettingsModal ->
                viewModal store
                    I18n.Settings
                    (viewSettings store)

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
        [ div [ class "Header container-fluid flex-nowrap py-sm-1" ]
            [ div [ class "HeaderLogo text-white fw-bold" ]
                [ h1 [ class "visually-hidden" ] [ text "Wordlem" ] ]
            , div [ class "d-flex flex-fill justify-content-evenly text-center" ]
                [ button
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
                ]
            , div [ class "d-flex justify-content-end" ]
                [ button
                    [ type_ "button"
                    , id "btn-stats"
                    , class "HeaderButton btn btn-sm d-flex align-items-center"
                    , btnClass (modal == Just StatsModal)
                    , onClick (OpenModal StatsModal)
                    , attribute "aria-label" <| I18n.translate store.lang I18n.StatsButton
                    ]
                    [ Icon.icon Icon.Stats [] ]
                , button
                    [ type_ "button"
                    , id "btn-help"
                    , class "HeaderButton btn btn-sm d-flex align-items-center"
                    , btnClass (modal == Just HelpModal)
                    , onClick (OpenModal HelpModal)
                    , attribute "aria-label" <| I18n.translate store.lang I18n.Help
                    ]
                    [ Icon.icon Icon.Help [] ]
                , button
                    [ type_ "button"
                    , id "btn-settings"
                    , class "HeaderButton btn btn-sm d-flex align-items-center"
                    , btnClass (modal == Just SettingsModal)
                    , onClick (OpenModal SettingsModal)
                    , attribute "aria-label" <| I18n.translate store.lang I18n.Settings
                    ]
                    [ Icon.icon Icon.Settings [] ]
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


viewLoader : Html Msg
viewLoader =
    div [ class "Loader d-flex justify-content-center align-items-center" ]
        [ div [ class "spinner-border" ]
            [ span [ class "visually-hidden" ] [ text "Loading…" ]
            ]
        ]


view : Model -> Browser.Document Msg
view ({ wordSize, store, state } as model) =
    { title = "wordlem"
    , body =
        [ layout model
            (case state of
                Game.Idle ->
                    [ viewLoader
                    , viewKeyboard store []
                    ]

                Game.Errored error ->
                    [ viewError store.lang error
                    , p [ class "text-center" ]
                        [ newGameButton store.lang ]
                    ]

                Game.Won word guesses ->
                    [ viewBoard wordSize Nothing guesses
                    , endGameButtons store.lang word
                    , viewKeyboard store guesses
                    ]

                Game.Lost word guesses ->
                    [ word
                        |> String.toList
                        |> List.map Game.Correct
                        |> (\a -> a :: guesses)
                        |> viewBoard wordSize Nothing
                    , endGameButtons store.lang word
                    , viewKeyboard store guesses
                    ]

                Game.Ongoing _ guesses input ->
                    [ viewBoard wordSize (Just input) guesses
                    , viewKeyboard store guesses
                    ]
            )
        ]
    }


encodeAndSaveStore : Store -> Cmd Msg
encodeAndSaveStore =
    Store.toJson >> saveStore


main : Program Flags Model Msg
main =
    Browser.application
        { init = init
        , view = view
        , update = update
        , subscriptions = subscriptions
        , onUrlChange = UrlChanged
        , onUrlRequest = LinkClicked
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
