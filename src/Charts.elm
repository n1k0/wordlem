module Charts exposing (logs)

import Chart as C
import Chart.Attributes as CA
import Html exposing (Html)


logs : List { a | guesses : Int, victory : Bool } -> Html msg
logs data =
    C.chart
        [ CA.height 200
        , CA.width 600
        , CA.margin { top = 10, bottom = 10, left = 10, right = 10 }
        , CA.domain
            [ CA.lowest 0 CA.orLower
            , CA.highest 6 CA.orHigher
            ]
        ]
        [ C.yLabels [ CA.withGrid ]
        , C.bars
            [ CA.margin 0.02 ]
            [ C.bar
                (\{ guesses, victory } ->
                    if victory then
                        toFloat guesses

                    else
                        0
                )
                [ CA.color CA.blue ]
            ]
            data
        ]
