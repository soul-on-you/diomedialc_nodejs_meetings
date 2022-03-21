characters = [
  { name: "Frodo", hasRing: false },
  { name: "Bilbo", hasRing: false },
];

const stealRing = (characters, newOwner) => {
  return characters.map((character) => {
    character.hasRing = character.name === newOwner ? true : false;
    return character;
  });
};

module.exports = { characters, stealRing };
