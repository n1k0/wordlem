module I18nTest exposing (..)

import Expect exposing (Expectation)
import I18n exposing (..)
import Test exposing (..)


asTest : String -> Expectation -> Test
asTest label =
    always >> test label


suite : Test
suite =
    describe "I18n"
        [ describe "mapChar"
            [ "çéâêîôûàèìòùëïü"
                |> String.toList
                |> List.map (mapChar French)
                |> Expect.equal
                    [ Ok 'c'
                    , Ok 'e'
                    , Ok 'a'
                    , Ok 'e'
                    , Ok 'i'
                    , Ok 'o'
                    , Ok 'u'
                    , Ok 'a'
                    , Ok 'e'
                    , Ok 'i'
                    , Ok 'o'
                    , Ok 'u'
                    , Ok 'e'
                    , Ok 'i'
                    , Ok 'u'
                    ]
                |> asTest "should map French accented chars"
            ]
        ]
