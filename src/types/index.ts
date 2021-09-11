export type Hits = boolean[];

export interface Ship {
  name: string;
  length: number;
  hit: (hitLocation: number) => void;
  isSunk: () => boolean;
  getHits: () => Hits;
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
