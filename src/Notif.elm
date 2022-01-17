module Notif exposing (Notif(..), add, config, view, viewNotif)

import Html exposing (..)
import Html.Attributes exposing (..)
import Toasty


type Notif
    = Info String
    | Success String
    | Warning String


config : Toasty.Config msg
config =
    Toasty.config
        |> Toasty.delay 2500
        |> Toasty.containerAttrs [ class "Notifs" ]


add :
    (Toasty.Msg Notif -> msg)
    -> Notif
    -> ( { model | toasties : Toasty.Stack Notif }, Cmd msg )
    -> ( { model | toasties : Toasty.Stack Notif }, Cmd msg )
add msg =
    Toasty.addToast config msg


viewNotif : Notif -> Html msg
viewNotif notif =
    let
        ( level, message ) =
            case notif of
                Info string ->
                    ( "info", string )

                Success string ->
                    ( "success", string )

                Warning string ->
                    ( "warning", string )
    in
    div
        [ class <| "Notif fs-5 alert alert-" ++ level ]
        [ text message ]


view : (Toasty.Msg Notif -> msg) -> Toasty.Stack Notif -> Html msg
view =
    Toasty.view config viewNotif
