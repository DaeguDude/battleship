export type Hits = boolean[];

export type ShipNames =
  | "Carrier"
  | "Battleship"
  | "Destroyer"
  | "Submarine"
  | "PatrolBoat";

export type CellStatus = "noHit" | "missed" | ShipNames | `hit-${ShipNames}`;

export interface Ship {
  name: ShipNames;
  length: number;
  hit: (hitLocation: number) => void;
  isSunk: () => boolean;
  getHits: () => Hits;
}

export interface Gameboard {
  placeShip: (
    shipObj: Ship,
    xCoord: XCoordinates,
    yCoord: YCoordinates
  ) => void;
  receiveAttack: (xCoord: XCoordinates, yCoord: YCoordinates) => void;
  areAllShipsSunk: () => boolean;
  getCoordinates: () => any; // coordinates
}

export interface Coordinates {
  a: CellStatus[];
  b: CellStatus[];
  c: CellStatus[];
  d: CellStatus[];
  e: CellStatus[];
  f: CellStatus[];
  g: CellStatus[];
  h: CellStatus[];
  i: CellStatus[];
  j: CellStatus[];
}

export type YCoordinates =
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
export type XCoordinates = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
