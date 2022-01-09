module MainTest exposing (..)

import Expect exposing (Expectation)
import Main exposing (..)
import Test exposing (..)


asTest : String -> Expectation -> Test
asTest label =
    always >> test label


suite : Test
suite =
    describe "Main"
        [ describe "validateAttempt"
            [ describe "Error handling"
                [ validateAttempt French "voila" "air"
                    |> Expect.err
                    |> asTest "should validate attempt length"
                , validateAttempt French "voila" "12a45"
                    |> Expect.err
                    |> asTest "should validate attempt contains letters"
                , validateAttempt French "voila" "xxxxx"
                    |> Expect.err
                    |> asTest "should validate attempt is an existing word"
                ]
            , describe "Letter markings"
                [ validateAttempt French "epees" "evier"
                    |> Expect.equal
                        (Ok
                            [ Correct 'e'
                            , Unused 'v'
                            , Unused 'i'
                            , Correct 'e'
                            , Unused 'r'
                            ]
                        )
                    |> asTest "should validate a word"
                , validateAttempt French "titra" "traca"
                    |> Expect.equal
                        (Ok
                            [ Correct 't'
                            , Misplaced 'r'
                            , Handled 'a'
                            , Unused 'c'
                            , Correct 'a'
                            ]
                        )
                    |> asTest "should avoid duplicating correct letters as misplaced"
                , validateAttempt French "ladre" "agaça"
                    |> Expect.equal
                        -- https://twitter.com/signap/status/1480099023440826370
                        (Ok
                            [ Misplaced 'a'
                            , Unused 'g'
                            , Handled 'a'
                            , Unused 'c'
                            , Handled 'a'
                            ]
                        )
                    |> asTest "should avoid duplicating misplaced letters (3 dupes)"
                , validateAttempt French "ladre" "placa"
                    |> Expect.equal
                        (Ok
                            [ Unused 'p'
                            , Misplaced 'l'
                            , Misplaced 'a'
                            , Unused 'c'
                            , Handled 'a'
                            ]
                        )
                    |> asTest "should avoid duplicating misplaced letters (2 dupes)"
                ]
            ]
        ]
