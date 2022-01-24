module Event exposing (decodeKey)

import Json.Decode as Decode exposing (Decoder)
import String.Extra as SE


type alias Config msg =
    { onKeyPress : Char -> msg
    , onBackSpace : msg
    , onEnter : msg
    , onEscape : msg
    , onArrowUp : msg
    , onArrowDown : msg
    }


decodeKey : Config msg -> Decoder msg
decodeKey { onKeyPress, onBackSpace, onEnter, onEscape, onArrowUp, onArrowDown } =
    Decode.field "key" Decode.string
        |> Decode.andThen
            (\key ->
                case String.uncons (SE.removeAccents (String.toLower key)) of
                    Just ( char, "" ) ->
                        if Char.isAlpha char then
                            Decode.succeed (onKeyPress char)

                        else
                            Decode.fail "discarded char"

                    _ ->
                        if key == "ArrowUp" then
                            Decode.succeed onArrowUp

                        else if key == "ArrowDown" then
                            Decode.succeed onArrowDown

                        else if key == "Backspace" then
                            Decode.succeed onBackSpace

                        else if key == "Enter" then
                            Decode.succeed onEnter

                        else if key == "Escape" then
                            Decode.succeed onEscape

                        else
                            Decode.fail "discarded key"
            )
