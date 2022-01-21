module Settings exposing
    ( Settings
    , decode
    , default
    , encode
    )

import Json.Decode as Decode exposing (Decoder)
import Json.Encode as Encode
import Keyboard


type alias Settings =
    { layout : Keyboard.Layout
    }


default : Settings
default =
    { layout = Keyboard.Auto }


decode : Decoder Settings
decode =
    Decode.map Settings
        (Decode.field "layout" Keyboard.decodeLayout)


encode : Settings -> Encode.Value
encode v =
    Encode.object
        [ ( "layout", Keyboard.encodeLayout v.layout )
        ]
