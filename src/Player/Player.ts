import { Gameboard, XCoordinates, YCoordinates } from "../types";

const Player = (name: string) => {
  const hit = (
    gameboard: Gameboard,
    xCoord: XCoordinates,
    yCoord: YCoordinates
  ) => {
    gameboard.receiveAttack(xCoord, yCoord);
  };

  return { name, hit };
};

export { Player };
