import { Ship } from "../Ship/Ship";
import {
  Coordinates,
  XCoordinates,
  YCoordinates,
  Gameboard as GameboardType,
  ShipNames,
  CellStatus,
  Ship as ShipType,
} from "../../types";

function Gameboard(): GameboardType {
  let coordinates = getInitialCoordinates();
  let shipCoordinatesInfo: any = {};
  const ships: ShipType[] = [];

  const placeShip = (
    shipName: ShipNames,
    xCoord: XCoordinates,
    yCoord: YCoordinates
  ) => {
    // Make a ship
    const ship = Ship(shipName);
    const xCoordNumber = getXCoordNumber(xCoord);

    const hasEnoughSpace = checkForEnoughSpace(ship.length, xCoord);
    if (!hasEnoughSpace) {
      throw new Error("not enough space");
    }

    // mark the ship in the coordinate
    const newCoordinates = cloneDeep(coordinates);
    const row = newCoordinates[yCoord];
    for (let i = xCoordNumber; i < xCoordNumber + ship.length; i++) {
      row[i] = ship.name;
    }

    setCoordinates(newCoordinates);
    setShipCoordinatesInfo(ship.name, xCoord, yCoord);
    ships.push(ship);
  };

  const getCoordinates = () => {
    return coordinates;
  };

  const setShipCoordinatesInfo = (
    shipName: ShipNames,
    xCoord: XCoordinates,
    yCoord: YCoordinates
  ) => {
    shipCoordinatesInfo = Object.assign(
      {},
      { [shipName]: { x: xCoord, y: yCoord } }
    );
  };

  const setCoordinates = (newCoordinates: Coordinates) => {
    coordinates = cloneDeep(newCoordinates);
  };

  const receiveAttack = (xCoord: XCoordinates, yCoord: YCoordinates) => {
    const newCoordinates = cloneDeep(coordinates);
    const numXCoord = getXCoordNumber(xCoord);
    const ships: ShipNames[] = [
      "PatrolBoat",
      "Carrier",
      "Battleship",
      "Destroyer",
      "Submarine",
    ];

    if (newCoordinates[yCoord][numXCoord] === "noHit") {
      newCoordinates[yCoord][numXCoord] = "missed";
      return setCoordinates(newCoordinates);
    }

    if (ships.includes(newCoordinates[yCoord][numXCoord])) {
      const shipName = newCoordinates[yCoord][numXCoord];
      const foundShip = getShip(shipName);

      const xCoordOfTheShip = shipCoordinatesInfo[shipName]["x"];

      foundShip.hit(getXCoordNumber(xCoord) - getXCoordNumber(xCoordOfTheShip));
      newCoordinates[yCoord][numXCoord] = "hit";

      return setCoordinates(newCoordinates);
    }
  };

  const getCoordinate = (
    xCoord: XCoordinates,
    yCoord: YCoordinates
  ): CellStatus => {
    const numXCoord = getXCoordNumber(xCoord);

    return coordinates[yCoord][numXCoord];
  };

  const getShip = (shipName: ShipNames): ShipType => {
    return ships.find((ship) => ship.name === shipName);
  };

  const areAllShipsSunk = () => {
    return ships.every((ship) => ship.isSunk());
  };

  return {
    placeShip,
    getCoordinates,
    receiveAttack,
    getCoordinate,
    getShip,
    areAllShipsSunk,
  };
}

// const updateCoordinates = (
//   oldCoordinates: any,
//   xCoord: XCoordinates,
//   yCoord: YCoordinates,
//   value: any
// ) => {
//   const newCoordinates = Object.assign({}, oldCoordinates);
//   newCoordinates[yCoord][xCoord] = value;
//   return newCoordinates;
// };

function cloneDeep(x: any) {
  return JSON.parse(JSON.stringify(x));
}

function checkForEnoughSpace(
  shipLength: number,
  xCoord: XCoordinates
): boolean {
  const xCoordNumber = getXCoordNumber(xCoord);
  if (xCoordNumber + shipLength > 10) {
    return false;
  }

  return true;
}

function getXCoordNumber(xCoord: XCoordinates): number {
  switch (xCoord) {
    case "a":
      return 0;
    case "b":
      return 1;
    case "c":
      return 2;
    case "d":
      return 3;
    case "e":
      return 4;
    case "f":
      return 5;
    case "g":
      return 6;
    case "h":
      return 7;
    case "i":
      return 8;
    case "j":
      return 9;
  }
}

function getInitialCoordinates() {
  const result: Coordinates = [];
  for (let i = 0; i < 10; i++) {
    result.push(new Array(10).fill("noHit"));
  }

  return result;
}

export { Gameboard };
