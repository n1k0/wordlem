module Game exposing
    ( Board
    , Error(..)
    , Guess
    , Letter(..)
    , State(..)
    , WordToFind
    , addChar
    , appendSolution
    , charToText
    , checkGame
    , guessToString
    , isLastGuess
    , letterIs
    , parseWords
    , validateGuess
    , viewBoard
    , viewError
    , viewGuess
    )

import Html exposing (..)
import Html.Attributes exposing (..)
import I18n exposing (Lang)
import List.Extra as LE
import String.Extra as SE
import String.Interpolate exposing (interpolate)


type State
    = Idle
    | Errored Error
    | Ongoing WordToFind Board UserInput
    | Lost WordToFind Board
    | Won WordToFind Board


type Error
    = DecodeError String
    | LoadError


type Letter
    = Unused Char
    | Correct Char
    | Misplaced Char
    | Handled Char


type alias Board =
    List Guess


type alias Guess =
    List Letter


type alias UserInput =
    String


type alias WordToFind =
    String


addChar : Int -> Char -> UserInput -> UserInput
addChar wordSize char input =
    (input ++ String.fromChar char)
        |> String.slice 0 wordSize


checkGame : Int -> WordToFind -> Board -> State
checkGame maxAttempts word guesses =
    if hasWon guesses then
        Won word guesses

    else if List.length guesses >= maxAttempts then
        Lost word guesses

    else
        Ongoing word guesses ""


hasWon : Board -> Bool
hasWon guesses =
    case guesses of
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


mapChars : List Char -> Char -> Char -> Letter
mapChars wordChars inputChar wordChar =
    if inputChar == wordChar then
        Correct inputChar

    else if List.member inputChar wordChars then
        Misplaced inputChar

    else
        Unused inputChar


validateGuess : Lang -> List WordToFind -> WordToFind -> UserInput -> Result I18n.Id Guess
validateGuess lang words word input =
    let
        normalize =
            String.toLower >> SE.removeAccents

        ( wordChars, inputChars ) =
            ( String.toList (normalize word)
            , String.toList (normalize input)
            )
    in
    if List.length inputChars < String.length word then
        I18n.NotEnoughLetters
            |> Err

    else if not (List.member (normalize input) words) then
        I18n.AbsentFromDictionary { lang = lang, word = input }
            |> Err

    else
        wordChars
            |> List.map2 (mapChars wordChars) inputChars
            |> handleCorrectDuplicates wordChars
            |> handleMisplacedDuplicates wordChars
            |> Ok


{-| Find correctly placed letters; for each, if there's only one occurence in the word,
then check for misplaced same letter in the guess and mark them as Handled.
-}
handleCorrectDuplicates : List Char -> Guess -> Guess
handleCorrectDuplicates wordChars guess =
    guess
        |> List.map
            (\letter ->
                case letter of
                    Misplaced c ->
                        let
                            ( nbCharsInWord, nbCorrectInAttempt ) =
                                ( -- count number of this char in target word
                                  List.length (List.filter ((==) c) wordChars)
                                  -- number of already correct char for
                                , List.length (List.filter (letterIs Correct c) guess)
                                )
                        in
                        if nbCorrectInAttempt >= nbCharsInWord then
                            -- there's enough correct letters for this char already
                            Handled c

                        else
                            letter

                    _ ->
                        letter
            )


{-| If a word contains a single A, and you provide an guess with 3 As, you'll have 3
misplaced As while we only want one, ideally the first one, with others marked as Handled.
-}
handleMisplacedDuplicates : List Char -> Guess -> Guess
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
                            , List.length (List.filter (letterIs Misplaced c) acc)
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


letterIs : (Char -> Letter) -> Char -> Letter -> Bool
letterIs build char =
    (==) (build char)


parseWords : Int -> String -> List WordToFind
parseWords wordSize =
    String.lines
        >> List.filter (String.length >> (==) wordSize)


guessToString : Guess -> String
guessToString =
    List.map
        (\letter ->
            case letter of
                Correct c ->
                    c

                Handled c ->
                    c

                Misplaced c ->
                    c

                Unused c ->
                    c
        )
        >> String.fromList


isLastGuess : UserInput -> List Guess -> Bool
isLastGuess input =
    List.head
        >> Maybe.map guessToString
        >> (==) (Just input)


appendSolution : String -> List Guess -> List Guess
appendSolution word =
    word
        |> String.toList
        |> List.map Correct
        |> (::)


charToText : Char -> String
charToText =
    Char.toUpper >> String.fromChar


viewError : Lang -> Error -> Html msg
viewError lang error =
    div [ class "alert alert-danger m-3" ]
        [ case error of
            DecodeError details ->
                div []
                    [ I18n.paragraph lang I18n.DecodeError
                    , pre [ class "pb-3" ]
                        [ text details ]
                    ]

            LoadError ->
                I18n.htmlText lang I18n.LoadError
        ]


viewGuess : Int -> Guess -> Html msg
viewGuess wordSize =
    List.map
        (\letter ->
            case letter of
                Misplaced char ->
                    viewTile "btn-warning" char

                Correct char ->
                    viewTile "btn-success" char

                Unused char ->
                    viewTile "btn-dark" char

                Handled char ->
                    -- We may want to render these slightly differently
                    viewTile "btn-dark handled" char
        )
        >> viewBoardRow wordSize


viewBoard : Int -> Int -> Maybe UserInput -> Board -> Html msg
viewBoard maxAttempts wordSize input guesses =
    let
        remaining =
            maxAttempts
                - List.length guesses
                - (input |> Maybe.map (always 2) |> Maybe.withDefault 1)
    in
    div [ class "BoardContainer", id "board-container" ]
        [ [ guesses
                |> List.reverse
                |> List.map (viewGuess wordSize >> Just)
          , [ input |> Maybe.map (viewInput wordSize) ]
          , List.range 0 remaining
                |> List.map
                    (\_ ->
                        List.repeat wordSize '\u{00A0}'
                            |> String.fromList
                            |> viewInput wordSize
                            |> Just
                    )
          ]
            |> List.concat
            |> List.filterMap identity
            |> div
                [ class <| "Board Board-" ++ String.fromInt wordSize
                , style "grid-template-rows"
                    (interpolate "repeat({0}, 1fr)"
                        [ String.fromInt maxAttempts ]
                    )
                ]
        ]


viewBoardRow : Int -> List (Html msg) -> Html msg
viewBoardRow wordSize =
    div
        [ class "BoardRow"
        , style "grid-template-columns"
            (interpolate "repeat({0}, 1fr)"
                [ String.fromInt wordSize ]
            )
        ]


viewInput : Int -> UserInput -> Html msg
viewInput wordSize input =
    let
        chars =
            String.toList input

        spots =
            chars ++ LE.initialize (wordSize - List.length chars) (always '\u{00A0}')
    in
    spots
        |> List.map (viewTile "btn-secondary")
        |> viewBoardRow wordSize


viewTile : String -> Char -> Html msg
viewTile classes char =
    div
        [ class <| "btn BoardTile rounded-0 " ++ classes ]
        [ text (charToText char) ]
