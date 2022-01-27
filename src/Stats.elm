module Stats exposing (view)

import Charts
import FormatNumber
import FormatNumber.Locales exposing (Decimals(..), frenchLocale)
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import I18n exposing (Lang)
import Log exposing (Log)
import Store exposing (Store)


formatFloat : Int -> Float -> String
formatFloat decimals =
    FormatNumber.format { frenchLocale | decimals = Exact decimals }


formatPercent : Float -> String
formatPercent float =
    formatFloat 0 float ++ "%"


progressBar : Float -> Html msg
progressBar percent =
    div
        [ class "progress" ]
        [ div
            [ class "progress-bar bg-success"
            , style "width" <| String.fromFloat percent ++ "%"
            ]
            []
        ]


view : Store -> List (Html msg)
view { lang, logs } =
    case List.filter (.lang >> (==) lang) logs of
        [] ->
            [ I18n.StatsLangDataMissing { lang = lang }
                |> I18n.htmlText lang
            ]

        logs_ ->
            viewLangStats lang logs_


viewLangStats : Lang -> List Log -> List (Html msg)
viewLangStats lang langLogs =
    let
        onlyVictories =
            List.filter .victory

        totalPlayed =
            List.length langLogs

        totalWins =
            List.length (onlyVictories langLogs)

        percentWin =
            toFloat totalWins / toFloat totalPlayed * 100

        totalGuesses =
            langLogs |> onlyVictories |> List.map .guesses |> List.sum

        guessAvg =
            toFloat totalGuesses / toFloat totalWins

        chartLogs =
            langLogs
                |> List.reverse
                |> List.take 100

        row nbGuess =
            let
                wins =
                    langLogs
                        |> onlyVictories
                        |> List.filter (.guesses >> (==) nbGuess)
                        |> List.length

                percent =
                    toFloat wins / toFloat totalWins * 100
            in
            tr []
                [ th [ class "text-end" ] [ text (String.fromInt nbGuess) ]
                , td [ class "text-end" ] [ wins |> String.fromInt |> text ]
                , td [ class "text-end" ] [ text (formatPercent percent) ]
                , td [ class "w-100" ] [ progressBar percent ]
                ]

        stat nodes =
            div [ class "col-4 text-center lh-1 mb-4" ]
                nodes
    in
    [ div [ class "row" ]
        [ stat
            [ div [ class "fs-3" ] [ text (String.fromInt totalPlayed) ]
            , small [] [ I18n.htmlText lang I18n.StatsGamesPlayed ]
            ]
        , stat
            [ div [ class "fs-3" ] [ text (formatPercent percentWin) ]
            , small [] [ I18n.htmlText lang I18n.StatsWinRate ]
            ]
        , if guessAvg > 0 then
            stat
                [ div [ class "fs-3" ] [ text (formatFloat 2 guessAvg) ]
                , small [] [ I18n.htmlText lang I18n.StatsAverageGuesses ]
                ]

          else
            text ""
        ]
    , div [ class "table-responsive" ]
        [ h2 [ class "fs-5" ]
            [ I18n.StatsGuessDistribution { lang = lang }
                |> I18n.htmlText lang
            ]
        , table [ class "table" ]
            [ List.range 1 6
                |> List.map row
                |> tbody []
            ]
        ]
    , div []
        [ h2 [ class "fs-5" ]
            [ I18n.StatsGuessEvolution { lang = lang }
                |> I18n.htmlText lang
            ]
        , I18n.StatsGuessEvolutionHelp
            { lang = lang, length = List.length chartLogs }
            |> I18n.paragraph lang
        , chartLogs
            |> Charts.logs
        ]
    ]
