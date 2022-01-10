module Main exposing (Lang(..), Letter(..), main, validateAttempt)

import Browser
import Dict exposing (Dict)
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import Markdown
import Random
import String.Extra as SE
import String.Interpolate exposing (interpolate)
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
    | Handled Char


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
            "français"


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
            String.toLower
                >> String.trim
                >> SE.removeAccents
                -- French being French…
                >> String.replace "œ" "oe"

        ( wordChars, inputChars ) =
            ( String.toList (normalize word)
            , String.toList (normalize input)
            )
    in
    if List.any (Char.isAlpha >> not) inputChars then
        "The word must contains only alphabetic characters: {0}"
            |> translate lang [ input ]
            |> Err

    else if List.length inputChars /= 5 then
        "The word must be 5 letters long"
            |> translate lang []
            |> Err

    else if not (List.member (normalize input) (getWords lang)) then
        "Sorry, {0} must be a known word from our {1} dictionary"
            |> translate lang [ input, langToString lang ]
            |> Err

    else
        wordChars
            |> List.map2 (mapChars wordChars) inputChars
            |> handleCorrectDuplicates wordChars
            |> handleMisplacedDuplicates wordChars
            |> Ok


mapChars : List Char -> Char -> Char -> Letter
mapChars wordChars inputChar wordChar =
    if inputChar == wordChar then
        Correct inputChar

    else if List.member inputChar wordChars then
        Misplaced inputChar

    else
        Unused inputChar


{-| Find correctly placed letters; for each, if there's only one occurence in the word,
then check for misplaced same letter in the attempt and mark them as Handled.
-}
handleCorrectDuplicates : List Char -> Attempt -> Attempt
handleCorrectDuplicates wordChars attempt =
    attempt
        |> List.map
            (\letter ->
                case letter of
                    Misplaced c ->
                        let
                            ( nbCharsInWord, nbCorrectInAttempt ) =
                                ( -- count number of this char in target word
                                  List.length (List.filter ((==) c) wordChars)
                                  -- number of already correct char for
                                , List.length (List.filter (isCorrectChar c) attempt)
                                )
                        in
                        if nbCorrectInAttempt > nbCharsInWord then
                            -- there's enough correct letters for this char already
                            Handled c

                        else
                            letter

                    _ ->
                        letter
            )


{-| If a word contains a single A, and you provide an attempt with 3 As, you'll have 3
misplaced As while we only want one, ideally the first one, with others marked as Handled.
-}
handleMisplacedDuplicates : List Char -> Attempt -> Attempt
handleMisplacedDuplicates wordChars =
    List.foldl
        (\letter acc ->
            case letter of
                Misplaced c ->
                    let
                        ( nbCharInWord, nbCharInAcc ) =
                            -- count number of this char in target word
                            ( List.length (List.filter ((==) c) wordChars)
                              -- number of already misplaced char for in accumulator
                            , List.length (List.filter (isMisplacedChar c) acc)
                            )
                    in
                    if nbCharInAcc >= nbCharInWord then
                        -- there's enough misplaced letters for this char already
                        acc ++ [ Handled c ]

                    else
                        acc ++ [ letter ]

                _ ->
                    acc ++ [ letter ]
        )
        []


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
            ( { model
                | state =
                    "Unable to pick a word."
                        |> translate model.lang []
                        |> Errored
              }
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
            ( { model
                | state =
                    "General game state error. This is bad."
                        |> translate model.lang []
                        |> Errored
              }
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

                    Handled char ->
                        td [ class "letter handled bg-secondary" ] [ charToText char ]
            )
        |> tr []


isCorrectChar : Char -> Letter -> Bool
isCorrectChar char letter =
    case letter of
        Correct c ->
            c == char

        _ ->
            False


isMisplacedChar : Char -> Letter -> Bool
isMisplacedChar char letter =
    case letter of
        Misplaced c ->
            c == char

        _ ->
            False


isUnusedChar : Char -> Letter -> Bool
isUnusedChar char letter =
    case letter of
        Unused c ->
            c == char

        _ ->
            False


newGameButton : Lang -> Html Msg
newGameButton lang =
    p [ class "mt-3" ]
        [ button [ class "btn btn-lg btn-primary w-100", onClick NewGame ]
            [ "Play again"
                |> translate lang []
                |> text
            ]
        ]


keyboard : List Attempt -> List ( Char, Maybe Letter )
keyboard attempts =
    String.toList "abcdefghijklmnopqrstuvwxyz"
        |> List.map
            (\c ->
                let
                    ( hasCorrect, hasMisplaced, hasUnused ) =
                        ( attempts |> List.any (List.any (isCorrectChar c))
                        , attempts |> List.any (List.any (isMisplacedChar c))
                        , attempts |> List.any (List.any (isUnusedChar c))
                        )
                in
                ( c
                , if hasCorrect then
                    Just (Correct c)

                  else if hasMisplaced then
                    Just (Misplaced c)

                  else if hasUnused then
                    Just (Unused c)

                  else
                    Nothing
                )
            )


viewKeyboard : List Attempt -> Html Msg
viewKeyboard attempts =
    div [ class "mb-3" ]
        [ keyboard attempts
            |> List.map
                (\( char, letter ) ->
                    case letter of
                        Just (Correct _) ->
                            div [ class "text-success" ] [ charToText char ]

                        Just (Misplaced _) ->
                            div [ class "text-warning" ] [ charToText char ]

                        Just (Unused _) ->
                            div [ class "text-decoration-line-through text-secondary" ]
                                [ charToText char ]

                        _ ->
                            div [] [ charToText char ]
                )
            |> div [ class "d-flex w-100 justify-content-between fw-bold" ]
        ]


viewAttempts : List Attempt -> Html Msg
viewAttempts =
    List.reverse
        >> List.map viewAttempt
        >> table [ class "table" ]


definitionLink : Lang -> WordToFind -> Html Msg
definitionLink lang word =
    p [ class "text-center" ]
        [ a
            [ class "btn btn-primary w-100"
            , target "_blank"
            , href
                (case lang of
                    French ->
                        "https://fr.wiktionary.org/wiki/" ++ word

                    English ->
                        "https://en.wiktionary.org/wiki/" ++ word
                )
            ]
            [ "Definition of {0} on Wiktionary"
                |> translate lang [ String.toUpper word ]
                |> text
            ]
        ]


selectLang : Lang -> Html Msg
selectLang lang =
    div [ class "nav nav-pills nav-fill" ]
        [ li [ class "nav-item" ]
            [ button
                [ type_ "button"
                , class "nav-link"
                , classList [ ( "active", lang == English ) ]
                , onClick (SwitchLang English)
                , "Switch to {0} dictionary"
                    |> translate lang [ langToString English ]
                    |> title
                ]
                [ text "English" ]
            ]
        , li [ class "nav-item" ]
            [ button
                [ type_ "button"
                , class "nav-link"
                , classList [ ( "active", lang == French ) ]
                , onClick (SwitchLang French)
                , "Switch to {0} dictionary"
                    |> translate lang [ langToString French ]
                    |> title
                ]
                [ text "Français" ]
            ]
        ]


layout : Lang -> List (Html Msg) -> Html Msg
layout lang content =
    div [ class "game container" ]
        [ div [ class "d-flex justify-content-between align-items-center my-3" ]
            [ h1 [ class "p-0" ] [ text "Wordlem" ]
            , selectLang lang
            ]
        , main_ [] content
        , footer [ class "border-top mt-3 pt-2" ]
            [ "Inspired by [Wordle]({0}) - [Source code]({1})"
                |> translate lang
                    [ "https://www.powerlanguage.co.uk/wordle/"
                    , "https://github.com/n1k0/wordlem"
                    ]
                |> Markdown.toHtml
                    [ class "text-center text-muted"
                    , style "font-size" ".8em"
                    ]
            ]
        ]


view : Model -> Html Msg
view model =
    layout model.lang
        [ p []
            [ "Guess a 5 letters {0} word in {1} attempts or less!"
                |> translate model.lang
                    [ langToString model.lang
                    , String.fromInt maxAttempts
                    ]
                |> text
            ]
        , case model.state of
            Idle ->
                "Loading game…"
                    |> translate model.lang []
                    |> text

            Errored gameError ->
                div []
                    [ div [ class "alert alert-info" ]
                        [ "Game data couldn't be loaded: {0}"
                            |> translate model.lang [ gameError ]
                            |> text
                        ]
                    , newGameButton model.lang
                    ]

            Won word attempts ->
                div []
                    [ viewAttempts attempts
                    , h3 []
                        [ if List.length attempts == 1 then
                            "You successfully guessed {0} on your first try, congrats!"
                                |> translate model.lang [ word ]
                                |> text

                          else
                            "You successfully guessed {0} in {1} attempts, congrats!"
                                |> translate model.lang [ word, String.fromInt (List.length attempts) ]
                                |> text
                        ]
                    , definitionLink model.lang word
                    , newGameButton model.lang
                    ]

            Lost word attempts ->
                div []
                    [ viewAttempts attempts
                    , h3 [ class "mb-3" ]
                        [ "This one was hard!"
                            |> translate model.lang []
                            |> text
                        ]
                    , word
                        |> String.toList
                        |> List.map Correct
                        |> List.singleton
                        |> viewAttempts
                    , definitionLink model.lang word
                    , viewKeyboard attempts
                    , newGameButton model.lang
                    ]

            Ongoing _ attempts input maybeError ->
                div []
                    [ viewAttempts attempts
                    , viewKeyboard attempts
                    , case maybeError of
                        Just error ->
                            div [ class "alert alert-info" ] [ text error ]

                        Nothing ->
                            text ""
                    , Html.form [ class "input-group mb-0", onSubmit Submit ]
                        [ Html.input
                            [ type_ "text"
                            , class "form-control"
                            , maxlength 5
                            , onInput UpdateTry
                            , value input
                            ]
                            []
                        , button [ class "btn btn-primary" ]
                            [ "Submit" |> translate model.lang [] |> text ]
                        ]
                    , div [ class "form-text" ]
                        [ "Enter a 5 letters {0} word"
                            |> translate model.lang [ langToString model.lang ]
                            |> text
                        ]
                    ]
        ]


translate : Lang -> List String -> String -> String
translate lang params string =
    case lang of
        English ->
            interpolate string params

        French ->
            translations
                |> Dict.get string
                |> Maybe.withDefault string
                |> (\s -> interpolate s params)


translations : Dict String String
translations =
    Dict.fromList
        [ ( "Enter a 5 letters {0} word"
          , "Entrez un mot {0} de 5 lettres"
          )
        , ( "Game data couldn't be loaded: {0}"
          , "Les données du jeu n'ont pas été chargé\u{00A0}: {0}"
          )
        , ( "General game state error. This is bad."
          , "Erreur générale. C'est pas bon signe."
          )
        , ( "Guess a 5 letters {0} word in {1} attempts or less!"
          , "Devinez un mot {0} en {1} essais ou moins\u{00A0}!"
          )
        , ( "Inspired by [Wordle]({0}) - [Source code]({1})"
          , "Inspiré de [Wordle]({0}) - [Code source]({1})"
          )
        , ( "Loading game…"
          , "Chargement du jeu…"
          )
        , ( "Definition of {0} on Wiktionary"
          , "Définition de {0} sur Wiktionary"
          )
        , ( "Lookup the definition of this word (new window)"
          , "Accéder à la définition de ce mot (nouvelle fenêtre"
          )
        , ( "Play again"
          , "Nouvelle partie"
          )
        , ( "Sorry, {0} must be a known word from our {1} dictionary"
          , "Désolé, {0} doit être un mot connu de notre dictionnaire {1}"
          )
        , ( "Submit"
          , "Envoyer"
          )
        , ( "Switch to {0} dictionary"
          , "Passer au dictionnaire {0}"
          )
        , ( "The word must be 5 letters long"
          , "Le mot doit contenir 5 lettres"
          )
        , ( "The word must contains only alphabetic characters: {0}"
          , "Le mot ne doit contenir que des lettres alphabétiques\u{00A0}: {0}"
          )
        , ( "This one was hard!"
          , "C'était pas facile\u{00A0}!"
          )
        , ( "Unable to pick a word."
          , "Impossible de sélectionner un mot à trouver."
          )
        ]


main : Program Flags Model Msg
main =
    Browser.element
        { init = init
        , view = view
        , update = update
        , subscriptions = always Sub.none
        }
