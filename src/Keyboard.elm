module Keyboard exposing
    ( KeyState
    , Layout(..)
    , decodeLayout
    , disposition
    , encodeLayout
    , keyState
    , layoutFromString
    , layoutToString
    )

import Game exposing (Letter)
import I18n exposing (Lang(..))
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
