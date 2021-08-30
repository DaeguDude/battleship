function Ship(name) {
  const length = getLengthForBoat(name);
  if (!length) {
    throw new Error(`We don't have ${name} named boat`);
  }

  let hits = new Array(length).fill(false);

  // Creates side effects - We can assert the public side effects
  const hit = (hitLocation) => {
    hits = hitReducer(hits, hitLocation);
  };

  // True pure function
  const hitReducer = (hits, hitLocation) => {
    const newHits = [...hits];
    newHits[hitLocation] = true;
    return newHits;
  };

  const isSunk = () => {
    return hits.every((position) => position === true);
  };

  const getHits = () => {
    return hits;
  };

  return { name, length, hit, isSunk, getHits };
}

function getLengthForBoat(name) {
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
