import { Gameboard } from "./Gameboard";
import { Ship } from "../Ship/Ship";

describe("PlaceShip", () => {
  test.only("Placed the right ship", () => {
    const myGameBoard = Gameboard();
    myGameBoard.placeShip("PatrolBoat", "c", 2);
    const patrolBoatLength = 2;
    const coordinates = myGameBoard.getCoordinates();
    const ThirdRow = coordinates[2];

    expect(ThirdRow.slice(2, 2 + patrolBoatLength)).toEqual([
      "PatrolBoat",
      "PatrolBoat",
    ]);
  });

  test.only("Coordinates exist, but not enough space", () => {
    const myGameBoard = Gameboard();
    expect(() => {
      myGameBoard.placeShip("PatrolBoat", "j", 0);
    }).toThrow("not enough space");

    expect(() => {
      myGameBoard.placeShip("Destroyer", "i", 0);
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

test("Mark hit on the gameboard and sends the hit function to the correctship", () => {
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

test("Mark hit on the gameboard when there is a ship", () => {
  const myGameboard = Gameboard();

  const coordinates = myGameboard.getCoordinates();
  myGameboard.placeShip(Ship("PatrolBoat"), 2, "f");
  myGameboard.receiveAttack(2, "f");
  expect(coordinates["f"][2]).toEqual("hit-PatrolBoat");

  myGameboard.placeShip(Ship("Carrier"), 2, "b");
  myGameboard.receiveAttack(4, "b");
  expect(coordinates["b"][4]).toEqual("hit-Carrier");
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
