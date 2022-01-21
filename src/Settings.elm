module Settings exposing
    ( Settings
    , decode
    , default
    , encode
    )

import Json.Decode as Decode exposing (Decoder)
import Json.Decode.Pipeline as JDP
import Json.Encode as Encode
import Keyboard


type alias Settings =
    { layout : Keyboard.Layout
    , wordSize : Maybe Int
    }


default : Settings
default =
    { layout = Keyboard.Auto
    , wordSize = Just 5
    }


decode : Decoder Settings
decode =
    Decode.succeed Settings
        |> JDP.optional "layout" Keyboard.decodeLayout Keyboard.Auto
        |> JDP.optional "wordSize" (Decode.maybe Decode.int) Nothing


encode : Settings -> Encode.Value
encode v =
    Encode.object
        [ ( "layout", Keyboard.encodeLayout v.layout )
        , ( "wordSize", v.wordSize |> Maybe.map Encode.int |> Maybe.withDefault Encode.null )
        ]
