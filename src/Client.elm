module Client exposing (..)

import Http exposing (Error)
import I18n exposing (Lang(..))


getWords : Lang -> (Result Error String -> msg) -> Cmd msg
getWords lang msg =
    Http.get
        { url = "db/" ++ I18n.langToCode lang ++ ".txt"
        , expect = Http.expectString msg
        }
