const Player = (name) => {
  const hit = (gameboard, xCoord, yCoord) => {
    gameboard.receiveAttack(xCoord, yCoord);
  };

  return { name, hit };
};

export { Player };
