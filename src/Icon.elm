module Icon exposing (Name(..), icon)

import Html exposing (..)
import Html.Attributes exposing (..)


type Name
    = PlayAgain
    | Definition
    | Backspace
    | Enter
    | Stats
    | Help
    | Close
    | Settings


icon : Name -> List (Attribute msg) -> Html msg
icon name attrs =
    i
        (attrs
            ++ [ class <| "icon icon-" ++ nameToString name
               , attribute "aria-hidden" "true"
               ]
        )
        []


nameToString : Name -> String
nameToString name =
    case name of
        PlayAgain ->
            "play-again"

        Definition ->
            "definition"

        Backspace ->
            "backspace"

        Enter ->
            "enter"

        Stats ->
            "stats"

        Help ->
            "help"

        Close ->
            "close"

        Settings ->
            "settings"
