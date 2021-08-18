import { Gameboard } from "./Gameboard";
import { Ship } from "../Ship/Ship";

describe("Creates 10 x 10 coordinates", () => {
  test("10 x 10 coordinates created correctly", () => {
    const myGameBoard = Gameboard();

    expect(myGameBoard.getCoordinates()["a"]).toHaveLength(10);
    expect(myGameBoard.getCoordinates()["b"]).toHaveLength(10);
    expect(myGameBoard.getCoordinates()["c"]).toHaveLength(10);
    expect(myGameBoard.getCoordinates()["d"]).toHaveLength(10);
    expect(myGameBoard.getCoordinates()["e"]).toHaveLength(10);
    expect(myGameBoard.getCoordinates()["f"]).toHaveLength(10);
    expect(myGameBoard.getCoordinates()["g"]).toHaveLength(10);
    expect(myGameBoard.getCoordinates()["h"]).toHaveLength(10);
    expect(myGameBoard.getCoordinates()["i"]).toHaveLength(10);
    expect(myGameBoard.getCoordinates()["j"]).toHaveLength(10);

    expect(myGameBoard.getCoordinates()["k"]).toBeUndefined();
    expect(myGameBoard.getCoordinates()["m"]).toBeUndefined();
    expect(myGameBoard.getCoordinates()["z"]).toBeUndefined();
    expect(myGameBoard.getCoordinates()).toHaveProperty("a");
  });
});

describe("PlaceShip", () => {
  test.only("Placed the right ship", () => {
    const myGameBoard = Gameboard();
    const submarine = Ship("Submarine");
    myGameBoard.placeShip(submarine, "a", 0);
    expect(myGameBoard.getCoordinates()["a"]).toEqual([
      "Submarine",
      "Submarine",
      "Submarine",
      null,
      null,
      null,
      null,
      null,
      null,
      null,
    ]);

    myGameBoard.placeShip(Ship("Carrier"), "b", 5);
    expect(myGameBoard.getCoordinates()["b"]).toEqual([
      null,
      null,
      null,
      null,
      null,
      "Carrier",
      "Carrier",
      "Carrier",
      "Carrier",
      "Carrier",
    ]);
    myGameBoard.placeShip(Ship("PatrolBoat"), "f", 2);
    expect(myGameBoard.getCoordinates()["f"]).toEqual([
      null,
      null,
      "PatrolBoat",
      "PatrolBoat",
      null,
      null,
      null,
      null,
      null,
      null,
    ]);
    myGameBoard.placeShip(Ship("Destroyer"), "j", 5);
    expect(myGameBoard.getCoordinates()["j"]).toEqual([
      null,
      null,
      null,
      null,
      null,
      "Destroyer",
      "Destroyer",
      "Destroyer",
      null,
      null,
    ]);

    myGameBoard.placeShip(Ship("Battleship"), "i", 2);
    expect(myGameBoard.getCoordinates()["i"]).toEqual([
      null,
      null,
      "Battleship",
      "Battleship",
      "Battleship",
      "Battleship",
      null,
      null,
      null,
      null,
    ]);
  });

  test("Coordinates does not exist", () => {
    expect(myGameBoard.placeShip(Ship("Carrier"), 10, 9)).toEqual(false);
    expect(myGameBoard.placeShip(Ship("Carrier"), 9, 12)).toEqual(false);
    expect(myGameBoard.placeShip(Ship("Carrier"), 9, 10)).toEqual(false);
    expect(myGameBoard.placeShip(Ship("Carrier"), -1, 100)).toEqual(false);
  });
  test("Coordinates exist, but not enough space", () => {
    expect(myGameBoard.placeShip(Ship(4), 7, 0)).toEqual(false);
    expect(myGameBoard.placeShip(Ship(5), 6, 9)).toEqual(false);
    expect(myGameBoard.placeShip(Ship(2), 9, 9)).toEqual(false);
  });
  test("Working correctly", () => {
    expect(myGameBoard.placeShip(Ship(2), 3, 4)).toEqual([
      null,
      null,
      null,
      "ship",
      "ship",
      null,
      null,
      null,
      null,
      null,
    ]);
    expect(myGameBoard.placeShip(Ship(3), 7, 9)).toEqual([
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      "ship",
      "ship",
      "ship",
    ]);
    expect(myGameBoard.placeShip(Ship(4), 5, 0)).toEqual([
      null,
      null,
      null,
      null,
      null,
      "ship",
      "ship",
      "ship",
      "ship",
      null,
    ]);
    expect(myGameBoard.placeShip(Ship(5), 5, 5)).toEqual([
      null,
      null,
      null,
      null,
      null,
      "ship",
      "ship",
      "ship",
      "ship",
      "ship",
    ]);
  });
});

//
describe("receive attack", () => {
  // When receiving attack, if that coordinates isn't
  // a null, and it's a "ship". Send hit function to the
  // correct ship
  // Otherwise, if there wasn't a ship at the coordinates,
  // mark that as a miss, so you can track them
});
