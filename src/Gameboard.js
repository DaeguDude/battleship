function Gameboard() {
  // Gameboards should be able to place ships at specific coordinates
  // by calling the ship factory function

  const coordinates = [];
  for (let i = 0; i < 10; i++) {
    const line = new Array(10).fill(null);
    coordinates.push(line);
  }

  const placeShip = (shipObj, xCoord, yCoord) => {
    if (xCoord < 0 || xCoord > 9 || yCoord < 0 || yCoord > 9) {
      return false;
    }

    if (shipObj.length + xCoord - 1 > 9) {
      return false;
    }

    // get yCoord row. ex) yCoord: 3, third row([2])
    for (let i = 0; i < shipObj.length; i++) {
      coordinates[yCoord][xCoord + i] = "ship";
    }

    return coordinates[yCoord];
  };

  const getCoordinates = () => {
    return coordinates;
  };

  const receiveAttack = () => {};

  const areAllShipsSunk = () => {};

  // Gameboards should have a receiveAttack function that takes a piar of coordinates,
  // determines whether or not the attack hit a ship and then sends the 'hit'
  // function to the correct ship, or records the coordinates of the missed shot

  // Gameboards should keep track of missed attacks so they can display them properly.

  // Gameboards should be able to report whether or not all of their ships have been sunk

  return { placeShip, receiveAttack, areAllShipsSunk, getCoordinates };
}

export { Gameboard };
