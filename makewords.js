require("isomorphic-fetch");
const fs = require("fs");

const MIN_LENGTH = 5;
const MAX_LENGTH = 7;
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
    .filter((s) => s.length >= MIN_LENGTH && s.length <= MAX_LENGTH)
    .join("\n");
}

async function main() {
  try {
    fs.writeFileSync("public/db/en.txt", await getWords(urls.en));
    fs.writeFileSync("public/db/fr.txt", await getWords(urls.fr));
    console.log("Wrote db files.");
  } catch (err) {
    throw new Error(`Unable to generate db file: ${err}`);
  }
}

main();
