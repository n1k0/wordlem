const fs = require("fs");

const MIN_LENGTH = 5;
const MAX_LENGTH = 7;
const THRESHOLD = { en: 79206, fr: 0 };

/**
 * For each language source file:
 * - split each line from TAB, trim each member
 * - normalize word, convert nb to float (watch out for comma as decimal separator)
 * - for duplicates, keep the one with the highest ratio
 * - find freq boundaries (min, max), create a ratio for each word
 * - export as <word>,<ratio>
 * - provide stats
 */

const blacklist = [].concat(
  getFileLines("data/countries.txt"),
  getFileLines("data/firstnames.txt"),
  getFileLines("data/states.txt"),
  getFileLines("data/cities.txt"),
);

function validate(lang, word) {
  if (
    word &&
    !word.includes("-") &&
    !word.includes(" ") &&
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
  return getFileLines(path)
    .map((s) => parseLine(lang, s))
    .filter((w) => w !== null);
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
