module Store exposing
    ( Store
    , addLog
    , decode
    , default
    , encode
    , fromJson
    , toJson
    , updateSettings
    )

import I18n exposing (Lang)
import Json.Decode as Decode exposing (Decoder)
import Json.Decode.Pipeline as JDP
import Json.Encode as Encode
import Log exposing (Log)
import Settings exposing (Settings)


type alias Store =
    { lang : Lang
    , logs : List Log
    , helpViewed : Bool
    , settings : Settings
    }


addLog : Log -> Store -> Store
addLog log ({ logs } as store) =
    { store | logs = log :: logs }


default : Lang -> Store
default lang =
    { lang = lang
    , logs = []
    , helpViewed = False
    , settings = Settings.default
    }


decode : Decoder Store
decode =
    Decode.succeed Store
        |> JDP.required "lang" (Decode.map I18n.langFromString Decode.string)
        |> JDP.required "logs" (Decode.list Log.decode)
        |> JDP.optional "helpViewed" Decode.bool False
        |> JDP.optional "settings" Settings.decode Settings.default


encode : Store -> Encode.Value
encode store =
    Encode.object
        [ ( "lang", Encode.string (I18n.langToString store.lang) )
        , ( "logs", Encode.list Log.encode store.logs )
        , ( "helpViewed", Encode.bool store.helpViewed )
        , ( "settings", Settings.encode store.settings )
        ]


fromJson : String -> Result Decode.Error Store
fromJson =
    Decode.decodeString decode


toJson : Store -> String
toJson =
    encode >> Encode.encode 0


updateSettings : (Settings -> Settings) -> Store -> Store
updateSettings update ({ settings } as store) =
    { store | settings = update settings }
