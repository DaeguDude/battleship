// Carrier
// Battleship
// Destroyer
// Submarine
// Patrol Boat
function Ship(name) {
  const length = getLengthForBoat(name);

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

function getLengthForBoat(name) {
  switch (name) {
    case "Carrier":
      return 5;
    case "Battleship":
      return 4;
    case "Destroyer":
      return 3;
    case "Submarine":
      return 3;
    case "PatrolBoat":
      return 2;
  }
}

export { Ship };
