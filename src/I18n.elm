module I18n exposing
    ( Id(..)
    , Lang(..)
    , htmlText
    , langFromString
    , langToCode
    , langToString
    , paragraph
    , parseLang
    , translate
    )

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
    = AbsentFromDictionary { lang : Lang, word : String }
    | DecodeError
    | Definition
    | ErrorCorruptedSession
    | ErrorDetail { error : String }
    | GameLoading
    | GameLost
    | GameWin
    | Help
    | HelpGamePitch { lang : Lang, maxGuesses : Int }
    | HelpInspiredBy { wordleUrl : String, githubUrl : String }
    | HelpInThisExample
    | HelpKeyboard
    | HelpKeyboardLetter
    | HelpLetterCorrectlyPlaced { letter : String }
    | HelpLetterHandled { letter : String }
    | HelpLetterMisplaced { letter : String }
    | HelpLetterUnused { letter : String }
    | LoadError
    | NewGameLang { lang : Lang }
    | NotEnoughLetters
    | PlayAgain
    | Settings
    | SettingsKeyboardLayout
    | SettingsWordSize
    | SettingsWordSizeRandom
    | SettingsWordSizeInt { size : Int }
    | StatsAverageGuesses
    | StatsButton
    | StatsGamesPlayed
    | StatsGuessDistribution { lang : Lang }
    | StatsGuessEvolution { lang : Lang }
    | StatsGuessEvolutionHelp { lang : Lang, length : Int }
    | StatsLang { lang : Lang }
    | StatsLangDataMissing { lang : Lang }
    | StatsMissingData
    | StatsWinRate


getSet : Id -> Set
getSet id =
    case id of
        AbsentFromDictionary { lang, word } ->
            set [ langToString lang, String.toUpper word ]
                "Not in {0} dictionary: {1}"
                "Absent du dictionnaire {0}\u{00A0}: {1}"

        DecodeError ->
            set []
                "Unable to restore previously saved data."
                "Impossible de restaurer les données précedemment sauvegardées."

        Definition ->
            set []
                "Definition"
                "Définition"

        ErrorCorruptedSession ->
            set []
                "Corrupted data, reinitialized"
                "Données corrompues, réinitialisées"

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

        HelpGamePitch { lang, maxGuesses } ->
            set [ langToString lang, String.fromInt maxGuesses ]
                "Guess a {0} word in {1} guesses or less."
                "Devinez un mot {0} en {1} essais ou moins."

        HelpInThisExample ->
            set []
                "In this example, in sequential order:"
                "Dans cet exemple, dans l'ordre\u{00A0}:"

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

        HelpLetterHandled { letter } ->
            set [ letter ]
                "{0} is already correctly placed"
                "{0} est déjà correctement placée"

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
                "Error loading dictionary"
                "Impossible de charger le dictionnaire"

        NewGameLang { lang } ->
            set [ langToString lang ]
                "Now playing in {0}"
                "On joue en {0}"

        NotEnoughLetters ->
            set []
                "Not enough letters"
                "Mot trop court"

        PlayAgain ->
            set []
                "Play again"
                "Rejouer"

        Settings ->
            set []
                "Settings"
                "Préférences"

        SettingsKeyboardLayout ->
            set []
                "Keyboard layout"
                "Disposition du clavier"

        SettingsWordSize ->
            set []
                "Word length"
                "Longueur de mot"

        SettingsWordSizeRandom ->
            set []
                "Random"
                "Aléatoire"

        SettingsWordSizeInt { size } ->
            set [ String.fromInt size ]
                "{0} letters"
                "{0} lettres"

        StatsAverageGuesses ->
            set []
                "average guesses"
                "essais en moyenne"

        StatsButton ->
            set []
                "Stats"
                "Stats"

        StatsGamesPlayed ->
            set []
                "games played"
                "parties jouées"

        StatsGuessDistribution { lang } ->
            set [ langToString lang ]
                "Guess distribution ({0})"
                "Distribution des scores ({0})"

        StatsGuessEvolution { lang } ->
            set [ langToString lang ]
                "Guess evolution ({0})"
                "Évolution des scores ({0})"

        StatsGuessEvolutionHelp { lang, length } ->
            set [ langToString lang, String.fromInt length ]
                "Chart based on latest {1} played games in {0}. A 0 bar means lost game."
                "Graphique basé sur les {1} dernières parties jouées en {0}. La valeur 0 correspond à une partie perdue."

        StatsLang { lang } ->
            set [ langToString lang ]
                "Statistics ({0})"
                "Statistiques ({0})"

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
                "parties gagnées"


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


paragraph : Lang -> Id -> Html msg
paragraph lang id =
    Html.p [] [ htmlText lang id ]


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


langToCode : Lang -> String
langToCode lang =
    case lang of
        English ->
            "en"

        French ->
            "fr"


langFromString : String -> Lang
langFromString string =
    case string of
        "Français" ->
            French

        _ ->
            English
