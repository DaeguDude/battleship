import { Ship } from "../types";
import { XCoordinates, YCoordinates } from "../types";
import { Gameboard as GameboardType } from "../types";

function Gameboard(): GameboardType {
  let shipList: Ship[] = [];

  const yCoords = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"];

  let coordinates: any = yCoords.reduce((obj, cur) => {
    return { ...obj, [cur]: new Array(10).fill(false) };
  }, {});

  const placeShip = (
    shipObj: Ship,
    xCoord: XCoordinates,
    yCoord: YCoordinates
  ) => {
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
    if (xCoord < 0 || xCoord > 9 || typeof xCoord !== "number") {
      throw new Error("Invalid x coordinate");
    }

    if (!yCoords.includes(yCoord)) {
      throw new Error("Invalid y coordinate");
    }

    if (coordinates[yCoord][xCoord] === false) {
      return updateCoordinates(coordinates, xCoord, yCoord, "missed");
    }

    if (
      coordinates[yCoord][xCoord] === "missed" ||
      coordinates[yCoord][xCoord] === true
    ) {
      return "This has been already shot";
    }

    const foundShip = shipList.find(
      (ship) => ship.name === coordinates[yCoord][xCoord]
    );
    const firstIndexShipOnCoordinate = coordinates[yCoord].findIndex(
      (element: any) => element === foundShip.name
    );
    foundShip.hit(xCoord - firstIndexShipOnCoordinate);
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
