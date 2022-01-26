const fs = require("fs");

const MIN_LENGTH = 5;
const MAX_LENGTH = 7;
const THRESHOLD = { en: 50000, fr: 0 };

const blacklist = [].concat(
  // yeah I don't really want those to be indexed anywhere
  getFileLines("data/badwords.txt").map((s) => s.split("").reverse().join("")),
  getFileLines("data/firstnames.txt"),
  getFileLines("data/places.txt"),
  getFileLines("data/techterms.txt"),
);

function validate(lang, word) {
  if (
    word &&
    /^[a-z]+$/gi.test(word) &&
    (lang === "fr" || !blacklist.includes(word)) &&
    word.length >= MIN_LENGTH &&
    word.length <= MAX_LENGTH
  )
    return word;
  return null;
}

function normalize(str) {
  return str
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function parseLine(lang, line) {
  const [rawWord, rawFreq] = line.split("\t");
  if (!rawWord || !rawFreq) return null;
  // frequency
  const freq = parseFloat(rawFreq.trim().replace(",", "."));
  if (freq < THRESHOLD[lang]) return null;
  // word
  return validate(lang, normalize(rawWord));
}

function dump(words) {
  return words.join("\n") + "\n";
}

function stats(words) {
  return words.reduce(
    (acc, word) => {
      return { ...acc, [word.length]: (acc[word.length] || 0) + 1, total: acc.total + 1 };
    },
    { total: 0 },
  );
}

function getFileLines(path) {
  return fs
    .readFileSync(path)
    .toString()
    .split("\n")
    .map((s) => s.trim().toLowerCase())
    .filter((s) => s !== "");
}

function getWords(lang, path) {
  return getFileLines(path).reduce((acc, line) => {
    const word = parseLine(lang, line);
    return word && !acc.includes(word) ? [...acc, word] : acc;
  }, []);
}

function processLang(lang) {
  const source = `data/${lang}-source.txt`;
  console.log(`Processing ${source}…`);
  const words = getWords(lang, source);
  const target = `public/db/${lang}.txt`;
  fs.writeFileSync(target, dump(words));
  console.log(`Done, wrote ${target}`);
  console.log(`${lang} stats:`, stats(words));
}

function main() {
  try {
    processLang("en");
    processLang("fr");
  } catch (err) {
    throw new Error(`Unable to generate db file: ${err}`);
  }
}

main();
