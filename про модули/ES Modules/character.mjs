export const characters = [
  { name: "Frodo", hasRing: false },
  { name: "Bilbo", hasRing: false },
];

export const stealRing = (characters, newOwner) => {
  return characters.map((character) => {
    character.hasRing = character.name === newOwner ? true : false;
    return character;
  });
};

export const greeting = (characters) => {
  for (const character of characters) {
    if (character.hasRing) {
      console.log(`${character.name} донес кольцо`);
    }
  }
};
