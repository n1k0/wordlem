module Settings exposing
    ( Settings
    , decode
    , default
    , encode
    , view
    )

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import I18n exposing (Id(..), Lang(..))
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
        |> JDP.optional "wordSize" (Decode.maybe Decode.int) (Just 5)


encode : Settings -> Encode.Value
encode v =
    Encode.object
        [ ( "layout", Keyboard.encodeLayout v.layout )
        , ( "wordSize", v.wordSize |> Maybe.map Encode.int |> Maybe.withDefault Encode.null )
        ]


type alias ViewConfig msg =
    { lang : Lang
    , switchLayout : Keyboard.Layout -> msg
    , switchWordSize : Maybe Int -> msg
    }


view : ViewConfig msg -> Settings -> List (Html msg)
view { lang, switchLayout, switchWordSize } settings =
    [ -- Keyboard layout setting
      div [ class "mb-3" ]
        [ label []
            [ I18n.SettingsKeyboardLayout |> I18n.htmlText lang
            ]
        , [ Keyboard.Auto, Keyboard.Azerty, Keyboard.Qwerty ]
            |> List.map
                (\l ->
                    option
                        [ value (Keyboard.layoutToString l)
                        , selected <| l == settings.layout
                        ]
                        [ l |> Keyboard.layoutToString |> String.toUpper |> text ]
                )
            |> select
                [ class "form-select w-100 mt-1"
                , onInput (Keyboard.layoutFromString >> switchLayout)
                ]
        ]

    -- Word size setting
    , div [ class "mb-3" ]
        [ label []
            [ I18n.SettingsWordSize |> I18n.htmlText lang
            ]
        , [ ( Nothing, I18n.SettingsWordSizeRandom )
          , ( Just 5, I18n.SettingsWordSizeInt { size = 5 } )
          , ( Just 6, I18n.SettingsWordSizeInt { size = 6 } )
          , ( Just 7, I18n.SettingsWordSizeInt { size = 7 } )
          ]
            |> List.map
                (\( wordSize, i18n ) ->
                    option
                        [ selected <| wordSize == settings.wordSize
                        , wordSize
                            |> Maybe.map String.fromInt
                            |> Maybe.withDefault ""
                            |> value
                        ]
                        [ text (I18n.translate lang i18n) ]
                )
            |> select
                [ class "form-select w-100 mt-1"
                , onInput (String.toInt >> switchWordSize)
                ]
        ]
    ]
