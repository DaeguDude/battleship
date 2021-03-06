export type ShipNames =
  | "Carrier"
  | "Battleship"
  | "Destroyer"
  | "Submarine"
  | "PatrolBoat";

export interface Ship {
  name: ShipNames;
  length: number;
  hit: (hitLocation: number) => void;
  isSunk: () => boolean;
  getHits: () => ShipPositionStatus[];
}

export type ShipPositionStatus = "hit" | "missed" | "noHit";

export interface Gameboard {
  placeShip: (
    shipName: ShipNames,
    xCoord: XCoordinates,
    yCoord: YCoordinates
  ) => void;
  getCoordinates: () => Coordinates; // coordinates
  receiveAttack: (
    xCoord: XCoordinates,
    yCoord: YCoordinates
  ) => "success" | "failure";
  getCoordinate: (xCoord: XCoordinates, yCoord: YCoordinates) => CellStatus;
  getShip: (shipName: ShipNames) => Ship;
  hasEnoughSpace: (
    shipName: ShipNames,
    coordinateToPlaceTheShip: HitCoordinates
  ) => boolean;
  hasNoShipOnTheCoordinate: (
    shipName: ShipNames,
    coordinates: Coordinates,
    coordinateToPlaceTheShip: HitCoordinates
  ) => boolean;
  areAllShipsSunk: () => boolean;
  placeAllShips: () => void;
}

export type CellStatus = ShipPositionStatus | ShipNames;

export type Coordinates = CellStatus[][];
// Coordinates is Array that contains an array which has elements of CellStatus

export type XCoordinates =
  | "a"
  | "b"
  | "c"
  | "d"
  | "e"
  | "f"
  | "g"
  | "h"
  | "i"
  | "j";
export type YCoordinates = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export type Player = {
  name: string;
  hit: (coordinates?: HitCoordinates) => "success" | "failure";
};

export type HitCoordinates = {
  x: XCoordinates;
  y: YCoordinates;
};
