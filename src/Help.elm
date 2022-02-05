module Help exposing (view)

import Game
import Html exposing (..)
import Html.Attributes exposing (..)
import I18n exposing (Id(..), Lang(..))
import Markdown


view : Lang -> Int -> List (Html msg)
view lang maxAttempts =
    let
        demo =
            [ Game.Correct 'r'
            , Game.Unused 'e'
            , Game.Misplaced 'f'
            , Game.Handled 'e'
            , Game.Handled 'r'
            , Game.Handled 'e'
            , Game.Correct 'e'
            ]
    in
    [ I18n.HelpGamePitch { lang = lang, maxGuesses = maxAttempts }
        |> I18n.paragraph lang
    , I18n.paragraph lang I18n.HelpKeyboard
    , div [ class "BoardRowExample mb-3" ]
        [ Game.viewGuess (List.length demo) demo ]
    , I18n.paragraph lang I18n.HelpInThisExample
    , guessDescription lang demo
        |> List.map (\line -> li [] [ text line ])
        |> ul []
    , I18n.paragraph lang I18n.HelpKeyboardLetter
    , I18n.HelpInspiredBy
        { wordleUrl = "https://www.powerlanguage.co.uk/wordle/"
        , githubUrl = "https://github.com/n1k0/wordlem"
        }
        |> I18n.translate lang
        |> Markdown.toHtml [ class "Markdown" ]
    ]


guessDescription : Lang -> Game.Guess -> List String
guessDescription lang =
    List.map
        (\letter ->
            I18n.translate lang
                (case letter of
                    Game.Correct c ->
                        I18n.HelpLetterCorrectlyPlaced { letter = Game.charToText c }

                    Game.Misplaced c ->
                        I18n.HelpLetterMisplaced { letter = Game.charToText c }

                    Game.Unused c ->
                        I18n.HelpLetterUnused { letter = Game.charToText c }

                    Game.Handled c ->
                        I18n.HelpLetterHandled { letter = Game.charToText c }
                )
        )
