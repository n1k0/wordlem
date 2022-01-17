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
import Json.Encode as Encode
import Log exposing (Log)


type alias Store =
    { lang : Lang
    , logs : List Log
    }


addLog : Log -> Store -> Store
addLog log ({ logs } as store) =
    { store | logs = log :: logs }


default : Lang -> Store
default lang =
    { lang = lang
    , logs = []
    }


decode : Decoder Store
decode =
    Decode.map2 Store
        (Decode.field "lang" (Decode.map I18n.langFromString Decode.string))
        (Decode.field "logs" (Decode.list Log.decode))


encode : Store -> Encode.Value
encode store =
    Encode.object
        [ ( "lang", Encode.string (I18n.langToString store.lang) )
        , ( "logs", Encode.list Log.encode store.logs )
        ]


fromJson : String -> Result Decode.Error Store
fromJson =
    Decode.decodeString decode


toJson : Store -> String
toJson =
    encode >> Encode.encode 0
