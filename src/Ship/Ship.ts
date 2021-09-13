import { Hits, Ship as ShipType, ShipNames } from "../types";

function Ship(name: ShipNames): ShipType {
  const length = getLengthForBoat(name);
  if (!length) {
    throw new Error(`We don't have ${name} named boat`);
  }

  let hits: Hits = new Array(length).fill(false);

  // Creates side effects - We can assert the public side effects
  const hit = (hitLocation: number) => {
    hits = hitReducer(hits, hitLocation);
  };

  // True pure function
  const hitReducer = (hits: Hits, hitLocation: number) => {
    const newHits = [...hits];
    newHits[hitLocation] = true;
    return newHits;
  };

  const isSunk = (): boolean => {
    return hits.every((position) => position === true);
  };

  const getHits = (): Hits => {
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
