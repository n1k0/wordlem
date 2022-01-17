module Keyboard exposing
    ( KeyState
    , dispositions
    , keyState
    )

import Game exposing (Letter)
import I18n exposing (Lang(..))


type alias KeyState =
    ( Char, Maybe Letter )


dispositions : Lang -> List (List Char)
dispositions lang =
    List.map String.toList
        (case lang of
            French ->
                [ "azertyuiop", "qsdfghjklm", "⏎wxcvbn⌫" ]

            English ->
                [ "qwertyuiop", "asdfghjkl", "⏎zxcvbnm⌫" ]
        )


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
