module MainTest exposing (..)

import Expect exposing (Expectation)
import I18n exposing (Lang(..))
import Json.Decode as Decode
import Json.Encode as Encode
import Main exposing (..)
import Test exposing (..)


asTest : String -> Expectation -> Test
asTest label =
    always >> test label


suite : Test
suite =
    describe "Main"
        [ describe "validateGuess"
            [ describe "Error handling"
                [ validateGuess French "voila" "air"
                    |> Expect.err
                    |> asTest "should validate attempt length"
                , validateGuess French "voila" "12a45"
                    |> Expect.err
                    |> asTest "should validate attempt contains letters"
                , validateGuess French "voila" "xxxxx"
                    |> Expect.err
                    |> asTest "should validate attempt is an existing word"
                ]
            , describe "Letters state handling"
                [ validateGuess French "epees" "evier"
                    |> Expect.equal (Ok [ c 'e', u 'v', u 'i', c 'e', u 'r' ])
                    |> asTest "should validate a word"
                , validateGuess French "titra" "traca"
                    |> Expect.equal (Ok [ c 't', m 'r', h 'a', u 'c', c 'a' ])
                    |> asTest "should avoid duplicating correct letters as misplaced"
                , validateGuess French "ladre" "agaça"
                    -- https://twitter.com/signap/status/1480099023440826370
                    |> Expect.equal (Ok [ m 'a', u 'g', h 'a', u 'c', h 'a' ])
                    |> asTest "should avoid duplicating misplaced letters (3 dupes)"
                , validateGuess French "ladre" "placa"
                    |> Expect.equal (Ok [ u 'p', m 'l', m 'a', u 'c', h 'a' ])
                    |> asTest "should avoid duplicating misplaced letters (2 dupes)"
                , validateGuess French "envie" "génie"
                    |> Expect.equal (Ok [ u 'g', m 'e', m 'n', c 'i', c 'e' ])
                    |> asTest "should avoid duplicating misplaced letters (2 dupes, bis)"
                ]
            ]
        , describe "decodeKey"
            [ keyJsonEvent "a"
                |> Decode.decodeString decodeKey
                |> Expect.equal (Ok (KeyPressed 'a'))
                |> asTest "should decode a single char"
            , keyJsonEvent "A"
                |> Decode.decodeString decodeKey
                |> Expect.equal (Ok (KeyPressed 'a'))
                |> asTest "should decode a single char to its lowercase version"
            , keyJsonEvent "ç"
                |> Decode.decodeString decodeKey
                |> Expect.equal (Ok (KeyPressed 'c'))
                |> asTest "should decode a single char to its unaccented version"
            , keyJsonEvent "Backspace"
                |> Decode.decodeString decodeKey
                |> Expect.equal (Ok BackSpace)
                |> asTest "should decode the Backspace key"
            , keyJsonEvent "Enter"
                |> Decode.decodeString decodeKey
                |> Expect.equal (Ok Submit)
                |> asTest "should decode the Enter key"
            , keyJsonEvent "Escape"
                |> Decode.decodeString decodeKey
                |> Expect.equal (Ok CloseModal)
                |> asTest "should decode the Escape key"
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


keyJsonEvent : String -> String
keyJsonEvent key =
    Encode.object [ ( "key", Encode.string key ) ]
        |> Encode.encode 0
