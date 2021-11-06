import { Gameboard } from "./Gameboard";
import { Ship } from "../Ship/Ship";

describe("PlaceShip", () => {
  test("Placed the right ship", () => {
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

  test("Coordinates exist, but not enough space", () => {
    const myGameBoard = Gameboard();
    expect(() => {
      myGameBoard.placeShip("PatrolBoat", "j", 0);
    }).toThrow("not enough space");

    expect(() => {
      myGameBoard.placeShip("Destroyer", "i", 0);
    }).toThrow("not enough space");
  });
});

describe("ReceiveAttack", () => {
  // Takes a pair of coordinates

  // determines whether or not the attack hit a ship and then sends the 'hit' function
  // to the correct ship.

  // Or records the coordinates of the missed shot
  test("mark missed shot", () => {
    const myGameBoard = Gameboard();
    myGameBoard.receiveAttack("b", 2);
    expect(myGameBoard.getCoordinate("b", 2)).toBe("missed");

    myGameBoard.receiveAttack("i", 5);
    expect(myGameBoard.getCoordinate("i", 5)).toBe("missed");
  });

  test("mark hit", () => {
    const myGameBoard = Gameboard();

    myGameBoard.placeShip("PatrolBoat", "b", 0);
    myGameBoard.receiveAttack("b", 0);
    expect(myGameBoard.getCoordinate("b", 0)).toBe("hit");

    myGameBoard.placeShip("Destroyer", "c", 4);
    myGameBoard.receiveAttack("d", 4);
    expect(myGameBoard.getCoordinate("d", 4)).toBe("hit");
  });

  test.only("Check if it sends the hit function to the correct ship", () => {
    const myGameBoard = Gameboard();
    myGameBoard.placeShip("PatrolBoat", "b", 0);
    myGameBoard.receiveAttack("c", 0);

    const patrolBoat = myGameBoard.getShip("PatrolBoat");
    const positions = patrolBoat.getHits();
    expect(positions[1]).toBe("hit");
  });
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
