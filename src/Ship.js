function Ship(length) {
  // 'ships' will be objects that include their length, where they've been
  // hit and whether or not they've been sunk.
  const positions = new Array(length).fill(null);

  // Takes a number and then marks that position as 'hit'.
  const hit = (number) => {
    // it should take a number between 0 ~ length - 1
    if (number >= 0 && number < length) {
      positions[number] = "hit";
    }
    return positions;
  };

  // calculates it based on their length and whether all of their positions are 'hit'
  const isSunk = () => {
    return positions.every((position) => position === "hit");
  };

  return { length, hit, isSunk };
}

export { Ship };
