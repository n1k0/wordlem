port module Main exposing
    ( Msg(..)
    , main
    , saveStore
    , storeChanged
    )

import Browser
import Browser.Dom as Dom
import Browser.Events as BE
import Client
import Event
import Game
import Help
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import Http
import I18n exposing (Id(..), Lang(..), translate)
import Icon
import Json.Decode as Decode
import Keyboard
import List.Extra as LE
import Notif exposing (Notif)
import Process
import Random
import Settings
import Stats
import Store exposing (Store)
import Task
import Time exposing (Posix)
import Toasty


type alias Flags =
    { lang : String
    , rawStore : String
    }


type alias Model =
    { store : Store
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
    | Clear
    | CloseModal
    | KeyArrowDown
    | KeyArrowUp
    | KeyPressed Char
    | NewGame
    | NewTime Posix
    | NewWord (Maybe Game.WordToFind)
    | NoOp
    | OpenModal Modal
    | StoreChanged (Result Decode.Error Store)
    | Submit
    | SwitchLang Lang
    | SwitchLayout Keyboard.Layout
    | SwitchWordSize (Maybe Int)
    | ToastyMsg (Toasty.Msg Notif)
    | UpdateWordSize Int
    | WordsReceived (Result Http.Error String)


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
                        |> notifyWarning I18n.ErrorCorruptedSession
    in
    ( model
    , Cmd.batch [ startNewGame model.store, cmds ]
    )


initialModel : Store -> Model
initialModel store =
    { store = store
    , state = Game.Idle
    , words = []
    , modal =
        if store.helpViewed then
            Nothing

        else
            Just HelpModal
    , toasties = Toasty.initialState
    , time = Time.millisToPosix 0
    , wordSize = store.settings.wordSize |> Maybe.withDefault 5
    }


startNewGame : Store -> Cmd Msg
startNewGame { lang, settings } =
    case settings.wordSize of
        Just _ ->
            Client.getWords lang WordsReceived

        Nothing ->
            getRandomWordSize


getRandomWordSize : Cmd Msg
getRandomWordSize =
    Random.int 5 7
        |> Random.generate UpdateWordSize


getRandomWord : Int -> List Game.WordToFind -> Cmd Msg
getRandomWord wordSize words =
    words
        |> List.filter (String.length >> (==) wordSize)
        -- Guessable words are to pick from topmost common words
        |> List.take 1000
        |> randomWord
        |> Random.generate NewWord


randomWord : List Game.WordToFind -> Random.Generator (Maybe Game.WordToFind)
randomWord words =
    Random.int 0 (List.length words - 1)
        |> Random.andThen (\int -> words |> LE.getAt int |> Random.constant)


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


focus : String -> Cmd Msg
focus domId =
    Dom.focus domId
        |> Task.attempt (always NoOp)


defocus : String -> Cmd Msg
defocus domId =
    Dom.blur domId
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


update : Msg -> Model -> ( Model, Cmd Msg )
update msg ({ store } as model) =
    case ( msg, model.state ) of
        ( BackSpace, Game.Ongoing word guesses input ) ->
            ( { model | state = Game.Ongoing word guesses (String.dropRight 1 input) }
            , Cmd.none
            )

        ( BackSpace, _ ) ->
            ( model, Cmd.none )

        ( Clear, Game.Ongoing word guesses _ ) ->
            ( { model | state = Game.Ongoing word guesses "" }
            , Cmd.none
            )

        ( Clear, _ ) ->
            ( model, Cmd.none )

        ( CloseModal, _ ) ->
            handleHelpViewed
                ( { model | modal = Nothing }
                , defocusMenuButtons
                )

        ( KeyArrowDown, Game.Ongoing word guesses input ) ->
            ( { model
                | state =
                    Game.Ongoing word
                        guesses
                        (if Game.isLastGuess input guesses then
                            ""

                         else
                            input
                        )
              }
            , scrollToBottom "board-container"
            )

        ( KeyArrowDown, _ ) ->
            ( model, Cmd.none )

        ( KeyPressed char, Game.Ongoing word guesses input ) ->
            ( { model
                | state =
                    input
                        |> Game.addChar model.wordSize char
                        |> Game.Ongoing word guesses
              }
            , scrollToBottom "board-container"
            )

        ( KeyPressed _, _ ) ->
            ( model, Cmd.none )

        ( KeyArrowUp, Game.Ongoing word guesses "" ) ->
            ( { model
                | state =
                    guesses
                        |> List.head
                        |> Maybe.map Game.guessToString
                        |> Maybe.withDefault ""
                        |> Game.Ongoing word guesses
              }
            , scrollToBottom "board-container"
            )

        ( KeyArrowUp, _ ) ->
            ( model, Cmd.none )

        ( NewGame, _ ) ->
            ( initialModel store
            , startNewGame store
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
            case Game.validateGuess store.lang model.words word input of
                Ok guess ->
                    ( { model | state = Game.checkGame maxAttempts word (guess :: guesses) }
                    , Cmd.batch
                        [ scrollToBottom "board-container"
                        , focus "btn-play-again"
                        ]
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
                    initialModel newStore
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
                    initialModel newStore
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
                    initialModel store
            in
            ( { newModel | wordSize = wordSize }
            , Client.getWords store.lang WordsReceived
            )

        ( WordsReceived (Ok rawWords), _ ) ->
            let
                words =
                    Game.parseWords model.wordSize rawWords
            in
            ( { model | words = words }
            , getRandomWord model.wordSize words
            )

        ( WordsReceived (Err _), _ ) ->
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


newGameButton : Lang -> Html Msg
newGameButton lang =
    button
        [ id "btn-play-again"
        , class "btn btn-lg btn-success"
        , onClick NewGame
        ]
        [ Icon.icon Icon.PlayAgain [ class "me-1" ]
        , I18n.htmlText lang I18n.PlayAgain
        ]


definitionLink : Lang -> Game.WordToFind -> Html Msg
definitionLink lang word =
    a
        [ class "btn btn-lg btn-info"
        , href ("https://" ++ I18n.langToCode lang ++ ".wiktionary.org/wiki/" ++ word)
        , target "_blank"
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


layout : Model -> List (Html Msg) -> Html Msg
layout ({ store, modal, toasties } as model) content =
    main_ [ class "App" ]
        [ Notif.view ToastyMsg toasties
        , div [ class "Game" ]
            (viewHeader model :: content)
        , case modal of
            Just HelpModal ->
                Help.view store.lang maxAttempts
                    |> viewModal store I18n.Help

            Just SettingsModal ->
                store.settings
                    |> Settings.view
                        { lang = store.lang
                        , switchLayout = SwitchLayout
                        , switchWordSize = SwitchWordSize
                        }
                    |> viewModal store I18n.Settings

            Just StatsModal ->
                Stats.view store
                    |> viewModal store (I18n.StatsLang { lang = store.lang })

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
                    [ text "Fran??ais" ]
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
                            , attribute "aria-label" "Close (ESC)"
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


viewLoader : Html Msg
viewLoader =
    div [ class "Loader d-flex justify-content-center align-items-center" ]
        [ div [ class "spinner-border" ]
            [ span [ class "visually-hidden" ] [ text "Loading???" ]
            ]
        ]


view : Model -> Html Msg
view ({ wordSize, store, state } as model) =
    let
        viewKeyboard =
            Keyboard.view
                { lang = store.lang
                , layout = store.settings.layout
                , backSpace = BackSpace
                , keyPressed = KeyPressed
                , submit = Submit
                }
    in
    layout model
        (case state of
            Game.Idle ->
                [ viewLoader
                , viewKeyboard []
                ]

            Game.Errored error ->
                [ Game.viewError store.lang error
                , p [ class "text-center" ]
                    [ newGameButton store.lang ]
                ]

            Game.Won word guesses ->
                [ guesses
                    |> Game.viewBoard maxAttempts wordSize Nothing
                , endGameButtons store.lang word
                , viewKeyboard guesses
                ]

            Game.Lost word guesses ->
                [ guesses
                    |> Game.appendSolution word
                    |> Game.viewBoard maxAttempts wordSize Nothing
                , endGameButtons store.lang word
                , viewKeyboard guesses
                ]

            Game.Ongoing _ guesses input ->
                [ guesses
                    |> Game.viewBoard maxAttempts wordSize (Just input)
                , viewKeyboard guesses
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
subscriptions { modal, state } =
    Sub.batch
        [ Time.every 1000 NewTime
        , storeChanged (Store.fromJson >> StoreChanged)
        , case ( state, modal ) of
            ( Game.Ongoing _ _ _, Nothing ) ->
                BE.onKeyDown
                    (Event.decodeKey
                        { onKeyPress = KeyPressed
                        , onBackSpace = BackSpace
                        , onEnter = Submit
                        , onEscape = Clear
                        , onArrowUp = KeyArrowUp
                        , onArrowDown = KeyArrowDown
                        }
                    )

            ( Game.Ongoing _ _ _, Just _ ) ->
                BE.onKeyDown
                    (Event.decodeKey
                        { onKeyPress = always NoOp
                        , onBackSpace = CloseModal
                        , onEnter = NoOp
                        , onEscape = CloseModal
                        , onArrowUp = NoOp
                        , onArrowDown = NoOp
                        }
                    )

            _ ->
                Sub.none
        ]



-- Ports


port saveStore : String -> Cmd msg


port storeChanged : (String -> msg) -> Sub msg
