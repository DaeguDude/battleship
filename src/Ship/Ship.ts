import { ShipPositionStatus, Ship as ShipType, ShipNames } from "../types";

function Ship(name: ShipNames): ShipType {
  const length = getLengthForBoat(name);
  if (!length) {
    throw new Error(`We don't have ${name} named boat`);
  }

  let hits: ShipPositionStatus[] = new Array(length).fill("noHit");

  const hit = (hitLocation: number) => {
    if (hitLocation >= length) {
      return "You cannot hit outside the range";
    }

    hits = hitReducer(hits, hitLocation);
  };

  const hitReducer = (hits: ShipPositionStatus[], hitLocation: number) => {
    const newHits = [...hits];

    newHits[hitLocation] = "hit";
    return newHits;
  };

  const isSunk = (): boolean => {
    return hits.every((position) => position === "hit");
  };

  const getHits = (): ShipPositionStatus[] => {
    return hits;
  };

  return { name, length, hit, isSunk, getHits };
}

function getLengthForBoat(name: string) {
  switch (name) {
    case "Carrier":
      return 5;
    case "Battleship":
      return 4;
    case "Destroyer":
      return 3;
    case "Submarine":
      return 3;
    case "PatrolBoat":
      return 2;
  }
}

export { Ship };
