function Gameboard() {
  // Gameboards should be able to place ships at specific coordinates
  // by calling the ship factory function

  const xCoords = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"];

  const coordinates = xCoords.reduce((obj, cur, i) => {
    return { ...obj, [cur]: new Array(10).fill(null) };
  }, {});

  const placeShip = (shipObj, xCoord, yCoord) => {
    if (!xCoords.includes(xCoord)) {
      throw new Error("Invalid x coordinate");
    }

    if (yCoord < 0 || yCoord > 9) {
      throw new Error("Invalid y coordinate");
    }

    // ex) yCoord - 5, ship - Carrier(5)
    // y - [5], [6], [7], [8], [9], So it is fine.
    if (yCoord + shipObj.length > 10) {
      throw new Error("There is not enough space to place the ship");
    }

    for (let i = 0; i < shipObj.length; i++) {
      coordinates[xCoord][yCoord + i] = shipObj.name;
    }

    return coordinates[yCoord];
  };

  const getCoordinates = () => {
    return coordinates;
  };

  const receiveAttack = (xCoord, yCoord) => {};

  const areAllShipsSunk = () => {};

  // Gameboards should have a receiveAttack function that takes a piar of coordinates,
  // determines whether or not the attack hit a ship and then sends the 'hit'
  // function to the correct ship, or records the coordinates of the missed shot

  // Gameboards should keep track of missed attacks so they can display them properly.

  // Gameboards should be able to report whether or not all of their ships have been sunk

  return { placeShip, receiveAttack, areAllShipsSunk, getCoordinates };
}

export { Gameboard };
