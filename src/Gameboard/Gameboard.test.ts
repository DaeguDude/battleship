import { Gameboard } from "./Gameboard";
import { Ship } from "../Ship/Ship";

describe("Creates 10 x 10 coordinates", () => {
  test("10 x 10 coordinates created correctly", () => {
    const myGameboard = Gameboard();
    const arrWithFalses = Array(10).fill(false);

    expect(myGameboard.getCoordinates()["a"]).toEqual(arrWithFalses);
    expect(myGameboard.getCoordinates()["f"]).toEqual(arrWithFalses);
    expect(myGameboard.getCoordinates()["j"]).toEqual(arrWithFalses);
    expect(myGameboard.getCoordinates()["k"]).toBeUndefined();
    expect(myGameboard.getCoordinates()["m"]).toBeUndefined();
    expect(myGameboard.getCoordinates()["z"]).toBeUndefined();
  });
});

describe("PlaceShip", () => {
  test("Placed the right ship", () => {
    const myGameboard = Gameboard();

    myGameboard.placeShip(Ship("Carrier"), 5, "b");
    expect(myGameboard.getCoordinates()["b"]).toEqual([
      false,
      false,
      false,
      false,
      false,
      "Carrier",
      "Carrier",
      "Carrier",
      "Carrier",
      "Carrier",
    ]);

    myGameboard.placeShip(Ship("PatrolBoat"), 8, "j");
    expect(myGameboard.getCoordinates()["j"]).toEqual([
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      "PatrolBoat",
      "PatrolBoat",
    ]);
  });

  test("Coordinates exist, but not enough space", () => {
    const myGameBoard = Gameboard();
    expect(() => {
      myGameBoard.placeShip(Ship("Carrier"), 6, "a");
    }).toThrow("not enough space");
    expect(() => {
      myGameBoard.placeShip(Ship("Battleship"), 7, "i");
    }).toThrow("not enough space");
    expect(() => {
      myGameBoard.placeShip(Ship("Destroyer"), 8, "d");
    }).toThrow("not enough space");
  });
});

test("mark missed shot", () => {
  const myGameboard = Gameboard();
  myGameboard.placeShip(Ship("Carrier"), 5, "b");
  myGameboard.placeShip(Ship("Battleship"), 2, "i");

  myGameboard.receiveAttack(3, "a");
  myGameboard.receiveAttack(4, "b");
  myGameboard.receiveAttack(5, "f");
  myGameboard.receiveAttack(3, "j");

  const coordinates = myGameboard.getCoordinates();
  expect(coordinates["a"][3]).toBe("missed");
  expect(coordinates["b"][4]).toBe("missed");
  expect(coordinates["f"][5]).toBe("missed");
  expect(coordinates["j"][3]).toBe("missed");
});

test("can't shot at the coordinate that is already shot", () => {
  const myGameBoard = Gameboard();
  myGameBoard.receiveAttack(3, "a");
  myGameBoard.receiveAttack(0, "b");
  myGameBoard.receiveAttack(8, "f");

  expect(myGameBoard.receiveAttack(3, "a")).toEqual(
    "This has been already shot"
  );
  expect(myGameBoard.receiveAttack(0, "b")).toEqual(
    "This has been already shot"
  );
  expect(myGameBoard.receiveAttack(8, "f")).toEqual(
    "This has been already shot"
  );
});

test("Sends the hit function to the correctship", () => {
  const myGameboard = Gameboard();
  const PatrolBoat = Ship("PatrolBoat");
  myGameboard.placeShip(PatrolBoat, 2, "f");
  myGameboard.receiveAttack(2, "f");
  expect(PatrolBoat.getHits()).toEqual([true, false]);

  const Carrier = Ship("Carrier");
  myGameboard.placeShip(Carrier, 2, "b");
  myGameboard.receiveAttack(4, "b");
  expect(Carrier.getHits()).toEqual([false, false, true, false, false]);
});

test("Check if all ships are sunk", () => {
  const myGameboard = Gameboard();
  myGameboard.placeShip(Ship("Carrier"), 0, "a");
  myGameboard.receiveAttack(0, "a");
  myGameboard.receiveAttack(1, "a");
  myGameboard.receiveAttack(2, "a");
  myGameboard.receiveAttack(3, "a");
  myGameboard.receiveAttack(4, "a");

  myGameboard.placeShip(Ship("Battleship"), 0, "b");
  myGameboard.receiveAttack(0, "b");
  myGameboard.receiveAttack(1, "b");
  myGameboard.receiveAttack(2, "b");
  myGameboard.receiveAttack(3, "b");

  myGameboard.placeShip(Ship("Destroyer"), 0, "c");
  myGameboard.receiveAttack(0, "c");
  myGameboard.receiveAttack(1, "c");
  myGameboard.receiveAttack(2, "c");

  myGameboard.placeShip(Ship("Submarine"), 0, "d");
  myGameboard.receiveAttack(0, "d");
  myGameboard.receiveAttack(1, "d");
  myGameboard.receiveAttack(2, "d");

  myGameboard.placeShip(Ship("PatrolBoat"), 0, "e");
  myGameboard.receiveAttack(0, "e");
  myGameboard.receiveAttack(1, "e");

  expect(myGameboard.areAllShipsSunk()).toBe(true);
});
