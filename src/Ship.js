// Carrier
// Battleship
// Destroyer
// Submarine
// Patrol Boat
function Ship(name, length) {
  // Let's change the Ship to take a name, and automatically assigns
  // the right length
  const positions = new Array(length).fill(null);

  const hit = (number) => {
    if (number >= 0 && number < length) {
      positions[number] = "hit";
    }
    return positions;
  };

  const isSunk = () => {
    return positions.every((position) => position === "hit");
  };

  return { name, length, hit, isSunk };
}

export { Ship };
