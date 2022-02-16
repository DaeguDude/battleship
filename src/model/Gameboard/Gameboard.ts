import { Ship } from "../Ship/Ship";
import {
  Coordinates,
  XCoordinates,
  YCoordinates,
  Gameboard as GameboardType,
  ShipNames,
  CellStatus,
  Ship as ShipType,
  HitCoordinates,
} from "../../types";
import { getXCoordNumber } from "../../utils/getXCoordNumber";
import {
  hasEnoughSpace as checkEnoughSpace,
  hasNoShipOnTheCoordinate,
} from "./util";

function Gameboard(): GameboardType {
  let coordinates = getInitialCoordinates();
  let shipCoordinatesInfo: any = {};
  const ships: ShipType[] = [];

  const placeAllShips = () => {
    const Carrier = Ship("Carrier");
    const Battleship = Ship("Battleship");
    const Destroyer = Ship("Destroyer");
    const Submarine = Ship("PatrolBoat");
    const PatrolBoat = Ship("Submarine");

    const allShips = [Carrier, Battleship, Destroyer, Submarine, PatrolBoat];

    for (let i = 0; allShips.length; i++) {
      const ship = allShips[i];
      const randomCoordinates = getRandomCoordinates();

      // if (placeable) {
      //   // place ship
      // } else {
      //   // let's try again
      // }
    }
  };

  const placeShip = (
    shipName: ShipNames,
    xCoord: XCoordinates,
    yCoord: YCoordinates
  ) => {
    // Make a ship
    const ship = Ship(shipName);
    const xCoordNumber = getXCoordNumber(xCoord);

    const hasEnoughSpace = checkEnoughSpace(shipName, { x: xCoord, y: yCoord });
    if (!hasEnoughSpace) {
      return "not enough space";
    }

    const hasNoShip = hasNoShipOnTheCoordinate(shipName, getCoordinates(), {
      x: xCoord,
      y: yCoord,
    });
    if (!hasNoShip) {
      return "there is a ship along the xCoordinates";
    }

    const newCoordinates = cloneDeep(coordinates);
    const row = newCoordinates[yCoord];
    for (let i = xCoordNumber; i < xCoordNumber + ship.length; i++) {
      row[i] = ship.name;
    }

    setCoordinates(newCoordinates);

    setShipCoordinatesInfo(ship.name, xCoord, yCoord);
    ships.push(ship);

    return true;
  };

  const getCoordinates = () => {
    return coordinates;
  };

  const setShipCoordinatesInfo = (
    shipName: ShipNames,
    xCoord: XCoordinates,
    yCoord: YCoordinates
  ) => {
    shipCoordinatesInfo = {
      ...shipCoordinatesInfo,
      [shipName]: { x: xCoord, y: yCoord },
    };
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
      setCoordinates(newCoordinates);
      return "success";
    }

    if (ships.includes(newCoordinates[yCoord][numXCoord])) {
      const shipName = newCoordinates[yCoord][numXCoord];
      const foundShip = getShip(shipName);

      const xCoordOfTheShip = shipCoordinatesInfo[shipName]["x"];

      foundShip.hit(getXCoordNumber(xCoord) - getXCoordNumber(xCoordOfTheShip));
      newCoordinates[yCoord][numXCoord] = "hit";

      setCoordinates(newCoordinates);
      return "success";
    }

    if (
      newCoordinates[yCoord][numXCoord] === "hit" ||
      newCoordinates[yCoord][numXCoord] === "missed"
    ) {
      return "failure";
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
    hasEnoughSpace: checkEnoughSpace,
    hasNoShipOnTheCoordinate,
    placeAllShips,
  };
}

function cloneDeep(x: any) {
  return JSON.parse(JSON.stringify(x));
}

export function checkForEnoughSpace(
  shipLength: number,
  xCoord: XCoordinates
): boolean {
  const xCoordNumber = getXCoordNumber(xCoord);
  if (xCoordNumber + shipLength > 10) {
    return false;
  }

  return true;
}

function getInitialCoordinates() {
  const result: Coordinates = [];
  for (let i = 0; i < 10; i++) {
    result.push(new Array(10).fill("noHit"));
  }

  return result;
}

function getRandomCoordinates(): HitCoordinates {
  return { x: "a", y: 0 };
}

export { Gameboard };
