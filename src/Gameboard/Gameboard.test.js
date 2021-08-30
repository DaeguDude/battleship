import { Gameboard } from "./Gameboard";
import { Ship } from "../Ship/Ship";

describe("Creates 10 x 10 coordinates", () => {
  test.only("10 x 10 coordinates created correctly", () => {
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
  test.only("Placed the right ship", () => {
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

  test("Coordinates does not exist", () => {
    const myGameBoard = Gameboard();
    expect(() => {
      myGameBoard.placeShip(Ship("Battleship"), 3, 3);
    }).toThrow("Invalid y coordinate");
    expect(() => {
      myGameBoard.placeShip(Ship("Battleship"), "z", 3);
    }).toThrow("Invalid x coordinate");
    expect(() => {
      myGameBoard.placeShip(Ship("Battleship"), -1, "a");
    }).toThrow("Invalid x coordinate");
    expect(() => {
      myGameBoard.placeShip(Ship("Battleship"), 10, "b");
    }).toThrow("Invalid x coordinate");
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

describe("receive attack", () => {
  test("Coordinates does not exist", () => {
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

  test("mark missed shot", () => {
    const myGameBoard = Gameboard();
    myGameBoard.placeShip(Ship("Carrier"), "b", 5);
    myGameBoard.receiveAttack("b", 4);
    myGameBoard.receiveAttack("b", 0);
    myGameBoard.receiveAttack("b", 2);
    expect(myGameBoard.getCoordinates()["b"][4]).toEqual("missed");
    expect(myGameBoard.getCoordinates()["b"][0]).toEqual("missed");
    expect(myGameBoard.getCoordinates()["b"][2]).toEqual("missed");

    myGameBoard.placeShip(Ship("Battleship"), "i", 2);
    myGameBoard.receiveAttack("i", 0);
    myGameBoard.receiveAttack("i", 7);
    myGameBoard.receiveAttack("i", 6);
    expect(myGameBoard.getCoordinates()["i"][0]).toEqual("missed");
    expect(myGameBoard.getCoordinates()["i"][7]).toEqual("missed");
    expect(myGameBoard.getCoordinates()["i"][6]).toEqual("missed");

    myGameBoard.placeShip(Ship("Destroyer"), "j", 5);
    myGameBoard.receiveAttack("j", 9);
    myGameBoard.receiveAttack("j", 8);
    myGameBoard.receiveAttack("j", 4);
    expect(myGameBoard.getCoordinates()["j"][9]).toEqual("missed");
    expect(myGameBoard.getCoordinates()["j"][8]).toEqual("missed");
    expect(myGameBoard.getCoordinates()["j"][4]).toEqual("missed");

    myGameBoard.placeShip(Ship("Submarine"), "a", 0);
    myGameBoard.receiveAttack("a", 3);
    myGameBoard.receiveAttack("a", 4);
    myGameBoard.receiveAttack("a", 9);
    expect(myGameBoard.getCoordinates()["a"][3]).toEqual("missed");
    expect(myGameBoard.getCoordinates()["a"][4]).toEqual("missed");
    expect(myGameBoard.getCoordinates()["a"][9]).toEqual("missed");

    myGameBoard.placeShip(Ship("PatrolBoat"), "f", 2);
    myGameBoard.receiveAttack("f", 4);
    myGameBoard.receiveAttack("f", 9);
    myGameBoard.receiveAttack("f", 1);
    expect(myGameBoard.getCoordinates()["f"][4]).toEqual("missed");
    expect(myGameBoard.getCoordinates()["f"][9]).toEqual("missed");
    expect(myGameBoard.getCoordinates()["f"][1]).toEqual("missed");
  });

  test("can't shot at the coordinate that is already shot", () => {
    const myGameBoard = Gameboard();
    myGameBoard.receiveAttack("a", 3);
    myGameBoard.receiveAttack("b", 0);
    myGameBoard.receiveAttack("f", 8);
    myGameBoard.receiveAttack("i", 9);
    myGameBoard.receiveAttack("j", 2);
    expect(myGameBoard.receiveAttack("a", 3)).toEqual(
      "This has been already shot"
    );
    expect(myGameBoard.receiveAttack("b", 0)).toEqual(
      "This has been already shot"
    );
    expect(myGameBoard.receiveAttack("f", 8)).toEqual(
      "This has been already shot"
    );
    expect(myGameBoard.receiveAttack("i", 9)).toEqual(
      "This has been already shot"
    );
    expect(myGameBoard.receiveAttack("j", 2)).toEqual(
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
});
