import { Player } from "./Player";
import { Gameboard } from "../Gameboard/Gameboard";
import { Ship } from "../Ship/Ship";
import { XCoordinates, YCoordinates } from "../types";

describe("Player", () => {
  test("check if it hits", () => {
    const newPlayer = Player("Daegudude");
    const gameBoard = Gameboard();
    gameBoard.placeShip(Ship("Battleship"), 3, "b");

    newPlayer.hit(gameBoard, 3, "a");
    expect(gameBoard.getCoordinates()["a"][3]).toBe("missed");

    newPlayer.hit(gameBoard, 3, "b");
    expect(gameBoard.getCoordinates()["b"][3]).toBe("hit-Battleship");
  });
});

describe("Computer Player", () => {
  const yCoords: YCoordinates[] = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
  ];
  test("Can make a random hit", () => {
    const newPlayer = Player("computer");
    const gameBoard = Gameboard();

    newPlayer.hit(gameBoard);
    newPlayer.hit(gameBoard);
    newPlayer.hit(gameBoard);
    newPlayer.hit(gameBoard);
    newPlayer.hit(gameBoard);
    // Iterate through the coordinates
    // and check if it has number of hits.
    let count = 0;
    const coordinates = gameBoard.getCoordinates();
    yCoords.forEach((yCoord) => {
      for (let i = 0; i < 10; i++) {
        // if it is...missed. count + 1
        if (coordinates[yCoord][i] === "missed") {
          count += 1;
        }
      }
    });

    expect(count).toBe(5);
  });
});
