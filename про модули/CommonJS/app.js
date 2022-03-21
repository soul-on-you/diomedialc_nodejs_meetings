const { characters, stealRing } = require("./characters");

const characterSS = stealRing(characters, "Frodo");

for (const character of characterSS) {
  console.log(character);
}
