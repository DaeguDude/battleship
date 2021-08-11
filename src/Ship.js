function Ship(length) {
  const positions = new Array(length).fill(null);

  const hit = (number) => {
    if (number >= 0 && number < length) {
      positions[number] = "hit";
    }
    return positions;
  };

  const isSunk = () => {
    return positions.every((position) => position === "hit");
  };

  return { length, hit, isSunk };
}

export { Ship };
