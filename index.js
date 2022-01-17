import { Elm } from "./src/Main.elm";

const storeKey = "wordlem";

const lang = navigator.language || "en";
const rawStore = localStorage[storeKey] || JSON.stringify({ lang, logs: [] });

const app = Elm.Main.init({
  node: document.getElementById("app"),
  flags: { lang, rawStore },
});

app.ports.saveStore.subscribe((rawStore) => {
  localStorage[storeKey] = rawStore;
});

window.addEventListener(
  "storage",
  (event) => {
    if (event.storageArea === localStorage && event.key === storeKey) {
      app.ports.storeChanged.send(event.newValue);
    }
  },
  false,
);
