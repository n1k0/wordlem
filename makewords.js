const fs = require("fs");

const MIN_LENGTH = 5;
const MAX_LENGTH = 7;

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
  getFileLines("data/us-cities.txt"),
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
  if (!freq) return null;
  // word
  const word = validate(lang, normalize(rawWord));
  if (!word) return null;
  return { word, freq };
}

function findMinMax(words) {
  return {
    min: words.reduce((acc, { freq }) => {
      return freq < acc ? freq : acc;
    }, Infinity),
    max: words.reduce((acc, { freq }) => {
      return freq > acc ? freq : acc;
    }, -Infinity),
  };
}

function computeRatios(lang, words) {
  let ratioed = {};
  const { min, max } = findMinMax(words);
  for (const { word, freq } of words) {
    const rFreq = ((freq / (max - min)) * 100).toFixed(2);
    if (lang === "en" && rFreq < 0.02) {
      continue;
    }
    if (!ratioed.hasOwnProperty(word)) {
      ratioed[word] = 0;
    }
    if (rFreq > ratioed[word]) {
      ratioed[word] = rFreq;
    }
  }
  return ratioed;
}

function dump(wordsObj) {
  return Object.keys(wordsObj)
    .map((word) => `${word},${wordsObj[word]}`)
    .join("\n");
}

function stats(wordsObj) {
  return Object.keys(wordsObj).reduce((acc, word) => {
    return { ...acc, [word.length]: (acc[word.length] || 0) + 1 };
  }, {});
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
  const words = getFileLines(path)
    .map((s) => parseLine(lang, s))
    .filter((w) => w !== null);
  return computeRatios(lang, words);
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
