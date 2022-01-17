module Store exposing
    ( Store
    , addLog
    , decode
    , default
    , encode
    , fromJson
    , toJson
    )

import I18n exposing (Lang)
import Json.Decode as Decode exposing (Decoder)
import Json.Decode.Pipeline as JDP
import Json.Encode as Encode
import Log exposing (Log)


type alias Store =
    { lang : Lang
    , logs : List Log
    , helpViewed : Bool
    }


addLog : Log -> Store -> Store
addLog log ({ logs } as store) =
    { store | logs = log :: logs }


default : Lang -> Store
default lang =
    { lang = lang
    , logs = []
    , helpViewed = False
    }


decode : Decoder Store
decode =
    Decode.succeed Store
        |> JDP.required "lang" (Decode.map I18n.langFromString Decode.string)
        |> JDP.required "logs" (Decode.list Log.decode)
        |> JDP.optional "helpViewed" Decode.bool False


encode : Store -> Encode.Value
encode store =
    Encode.object
        [ ( "lang", Encode.string (I18n.langToString store.lang) )
        , ( "logs", Encode.list Log.encode store.logs )
        , ( "helpViewed", Encode.bool store.helpViewed )
        ]


fromJson : String -> Result Decode.Error Store
fromJson =
    Decode.decodeString decode


toJson : Store -> String
toJson =
    encode >> Encode.encode 0
