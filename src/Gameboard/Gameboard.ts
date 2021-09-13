import {
  Ship,
  Coordinates,
  XCoordinates,
  YCoordinates,
  Gameboard as GameboardType,
} from "../types";

function Gameboard(): GameboardType {
  let shipList: Ship[] = [];

  const yCoords = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"];

  let coordinates = yCoords.reduce((obj, cur) => {
    return { ...obj, [cur]: new Array(10).fill("noHit") };
  }, {} as Coordinates);

  const placeShip = (
    shipObj: Ship,
    xCoord: XCoordinates,
    yCoord: YCoordinates
  ) => {
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

  const placeShipReducer = (placeShipInfo: any) => {
    const { oldCoordinates, shipObj, xCoord, yCoord } = placeShipInfo;
    const newCoordinates = Object.assign({}, oldCoordinates);

    for (let i = 0; i < shipObj.length; i++) {
      newCoordinates[yCoord][xCoord + i] = shipObj.name;
    }

    return newCoordinates;
  };

  const shipReducer = (oldShipList: Ship[], newBoat: Ship) => {
    const newShipList = [...oldShipList];
    newShipList.push(newBoat);
    return newShipList;
  };

  const getCoordinates = () => {
    return coordinates;
  };

  const receiveAttack = (xCoord: XCoordinates, yCoord: YCoordinates) => {
    if (
      coordinates[yCoord][xCoord] === "missed" ||
      coordinates[yCoord][xCoord].includes("hit")
    ) {
      return "This has been already shot";
    }

    if (coordinates[yCoord][xCoord] === "noHit") {
      return updateCoordinates(coordinates, xCoord, yCoord, "missed");
    }

    // hit it
    // Mark as hit on the board

    // Find a boat
    const foundShip = shipList.find(
      (ship) => ship.name === coordinates[yCoord][xCoord]
    );

    // Calculate which position of found boat to hit
    const firstIndexShipOnCoordinate = coordinates[yCoord].findIndex(
      (element: any) => element.includes(foundShip.name)
    );

    foundShip.hit(xCoord - firstIndexShipOnCoordinate);
    coordinates[yCoord][xCoord] = `hit-${foundShip.name}`;
  };

  const areAllShipsSunk = () => {
    return shipList.every((ship) => ship.isSunk());
  };

  return { placeShip, receiveAttack, areAllShipsSunk, getCoordinates };
}

const updateCoordinates = (
  oldCoordinates: any,
  xCoord: XCoordinates,
  yCoord: YCoordinates,
  value: any
) => {
  const newCoordinates = Object.assign({}, oldCoordinates);
  newCoordinates[yCoord][xCoord] = value;
  return newCoordinates;
};

export { Gameboard };
