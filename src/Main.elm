module Main exposing (main)

import Browser
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import Random
import Set exposing (Set)
import Words exposing (words)


type Model
    = Idle
    | Errored String
    | Ongoing WordToFind (List Attempt) UserInput (Maybe AttemptError)
    | Lost WordToFind (List Attempt)
    | Won (List Attempt)


type Letter
    = Unused Char
    | Correct Char
    | Misplaced Char


type alias Attempt =
    List Letter


type alias AttemptError =
    String


type alias UserInput =
    String


type alias WordToFind =
    String


type Msg
    = NewGame
    | NewWord (Maybe WordToFind)
    | Submit
    | UpdateTry UserInput


maxAttempts : Int
maxAttempts =
    6


init : () -> ( Model, Cmd Msg )
init _ =
    ( Idle
    , Random.generate NewWord randomWord
    )


randomWord : Random.Generator (Maybe WordToFind)
randomWord =
    Random.int 0 (List.length words - 1)
        |> Random.andThen
            (\int ->
                words
                    |> List.indexedMap
                        (\index word ->
                            if index == int then
                                Just word

                            else
                                Nothing
                        )
                    |> List.filterMap identity
                    |> List.head
                    |> Random.constant
            )


validateAttempt : WordToFind -> UserInput -> Result String Attempt
validateAttempt word input =
    let
        ( wordChars, inputChars ) =
            ( String.toList word
            , input |> String.toLower |> String.trim |> String.toList
            )
    in
    if List.any (Char.isAlpha >> not) inputChars then
        Err "Le mot ne peut contenir que des lettres"

    else if String.length input /= 5 then
        Err "Le mot doit comporter 5 lettres"

    else if not (List.member (String.toLower input) words) then
        Err <| "Désolé, " ++ input ++ " doit être un mot du dictionnaire"

    else
        Ok
            (List.map2
                (\a b ->
                    if a == b then
                        Correct a

                    else if List.member a wordChars then
                        Misplaced a

                    else
                        Unused a
                )
                inputChars
                wordChars
            )


hasWon : List Attempt -> Bool
hasWon attempts =
    case attempts of
        [] ->
            False

        last :: _ ->
            List.all
                (\letter ->
                    case letter of
                        Correct _ ->
                            True

                        _ ->
                            False
                )
                last



-- gameState : Model -> GameState
-- gameState model =
--     if hasWon model.attempts then
--         Won
--     else if List.length model.attempts >= maxAttempts then
--         Lost
--     else
--         Ongoing


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case ( msg, model ) of
        ( NewGame, _ ) ->
            init ()

        ( NewWord (Just newWord), Idle ) ->
            ( Ongoing newWord [] "" Nothing, Cmd.none )

        ( NewWord Nothing, Idle ) ->
            ( Errored "Impossible de trouver un mot à deviner", Cmd.none )

        ( UpdateTry newInput, Ongoing word attempts _ maybeError ) ->
            ( Ongoing word attempts newInput maybeError, Cmd.none )

        ( Submit, Ongoing word attempts input _ ) ->
            case validateAttempt word input of
                Ok attempt ->
                    ( Ongoing word (attempt :: attempts) "" Nothing
                    , Cmd.none
                    )

                Err error ->
                    ( Ongoing word attempts input (Just error), Cmd.none )

        _ ->
            ( Errored "Le jeu est en erreur :(", Cmd.none )


charToText : Char -> Html Msg
charToText =
    Char.toUpper >> List.singleton >> String.fromList >> text


viewAttempt : Attempt -> Html Msg
viewAttempt attempt =
    attempt
        |> List.map
            (\letter ->
                case letter of
                    Misplaced char ->
                        td [ class "letter misplaced bg-warning" ] [ charToText char ]

                    Correct char ->
                        td [ class "letter correct bg-success" ] [ charToText char ]

                    Unused char ->
                        td [ class "letter unused bg-secondary" ] [ charToText char ]
            )
        |> tr []


unusedLetters : List Attempt -> Set Char
unusedLetters =
    List.foldl
        (\attempt unused ->
            attempt
                |> List.filterMap
                    (\letter ->
                        case letter of
                            Unused char ->
                                Just char

                            _ ->
                                Nothing
                    )
                |> Set.fromList
                |> Set.union unused
        )
        (Set.fromList [])


newGameButton : Html Msg
newGameButton =
    p []
        [ button [ class "btn btn-primary", onClick NewGame ]
            [ text "Nouvelle partie" ]
        ]


viewUnusedLetters : List Attempt -> Html Msg
viewUnusedLetters attempts =
    let
        unused =
            attempts |> unusedLetters |> Set.toList
    in
    if List.length unused > 0 then
        div [ class "mb-3" ]
            [ h4 [ class "mb-3" ] [ text "Lettres écartées" ]
            , unused
                |> List.map (charToText >> List.singleton >> code [])
                |> List.intersperse (text ", ")
                |> div []
            ]

    else
        text ""


viewAttempts : List Attempt -> Html Msg
viewAttempts =
    List.reverse
        >> List.map viewAttempt
        >> table [ class "table" ]


view : Model -> Html Msg
view model =
    div []
        [ p []
            [ text "Devinez un mot français de 5 lettres en "
            , strong [] [ text <| String.fromInt maxAttempts ]
            , text " tentatives ou moins\u{00A0}!"
            ]
        , case model of
            Idle ->
                text "Chargement d'une nouvelle partie"

            Errored gameError ->
                div []
                    [ div [ class "alert alert-info" ]
                        [ text "Le jeu n'a pas pu se lancer\u{00A0}:"
                        , text gameError
                        ]
                    , newGameButton
                    ]

            Won attempts ->
                div []
                    [ viewAttempts attempts
                    , h3 []
                        [ text "Vous avez gagné "
                        , if List.length attempts == 1 then
                            strong [] [ text "en un seul coup, bravo\u{00A0}!" ]

                          else
                            span []
                                [ text "en "
                                , strong [] [ text (String.fromInt (List.length attempts)) ]
                                , text " coups\u{00A0}!"
                                ]
                        ]
                    , newGameButton
                    ]

            Lost word attempts ->
                div []
                    [ viewAttempts attempts
                    , h3 [] [ text "Perdu\u{00A0}!" ]
                    , p []
                        [ text "Le mot à deviner était "
                        , strong []
                            [ a
                                [ href ("https://www.larousse.fr/dictionnaires/francais/" ++ word)
                                , target "_blank"
                                ]
                                [ text (String.toUpper word) ]
                            ]
                        , text "."
                        ]
                    , viewUnusedLetters attempts
                    , newGameButton
                    ]

            Ongoing _ attempts input maybeError ->
                div []
                    [ viewAttempts attempts
                    , viewUnusedLetters attempts
                    , case maybeError of
                        Just error ->
                            div [ class "alert alert-info" ] [ text error ]

                        Nothing ->
                            text ""
                    , Html.form [ class "input-group", onSubmit Submit ]
                        [ Html.input
                            [ type_ "text"
                            , class "form-control"
                            , maxlength 5
                            , onInput UpdateTry
                            , value input
                            ]
                            []
                        , button [ class "btn btn-primary" ] [ text "Envoyer" ]
                        ]
                    , div [ class "form-text" ] [ text "Entrez un mot français de 5 lettres" ]
                    ]
        ]


main : Program () Model Msg
main =
    Browser.element
        { init = init
        , view = view
        , update = update
        , subscriptions = always Sub.none
        }
