module Keyboard exposing
    ( KeyState
    , Layout(..)
    , decodeLayout
    , disposition
    , encodeLayout
    , keyState
    , layoutFromString
    , layoutToString
    , view
    )

import Game exposing (Letter)
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import I18n exposing (Lang(..))
import Icon
import Json.Decode as Decode exposing (Decoder)
import Json.Encode as Encode


type Layout
    = Auto
    | Azerty
    | Qwerty


type alias KeyState =
    ( Char, Maybe Letter )


defaultLangLayout : Lang -> Layout
defaultLangLayout lang =
    case lang of
        French ->
            Azerty

        English ->
            Qwerty


disposition : Lang -> Layout -> List (List Char)
disposition lang layout =
    case layout of
        Auto ->
            disposition lang (defaultLangLayout lang)

        Azerty ->
            List.map String.toList
                [ "azertyuiop", "qsdfghjklm", "⏎wxcvbn⌫" ]

        Qwerty ->
            List.map String.toList
                [ "qwertyuiop", "asdfghjkl", "⏎zxcvbnm⌫" ]


keyState : List Game.Guess -> Char -> KeyState
keyState guesses char =
    ( char
    , if List.any (List.any (Game.letterIs Game.Correct char)) guesses then
        Just (Game.Correct char)

      else if List.any (List.any (Game.letterIs Game.Misplaced char)) guesses then
        Just (Game.Misplaced char)

      else if List.any (List.any (Game.letterIs Game.Unused char)) guesses then
        Just (Game.Unused char)

      else
        Nothing
    )


encodeLayout : Layout -> Encode.Value
encodeLayout layout =
    Encode.string (layoutToString layout)


decodeLayout : Decoder Layout
decodeLayout =
    Decode.map layoutFromString Decode.string


layoutToString : Layout -> String
layoutToString layout =
    case layout of
        Auto ->
            "auto"

        Azerty ->
            "azerty"

        Qwerty ->
            "qwerty"


layoutFromString : String -> Layout
layoutFromString string =
    case string of
        "azerty" ->
            Azerty

        "qwerty" ->
            Qwerty

        _ ->
            Auto


type alias ViewConfig msg =
    { lang : Lang
    , layout : Layout
    , backSpace : msg
    , keyPressed : Char -> msg
    , submit : msg
    }


view : ViewConfig msg -> Game.Board -> Html msg
view config guesses =
    config.layout
        |> disposition config.lang
        |> List.map
            (div [ class "KeyboardRow" ]
                << List.map (keyState guesses >> viewKeyState config)
            )
        |> footer [ class "Keyboard" ]


viewKeyState : ViewConfig msg -> KeyState -> Html msg
viewKeyState config ( char, letter ) =
    let
        baseClasses =
            "KeyboardKey btn"

        ( classes, msg ) =
            case letter of
                Just (Game.Correct _) ->
                    ( "btn-success", config.keyPressed char )

                Just (Game.Misplaced _) ->
                    ( "btn-warning", config.keyPressed char )

                Just (Game.Unused _) ->
                    ( "bg-dark text-light", config.keyPressed char )

                _ ->
                    if char == '⌫' then
                        ( "btn-info large-key", config.backSpace )

                    else if char == '⏎' then
                        ( "btn-info large-key", config.submit )

                    else
                        ( "btn-secondary", config.keyPressed char )
    in
    button
        [ class (String.join " " [ baseClasses, classes ])
        , onClick msg
        , tabindex -1
        ]
        [ case char of
            '⌫' ->
                Icon.icon Icon.Backspace []

            '⏎' ->
                Icon.icon Icon.Enter []

            _ ->
                text (Game.charToText char)
        ]
