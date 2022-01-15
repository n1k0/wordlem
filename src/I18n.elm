module I18n exposing (..)

import Dict exposing (Dict)
import String.Interpolate exposing (interpolate)


type Lang
    = English
    | French


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
        [ ( "{0} is at the correct spot"
          , "{0} est à la bonne position"
          )
        , ( "{0} is misplaced"
          , "{0} est mal positionnée"
          )
        , ( "{0} is unused"
          , "{0} n'est pas utilisée"
          )
        , ( "average guesses"
          , "essais en moyenne"
          )
        , ( "Definition"
          , "Définition"
          )
        , ( "Erreur: {0}"
          , "Erreur\u{00A0}: {0}"
          )
        , ( "Game data couldn't load: {0}"
          , "Les données du jeu n'ont pas été chargé\u{00A0}: {0}"
          )
        , ( "General game state error. This is bad."
          , "Erreur générale. C'est pas bon signe."
          )
        , ( "Guess a {0} letters {1} word in {2} guesses or less."
          , "Devinez un mot {1} de {0} lettres en {2} essais ou moins."
          )
        , ( "Guess distribution ({0})"
          , "Distribution des scores ({0})"
          )
        , ( "Help"
          , "Aide"
          )
        , ( "In this example:"
          , "Dans cet exemple\u{00A0}:"
          )
        , ( "Inspired by [Wordle]({0}) - [Source code]({1})."
          , "Inspiré de [Wordle]({0}) - [Code source]({1})."
          )
        , ( "Loading game…"
          , "Chargement du jeu…"
          )
        , ( "No game data yet"
          , "Pas de données de parties jouées"
          )
        , ( "Ok that was hard."
          , "Pas facile, hein\u{00A0}?"
          )
        , ( "Play again"
          , "Rejouer"
          )
        , ( "Not in dictionary: {0}"
          , "Absent du dictionnaire\u{00A0}: {0}"
          )
        , ( "Not enough letters"
          , "Mot trop court"
          )
        , ( "Stats"
          , "Stats"
          )
        , ( "The keyboard at the bottom highlight letters which have been played already."
          , "Le clavier en bas de page met en relief les lettres qui ont déjà été joué."
          )
        , ( "Unable to pick a word."
          , "Impossible de sélectionner un mot à trouver."
          )
        , ( "Unable to restore previously saved data."
          , "Impossible de restaurer les données précedemment sauvegardées."
          )
        , ( "Use your dekstop computer keyboard to enter words, or the virtual one at the bottom."
          , "Utilisez le clavier de votre ordinateur pour saisir vos propositions, ou celui proposé au bas de l'écran."
          )
        , ( "Well done!"
          , "Bien joué\u{00A0}!"
          )
        , ( "win rate"
          , "de parties gagnées"
          )
        , ( "You haven't played in {0} yet, so I can't render any stats."
          , "Vous n'avez pas encore joué en {0}, je ne peux pas afficher de statistiques."
          )
        ]
