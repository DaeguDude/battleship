function Gameboard() {
  let shipList = [];
  // Gameboards should be able to place ships at specific coordinates
  // by calling the ship factory function

  const yCoords = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"];

  let coordinates = yCoords.reduce((obj, cur) => {
    return { ...obj, [cur]: new Array(10).fill(false) };
  }, {});

  const placeShip = (shipObj, xCoord, yCoord) => {
    if (xCoord < 0 || xCoord > 9 || typeof xCoord !== "number") {
      throw new Error("Invalid x coordinate");
    }

    if (!yCoords.includes(yCoord)) {
      throw new Error("Invalid y coordinate");
    }

    if (xCoord + shipObj.length > 10) {
      throw new Error("There is not enough space to place the ship");
    }

    coordinates = placeShipReducer({
      oldCoordinates: coordinates,
      shipObj,
      xCoord,
      yCoord,
    });

    for (let i = 0; i < shipObj.length; i++) {
      coordinates[yCoord][xCoord + i] = shipObj.name;
    }

    shipList = shipReducer(shipList, shipObj);
  };

  const placeShipReducer = (placeShipInfo) => {
    const { oldCoordinates, shipObj, xCoord, yCoord } = placeShipInfo;
    const newCoordinates = Object.assign({}, oldCoordinates);

    for (let i = 0; i < shipObj.length; i++) {
      newCoordinates[yCoord][xCoord + i] = shipObj.name;
    }

    return newCoordinates;
  };

  const shipReducer = (oldShipList, newBoat) => {
    const newShipList = [...oldShipList];
    newShipList.push(newBoat);
    return newShipList;
  };

  const getCoordinates = () => {
    return coordinates;
  };

  const receiveAttack = (xCoord, yCoord) => {
    // if (!xCoords.includes(xCoord)) {
    //   throw new Error("Invalid x coordinate");
    // }
    // if (yCoord < 0 || yCoord > 9) {
    //   throw new Error("Invalid y coordinate");
    // }
    // // Get the specified coordinates by xCoord, yCoord
    // const coordinates = getCoordinates();
    // const specifiedCoordinate = coordinates[xCoord][yCoord];
    // if (specifiedCoordinate === "missed") {
    //   return "This has been already shot";
    // }
    // if (specifiedCoordinate === null) {
    //   return (coordinates[xCoord][yCoord] = "missed");
    // }
    // // I can hit it. However, how I can hit it in the
    // // right position?
    const foundShip = shipList.find(
      (ship) => ship.name === coordinates[yCoord][xCoord]
    );
    const firstIndexShipOnCoordinate = coordinates[yCoord].findIndex(
      (element) => element === foundShip.name
    );
    foundShip.hit(xCoord - firstIndexShipOnCoordinate);
  };

  const areAllShipsSunk = () => {
    return shipList.every((ship) => ship.isSunk());
  };

  const getShip = (name) => {
    // return shipList.find((ship) => ship.name === name);
  };

  // Gameboards should have a receiveAttack function that takes a piar of coordinates,
  // determines whether or not the attack hit a ship and then sends the 'hit'
  // function to the correct ship, or records the coordinates of the missed shot

  // Gameboards should keep track of missed attacks so they can display them properly.

  // Gameboards should be able to report whether or not all of their ships have been sunk

  return { placeShip, receiveAttack, areAllShipsSunk, getCoordinates, getShip };
}

export { Gameboard };
