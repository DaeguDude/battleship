import { Gameboard, XCoordinates, YCoordinates } from "../types";

const Player = (name: string) => {
  const hit = (
    gameboard: Gameboard,
    xCoord?: XCoordinates,
    yCoord?: YCoordinates
  ) => {
    if (name === "computer") {
      while (true) {
        const xCoord = getRandomXCoordinate();
        const yCoord = getRandomYCoordinate();
        const specifiedCoordinate = gameboard.getCoordinates();
        if (specifiedCoordinate !== "missed" || specifiedCoordinate !== "hit") {
          gameboard.receiveAttack(xCoord, yCoord);
          break;
        }
      }

      return;
    }

    gameboard.receiveAttack(xCoord, yCoord);
  };

  // const hitComputer = (gameboard: Gameboard) => {
  //   while (true) {
  //     const xCoord = getRandomXCoordinate();
  //     const yCoord = getRandomYCoordinate();
  //     const specifiedCoordinate = gameboard.getCoordinates();
  //     if (specifiedCoordinate !== "missed" || specifiedCoordinate !== "hit") {
  //       gameboard.receiveAttack(xCoord, yCoord);
  //       break;
  //     }
  //   }
  //   // Check if the specified board was hit or missed before
  // };

  return { name, hit };
};

export { Player };

function getRandomXCoordinate(): XCoordinates {
  return getRandomIntInclusive(0, 9) as XCoordinates;
}

function getRandomYCoordinate(): YCoordinates {
  const yCoords = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"];
  return yCoords[getRandomIntInclusive(0, yCoords.length - 1)] as YCoordinates;
}

function getRandomIntInclusive(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}
