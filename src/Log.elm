module Log exposing (..)

import I18n exposing (Lang)
import Json.Decode as Decode exposing (Decoder)
import Json.Encode as Encode
import Time exposing (Posix)


type alias Log =
    { time : Posix
    , lang : Lang
    , word : WordToFind
    , victory : Bool
    , guesses : Int
    }


type alias WordToFind =
    String


decode : Decoder Log
decode =
    Decode.map5 Log
        (Decode.field "time" (Decode.map Time.millisToPosix Decode.int))
        (Decode.field "lang" (Decode.map I18n.langFromString Decode.string))
        (Decode.field "word" Decode.string)
        (Decode.field "victory" Decode.bool)
        (Decode.field "guesses" Decode.int)


encode : Log -> Encode.Value
encode log =
    Encode.object
        [ ( "time", log.time |> Time.posixToMillis |> Encode.int )
        , ( "lang", log.lang |> I18n.langToString |> Encode.string )
        , ( "word", log.word |> Encode.string )
        , ( "victory", log.victory |> Encode.bool )
        , ( "guesses", log.guesses |> Encode.int )
        ]
