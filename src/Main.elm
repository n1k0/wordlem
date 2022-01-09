module Main exposing (main)

import Browser
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import Random
import Set exposing (Set)
import String.Extra as SE
import Words


type alias Flags =
    { lang : String }


type Lang
    = English
    | French


type alias Model =
    { lang : Lang
    , words : List WordToFind
    , state : GameState
    }


type GameState
    = Idle
    | Errored String
    | Ongoing WordToFind (List Attempt) UserInput (Maybe AttemptError)
    | Lost WordToFind (List Attempt)
    | Won WordToFind (List Attempt)


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
    | SwitchLang Lang
    | UpdateTry UserInput


maxAttempts : Int
maxAttempts =
    6


init : Flags -> ( Model, Cmd Msg )
init flags =
    let
        model =
            initialModel (parseLang flags.lang)
    in
    ( model
    , Random.generate NewWord (randomWord model.words)
    )


initialModel : Lang -> Model
initialModel lang =
    { lang = lang
    , words = getWords lang
    , state = Idle
    }


parseLang : String -> Lang
parseLang string =
    if String.startsWith "fr" string then
        French

    else
        English


langToString : Lang -> String
langToString lang =
    case lang of
        English ->
            "English"

        French ->
            "French"


getWords : Lang -> List WordToFind
getWords lang =
    case lang of
        English ->
            Words.english

        French ->
            Words.french


randomWord : List WordToFind -> Random.Generator (Maybe WordToFind)
randomWord words =
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


validateAttempt : Lang -> WordToFind -> UserInput -> Result String Attempt
validateAttempt lang word input =
    let
        normalize =
            String.toLower >> String.trim >> SE.removeAccents >> String.replace "œ" "oe"

        ( wordChars, inputChars ) =
            ( String.toList (normalize word)
            , String.toList (normalize input)
            )
    in
    if List.any (Char.isAlpha >> not) inputChars then
        Err <| "The word must contains only alphabetic characters: " ++ input

    else if List.length inputChars /= 5 then
        Err "The word must be 5 letters long"

    else if not (List.member (normalize input) (getWords lang)) then
        Err <| "Sorry, " ++ input ++ " must be a known word from our " ++ langToString lang ++ " dictionary"

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


checkGame : WordToFind -> List Attempt -> GameState
checkGame word attempts =
    if hasWon attempts then
        Won word attempts

    else if List.length attempts >= maxAttempts then
        Lost word attempts

    else
        Ongoing word attempts "" Nothing


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case ( msg, model.state ) of
        ( NewGame, _ ) ->
            let
                newModel =
                    initialModel model.lang
            in
            ( newModel
            , Random.generate NewWord (randomWord newModel.words)
            )

        ( NewWord (Just newWord), Idle ) ->
            ( { model | state = Ongoing newWord [] "" Nothing }
            , Cmd.none
            )

        ( NewWord Nothing, Idle ) ->
            ( { model | state = Errored "Unable to pick a word." }
            , Cmd.none
            )

        ( UpdateTry newInput, Ongoing word attempts _ maybeError ) ->
            ( { model | state = Ongoing word attempts newInput maybeError }
            , Cmd.none
            )

        ( Submit, Ongoing word attempts input _ ) ->
            case validateAttempt model.lang word input of
                Ok attempt ->
                    ( { model | state = checkGame word (attempt :: attempts) }
                    , Cmd.none
                    )

                Err error ->
                    ( { model | state = Ongoing word attempts input (Just error) }
                    , Cmd.none
                    )

        ( SwitchLang lang, _ ) ->
            update NewGame { model | lang = lang }

        _ ->
            ( { model | state = Errored "General game state error. This is bad." }
            , Cmd.none
            )


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
    p [ class "mt-2" ]
        [ button [ class "btn btn-primary w-100", onClick NewGame ]
            [ text "Play again" ]
        ]


viewUnusedLetters : List Attempt -> Html Msg
viewUnusedLetters attempts =
    let
        unused =
            attempts |> unusedLetters |> Set.toList
    in
    if List.length unused > 0 then
        div [ class "mb-3" ]
            [ h4 [ class "mb-3" ] [ text "Unused letters" ]
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


selectLang : Lang -> Html Msg
selectLang lang =
    div [ class "nav nav-pills nav-fill mb-3" ]
        [ li [ class "nav-item" ]
            [ button
                [ type_ "button"
                , class "nav-link"
                , classList [ ( "active", lang == English ) ]
                , onClick (SwitchLang English)
                ]
                [ text "English" ]
            ]
        , li [ class "nav-item" ]
            [ button
                [ type_ "button"
                , class "nav-link"
                , classList [ ( "active", lang == French ) ]
                , onClick (SwitchLang French)
                ]
                [ text "French" ]
            ]
        ]


definitionLink : Lang -> WordToFind -> Html Msg
definitionLink lang word =
    a
        [ class "fw-bold"
        , href
            (case lang of
                French ->
                    "https://www.cnrtl.fr/definition/" ++ word

                English ->
                    "https://www.oxfordlearnersdictionaries.com/definition/english/" ++ word
            )
        , title "Lookup the definition of this word (new window)"
        , target "_blank"
        ]
        [ text (String.toUpper word) ]


view : Model -> Html Msg
view model =
    div []
        [ selectLang model.lang
        , p []
            [ text "Guess a 5 letters "
            , strong [] [ text (langToString model.lang) ]
            , text " word in "
            , strong [] [ text <| String.fromInt maxAttempts ]
            , text " attempts or less!"
            ]
        , case model.state of
            Idle ->
                text "Loading game…"

            Errored gameError ->
                div []
                    [ div [ class "alert alert-info" ]
                        [ text "Game data couldn't be loaded:"
                        , text gameError
                        ]
                    , newGameButton
                    ]

            Won word attempts ->
                div []
                    [ viewAttempts attempts
                    , h3 []
                        [ text "You have guessed "
                        , definitionLink model.lang word
                        , if List.length attempts == 1 then
                            strong [] [ text " on your first try, congrats!" ]

                          else
                            span []
                                [ text " in "
                                , strong [] [ text (String.fromInt (List.length attempts)) ]
                                , text " attempts!"
                                ]
                        ]
                    , newGameButton
                    ]

            Lost word attempts ->
                div []
                    [ viewAttempts attempts
                    , h3 [] [ text "This one was hard!" ]
                    , p []
                        [ text "The word to guess was "
                        , definitionLink model.lang word
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
                    , div [ class "form-text" ]
                        [ text <| "Enter a 5 letters " ++ langToString model.lang ++ " word" ]
                    ]
        ]


main : Program Flags Model Msg
main =
    Browser.element
        { init = init
        , view = view
        , update = update
        , subscriptions = always Sub.none
        }
