import {
  HitCoordinates,
  Player as PlayerType,
  Gameboard as GameboardType,
  XCoordinates,
  YCoordinates,
} from "../../types";

export const Player = (name: string, enemyBoard: GameboardType): PlayerType => {
  const _name = name;
  const _enemyBoard = enemyBoard;

  const hit = (coordinates?: HitCoordinates) => {
    if (_name === "computer") {
      while (true) {
        const xCoord = getRandomXCoordinate();
        const yCoord = getRandomYCoordinate();

        // Try to
        const specifiedCoordinate = _enemyBoard.getCoordinate(xCoord, yCoord);

        // 만약... 'missed'가 아니고 'hit'이 아닐시에만...break
        if (specifiedCoordinate !== "missed" && specifiedCoordinate !== "hit") {
          _enemyBoard.receiveAttack(xCoord, yCoord);
          break;
        }
      }

      return;
    }

    if (coordinates !== undefined) {
      const hitResult = _enemyBoard.receiveAttack(coordinates.x, coordinates.y);
      if (hitResult === "failure") {
        return "failure";
      }

      return "success";
    }
  };

  return { name, hit };
};

function getRandomXCoordinate(): XCoordinates {
  const xCoords = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"];
  const randNum = getRandomIntInclusive(0, 9);

  return xCoords[randNum] as XCoordinates;
}

function getRandomYCoordinate(): YCoordinates {
  return getRandomIntInclusive(0, 9) as YCoordinates;
}

function getRandomIntInclusive(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}
