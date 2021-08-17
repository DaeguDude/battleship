import { Gameboard } from "./Gameboard";
import { Ship } from "./Ship";

test("10 x 10 coordinates created correctly", () => {
  const myGameBoard = Gameboard();

  // Length should be 10
  // Each lines length should be 10 as well
  // All the values inside the each line should be null
  expect(myGameBoard.getCoordinates()).toHaveLength(10);
  expect(myGameBoard.getCoordinates()).toHaveProperty("a");
  // expect(myGameBoard.getCoordinates()[0]).toHaveLength(10);
  // expect(myGameBoard.getCoordinates()[9]).toHaveLength(10);
  // expect(myGameBoard.getCoordinates()[10]).toBeUndefined();

  // const shouldBe = [null, null, null, null, null, null, null, null, null, null];
  // myGameBoard
  //   .getCoordinates()
  //   .forEach((line) => expect(line).toEqual(shouldBe));
});

describe("PlaceShip", () => {
  const myGameBoard = Gameboard();
  test("Coordinates does not exist", () => {
    expect(myGameBoard.placeShip(Ship(2), 10, 9)).toEqual(false);
    expect(myGameBoard.placeShip(Ship(2), 9, 12)).toEqual(false);
    expect(myGameBoard.placeShip(Ship(2), 9, 10)).toEqual(false);
    expect(myGameBoard.placeShip(Ship(2), -1, 100)).toEqual(false);
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
