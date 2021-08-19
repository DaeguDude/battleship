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

  test.only("Coordinates does not exist", () => {
    const myGameBoard = Gameboard();
    expect(() => {
      myGameBoard.placeShip(Ship("Battleship"), 3, 3);
    }).toThrow("Invalid x coordinate");
    expect(() => {
      myGameBoard.placeShip(Ship("Battleship"), "z", 3);
    }).toThrow("Invalid x coordinate");
    expect(() => {
      myGameBoard.placeShip(Ship("Battleship"), "a", -1);
    }).toThrow("Invalid y coordinate");
    expect(() => {
      myGameBoard.placeShip(Ship("Battleship"), "a", 10);
    }).toThrow("Invalid y coordinate");
  });

  test.only("Coordinates exist, but not enough space", () => {
    const myGameBoard = Gameboard();
    expect(() => {
      myGameBoard.placeShip(Ship("Carrier"), "a", 6);
    }).toThrow("not enough space");
    expect(() => {
      myGameBoard.placeShip(Ship("Battleship"), "i", 7);
    }).toThrow("not enough space");
    expect(() => {
      myGameBoard.placeShip(Ship("Destroyer"), "d", 8);
    }).toThrow("not enough space");
    expect(() => {
      myGameBoard.placeShip(Ship("Submarine"), "f", 8);
    }).toThrow("not enough space");
    expect(() => {
      myGameBoard.placeShip(Ship("PatrolBoat"), "j", 9);
    }).toThrow("not enough space");
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
