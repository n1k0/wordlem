module MainTest exposing (..)

import Expect exposing (Expectation)
import Main exposing (..)
import Test exposing (..)


asTest : String -> Expectation -> Test
asTest label =
    always >> test label


suite : Test
suite =
    describe "Main"
        [ describe "validateAttempt"
            [ describe "Error handling"
                [ validateAttempt French "voila" "air"
                    |> Expect.err
                    |> asTest "should validate attempt length"
                , validateAttempt French "voila" "12a45"
                    |> Expect.err
                    |> asTest "should validate attempt contains letters"
                , validateAttempt French "voila" "xxxxx"
                    |> Expect.err
                    |> asTest "should validate attempt is an existing word"
                ]
            , describe "Letters state handling"
                [ --     validateAttempt French "epees" "evier"
                  --     |> Expect.equal (Ok [ c 'e', u 'v', u 'i', c 'e', u 'r' ])
                  --     |> asTest "should validate a word"
                  -- , validateAttempt French "titra" "traca"
                  --     |> Expect.equal (Ok [ c 't', m 'r', h 'a', u 'c', c 'a' ])
                  --     |> asTest "should avoid duplicating correct letters as misplaced"
                  -- , validateAttempt French "ladre" "agaça"
                  --     -- https://twitter.com/signap/status/1480099023440826370
                  --     |> Expect.equal (Ok [ m 'a', u 'g', h 'a', u 'c', h 'a' ])
                  --     |> asTest "should avoid duplicating misplaced letters (3 dupes)"
                  -- , validateAttempt French "ladre" "placa"
                  --     |> Expect.equal (Ok [ u 'p', m 'l', m 'a', u 'c', h 'a' ])
                  --     |> asTest "should avoid duplicating misplaced letters (2 dupes)"
                  validateAttempt French "envie" "génie"
                    |> Expect.equal (Ok [ u 'g', m 'e', m 'n', c 'i', c 'e' ])
                    |> asTest "should avoid duplicating misplaced letters (2 dupes, bis)"
                ]
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
