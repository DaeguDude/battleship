import { Ship } from "../Ship/Ship";
import {
  Coordinates,
  XCoordinates,
  YCoordinates,
  Gameboard as GameboardType,
  ShipNames,
  CellStatus,
  Ship as ShipType,
} from "../types";

function Gameboard(): GameboardType {
  let coordinates = getInitialCoordinates();
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
    const row = coordinates[yCoord];
    for (let i = xCoordNumber; i < xCoordNumber + ship.length; i++) {
      row[i] = ship.name;
    }

    // append the ship to the ships array
    ships.push(ship);
  };

  const getCoordinates = () => {
    return coordinates;
  };

  const receiveAttack = (xCoord: XCoordinates, yCoord: YCoordinates) => {
    const numXCoord = getXCoordNumber(xCoord);
    const ships: ShipNames[] = [
      "PatrolBoat",
      "Carrier",
      "Battleship",
      "Destroyer",
      "Submarine",
    ];

    console.log({ coordinates });

    if (coordinates[yCoord][numXCoord] === "noHit") {
      return (coordinates[yCoord][numXCoord] = "missed");
    }

    if (ships.includes(coordinates[yCoord][numXCoord])) {
      // find ship name
      const shipName = coordinates[yCoord][numXCoord];
      const foundShip = getShip(shipName);

      // How do I know which position to hit?
      const firstIndexShipOnCoordinate = coordinates[yCoord].findIndex(
        (element: CellStatus) => element === shipName
      );

      foundShip.hit(getXCoordNumber(xCoord) - firstIndexShipOnCoordinate);

      return (coordinates[yCoord][numXCoord] = "hit");
    }

    // if (
    //   coordinates[yCoord][xCoord] === "missed" ||
    //   coordinates[yCoord][xCoord].includes("hit")
    // ) {
    //   return "This has been already shot";
    // }
    // if (coordinates[yCoord][xCoord] === "noHit") {
    //   return updateCoordinates(coordinates, xCoord, yCoord, "missed");
    // }
    // // hit it
    // // Mark as hit on the board
    // // Find a boat
    // const foundShip = shipList.find(
    //   (ship) => ship.name === coordinates[yCoord][xCoord]
    // );
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

  // const areAllShipsSunk = () => {
  //   return shipList.every((ship) => ship.isSunk());
  // };

  return { placeShip, getCoordinates, receiveAttack, getCoordinate, getShip };
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
  const yCoords = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const result = yCoords.reduce((obj, cur) => {
    return { ...obj, [cur]: new Array(10).fill("noHit") };
  }, {} as Coordinates);

  return result;
}

export { Gameboard };
