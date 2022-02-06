# Wordlem

A port of the popular [Wordle game](https://www.powerlanguage.co.uk/wordle/) in [Elm](https://elm-lang.org/), playable in both English & French and with 6 and 7 letters words.

![image](https://n1k0.github.io/wordlem/screenshots/card.png)

You can play it [here](https://n1k0.github.io/wordlem/).

## Run locally

```
npm i
npm start
```

Then head to localhost:8000.

## Build dictionaries

```
npm run build:words
```

Dictionaries are then written in `public/db`.

## Credits

In no specific order:

- [Josh Wardle](https://twitter.com/powerlanguish) for the original [Wordle](https://www.powerlanguage.co.uk/wordle/) game which heavily inspired this one
- [Phrawzty](https://speaking.dark.ca/) for his help on building a [sensible enough English dictionary](https://gist.github.com/phrawzty/e5edc5336bf06f62b0b831c7ac09baff) for this game
- [@mmai](https://github.com/mmai) for his great [patch](https://github.com/n1k0/wordlem/pull/1) which introduced the French version
- [Evan Czaplicki](https://twitter.com/evancz) who created the most blissful language I ever handled, [Elm](https://elm-lang.org/)
- [Lexique.org](http://www.lexique.org/shiny/openlexicon/) for the great resources on French language
- [Peter Norvig](https://norvig.com/) for his compilation of the [330k most frequent English words](https://norvig.com/ngrams/count_1w.txt)

## FAQ

- Why can't I share my scores?
  - Aren't you overwhelmed with Wordle scores alrady? I didn't want to add more automated noise to already noisy social networks. If you enjoy Wordlem, feel free to tell your friends though.
- Why no 8+ letters words?
  - Because that would make the dictionary size too big to download comfortably, but I may consider the option in the future.

## License

[WTFPL](http://www.wtfpl.net/)
