module EventTest exposing (..)

import Event
import Expect
import Json.Decode as Decode
import Json.Encode as Encode
import Test exposing (..)
import TestUtils exposing (asTest)


type TestMsg
    = KeyPressed Char
    | BackSpace
    | Submit
    | CloseModal
    | ArrowUp
    | ArrowDown


testDecodeKey : String -> Result Decode.Error TestMsg
testDecodeKey key =
    Encode.object [ ( "key", Encode.string key ) ]
        |> Encode.encode 0
        |> Decode.decodeString
            (Event.decodeKey
                { onKeyPress = KeyPressed
                , onBackSpace = BackSpace
                , onEnter = Submit
                , onEscape = CloseModal
                , onArrowUp = ArrowUp
                , onArrowDown = ArrowDown
                }
            )


suite : Test
suite =
    describe "Main"
        [ describe "decodeKey"
            [ testDecodeKey "a"
                |> Expect.equal (Ok (KeyPressed 'a'))
                |> asTest "should decode a single char"
            , testDecodeKey "A"
                |> Expect.equal (Ok (KeyPressed 'a'))
                |> asTest "should decode a single char to its lowercase version"
            , testDecodeKey "ç"
                |> Expect.equal (Ok (KeyPressed 'c'))
                |> asTest "should decode a single char to its unaccented version"
            , testDecodeKey "Backspace"
                |> Expect.equal (Ok BackSpace)
                |> asTest "should decode the Backspace key"
            , testDecodeKey "Enter"
                |> Expect.equal (Ok Submit)
                |> asTest "should decode the Enter key"
            , testDecodeKey "Escape"
                |> Expect.equal (Ok CloseModal)
                |> asTest "should decode the Escape key"
            , testDecodeKey "ArrowUp"
                |> Expect.equal (Ok ArrowUp)
                |> asTest "should decode the ArrowUp key"
            , testDecodeKey "ArrowDown"
                |> Expect.equal (Ok ArrowDown)
                |> asTest "should decode the ArrowDown key"
            ]
        ]
