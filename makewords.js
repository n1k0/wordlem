const fs = require("fs");

const MIN_LENGTH = 5;
const MAX_LENGTH = 7;

async function getWords(path) {
  const words = fs
    .readFileSync(path)
    .toString()
    .split("\n")
    .map((s) =>
      s
        .trim()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase(),
    )
    .filter((s) => !s.includes("-") && s.length >= MIN_LENGTH && s.length <= MAX_LENGTH);
  return [...new Set(words)].join("\n");
}

async function main() {
  try {
    fs.writeFileSync("public/db/en.txt", await getWords("en-source.txt"));
    fs.writeFileSync("public/db/fr.txt", await getWords("fr-source.txt"));
    console.log("Wrote db files.");
  } catch (err) {
    throw new Error(`Unable to generate db file: ${err}`);
  }
}

main();
