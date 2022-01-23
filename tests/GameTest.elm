module GameTest exposing (..)

import Expect
import Game exposing (..)
import I18n exposing (Lang(..))
import Test exposing (..)
import TestUtils exposing (asTest)


french =
    [ "agaca"
    , "envie"
    , "epees"
    , "evier"
    , "genie"
    , "ladre"
    , "placa"
    , "titra"
    , "traca"
    , "voila"
    ]


suite : Test
suite =
    describe "Main"
        [ describe "validateGuess"
            [ describe "Error handling"
                [ validateGuess French french "voila" "air"
                    |> Expect.err
                    |> asTest "should validate attempt length"
                , validateGuess French french "voila" "12a45"
                    |> Expect.err
                    |> asTest "should validate attempt contains letters"
                , validateGuess French french "voila" "xxxxx"
                    |> Expect.err
                    |> asTest "should validate attempt is an existing word"
                ]
            , describe "Letters state handling"
                [ validateGuess French french "epees" "evier"
                    |> Expect.equal (Ok [ c 'e', u 'v', u 'i', c 'e', u 'r' ])
                    |> asTest "should validate a word"
                , validateGuess French french "titra" "traca"
                    |> Expect.equal (Ok [ c 't', m 'r', h 'a', u 'c', c 'a' ])
                    |> asTest "should avoid duplicating correct letters as misplaced"
                , validateGuess French french "ladre" "agaça"
                    -- https://twitter.com/signap/status/1480099023440826370
                    |> Expect.equal (Ok [ m 'a', u 'g', h 'a', u 'c', h 'a' ])
                    |> asTest "should avoid duplicating misplaced letters (3 dupes)"
                , validateGuess French french "ladre" "placa"
                    |> Expect.equal (Ok [ u 'p', m 'l', m 'a', u 'c', h 'a' ])
                    |> asTest "should avoid duplicating misplaced letters (2 dupes)"
                , validateGuess French french "envie" "génie"
                    |> Expect.equal (Ok [ u 'g', m 'e', m 'n', c 'i', c 'e' ])
                    |> asTest "should avoid duplicating misplaced letters (2 dupes, bis)"
                , validateGuess French french "voila" "voilà"
                    |> Expect.equal (Ok [ c 'v', c 'o', c 'i', c 'l', c 'a' ])
                    |> asTest "should handle accented input"
                ]
            ]
        , describe "parseWords"
            [ "aaaaa,1.0001\nbbbbb,1.0002"
                |> parseWords 5
                |> Expect.equal [ "bbbbb", "aaaaa" ]
                |> asTest "should parse raw words list"
            ]
        ]


c : Char -> Letter
c =
    Correct


m : Char -> Letter
m =
    Misplaced


u : Char -> Letter
u =
    Unused


h : Char -> Letter
h =
    Handled
