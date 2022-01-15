module I18n exposing (..)

import Html exposing (Html, text)
import String.Interpolate exposing (interpolate)


type Lang
    = English
    | French


type alias Set =
    { english : String
    , french : String
    }


type Id
    = AbsentFromDictionary { word : String }
    | DecodeError
    | Definition
    | ErrorDetail { error : String }
    | GameLoading
    | GameLost
    | GameWin
    | Help
    | HelpGamePitch { nbLetters : Int, lang : Lang, maxGuesses : Int }
    | HelpInspiredBy { wordleUrl : String, githubUrl : String }
    | HelpInThisExample
    | HelpKeyboard
    | HelpKeyboardLetter
    | HelpLetterCorrectlyPlaced { letter : String }
    | HelpLetterMisplaced { letter : String }
    | HelpLetterUnused { letter : String }
    | LoadError
    | NotEnoughLetters
    | PlayAgain
    | Statistics
    | StatsAverageGuesses
    | StatsGamesPlayed
    | StatsGuessDistribution { lang : Lang }
    | StatsLangDataMissing { lang : Lang }
    | StatsMissingData
    | StatsWinRate


getSet : Id -> Set
getSet id =
    case id of
        AbsentFromDictionary { word } ->
            set [ word ]
                "Not in dictionary: {0}"
                "Absent du dictionnaire\u{00A0}: {0}"

        DecodeError ->
            set []
                "Unable to restore previously saved data."
                "Impossible de restaurer les données précedemment sauvegardées."

        Definition ->
            set []
                "Definition"
                "Définition"

        ErrorDetail { error } ->
            set [ error ]
                "Erreur: {0}"
                "Erreur\u{00A0}: {0}"

        GameLoading ->
            set []
                "Loading game…"
                "Chargement du jeu…"

        GameLost ->
            set []
                "Ok that was hard."
                "Pas facile, hein\u{00A0}?"

        GameWin ->
            set []
                "Well done!"
                "Bien joué\u{00A0}!"

        Help ->
            set []
                "Help"
                "Aide"

        HelpGamePitch { nbLetters, lang, maxGuesses } ->
            set [ String.fromInt nbLetters, langToString lang, String.fromInt maxGuesses ]
                "Guess a {0} letters {1} word in {2} guesses or less."
                "Devinez un mot {1} de {0} lettres en {2} essais ou moins."

        HelpInThisExample ->
            set []
                "In this example:"
                "Dans cet exemple\u{00A0}:"

        HelpInspiredBy { wordleUrl, githubUrl } ->
            set [ wordleUrl, githubUrl ]
                "Inspired by [Wordle]({0}) - [Source code]({1})."
                "Inspiré de [Wordle]({0}) - [Code source]({1})."

        HelpKeyboard ->
            set []
                "Use your dekstop computer keyboard to enter words, or the virtual one at the bottom."
                "Utilisez le clavier de votre ordinateur pour saisir vos propositions, ou celui proposé au bas de l'écran."

        HelpKeyboardLetter ->
            set []
                "The keyboard at the bottom highlight letters which have been played already."
                "Le clavier en bas de page met en relief les lettres qui ont déjà été joué."

        HelpLetterCorrectlyPlaced { letter } ->
            set [ letter ]
                "{0} is at the correct spot"
                "{0} est à la bonne position"

        HelpLetterMisplaced { letter } ->
            set [ letter ]
                "{0} is misplaced"
                "{0} est mal positionnée"

        HelpLetterUnused { letter } ->
            set [ letter ]
                "{0} is unused"
                "{0} n'est pas utilisée"

        LoadError ->
            set []
                "Unable to pick a word."
                "Impossible de sélectionner un mot à trouver."

        NotEnoughLetters ->
            set []
                "Not enough letters"
                "Mot trop court"

        PlayAgain ->
            set []
                "Play again"
                "Rejouer"

        Statistics ->
            set []
                "Stats"
                "Stats"

        StatsAverageGuesses ->
            set []
                "average guesses"
                "essais en moyenne"

        StatsGamesPlayed ->
            set []
                "games played"
                "parties jouées"

        StatsGuessDistribution { lang } ->
            set [ langToString lang ]
                "Guess distribution ({0})"
                "Distribution des scores ({0})"

        StatsMissingData ->
            set []
                "No game data yet"
                "Pas de données de parties jouées"

        StatsLangDataMissing { lang } ->
            set [ langToString lang ]
                "You haven't played in {0} yet, so I can't render any stats."
                "Vous n'avez pas encore joué en {0}, je ne peux pas afficher de statistiques."

        StatsWinRate ->
            set []
                "win rate"
                "de parties gagnées"


set : List String -> String -> String -> Set
set params english french =
    Set
        (interpolate english params)
        (interpolate french params)


translate : Lang -> Id -> String
translate lang id =
    case lang of
        English ->
            .english (getSet id)

        French ->
            .french (getSet id)


htmlText : Lang -> Id -> Html msg
htmlText lang id =
    text (translate lang id)


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
            "Français"


langFromString : String -> Lang
langFromString string =
    case string of
        "Français" ->
            French

        _ ->
            English
