require("isomorphic-fetch");
const fs = require("fs");

const MIN_LENGTH = 5;
const MAX_LENGTH = 6;
const urls = {
  en: "https://raw.githubusercontent.com/dwyl/english-words/master/words_alpha.txt",
  fr: "https://chrplr.github.io/openlexicon/datasets-info/Liste-de-mots-francais-Gutenberg/liste.de.mots.francais.frgut.txt",
};

async function getWords(url) {
  const res = await fetch(url);
  const contents = await res.text();
  return contents
    .split("\n")
    .map((s) => s.trim())
    .filter((s) => s.length >= MIN_LENGTH && s.length <= MAX_LENGTH);
}

async function main() {
  try {
    const elmTemplate = fs.readFileSync("src/Words.elm-tpl").toString();
    const elmContents = elmTemplate
      .replace("%english%", await getWords(urls.en))
      .replace("%french%", await getWords(urls.fr));
    fs.writeFileSync("src/Words.elm", elmContents);
    console.log("Wrote src/Words.elm");
  } catch (err) {
    throw new Error(`Unable to generate Elm file: ${err}`);
  }
}

main();
