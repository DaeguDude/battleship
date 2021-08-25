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
  test("Placed the right ship", () => {
    const myGameBoard = Gameboard();

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

    myGameBoard.placeShip(Ship("Submarine"), "a", 0);
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
  });

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

  test("Coordinates exist, but not enough space", () => {
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
    // It should sends the 'hit' function to the correct ship
    // How do I do that?
    const myGameBoard = Gameboard();
    const PatrolBoat = Ship("PatrolBoat");

    myGameBoard.placeShip(PatrolBoat, "f", 2);
    myGameBoard.receiveAttack("f", 2);
    expect(PatrolBoat.getPosition()).toEqual(["hit", null]);

    const Carrier = Ship("Carrier");
    myGameBoard.placeShip(Carrier, "b", 2);
    myGameBoard.receiveAttack("b", 4);
    expect(Carrier.getPosition()).toEqual([null, null, "hit", null, null]);

    const Battleship = Ship("Battleship");
    myGameBoard.placeShip(Battleship, "f", 6);
    myGameBoard.receiveAttack("f", 7);
    expect(Battleship.getPosition()).toEqual([null, "hit", null, null]);

    // How do I know PatrolBoat has been hit?
  });

  test.only("Check if all ships are sunk", () => {
    const myGameBoard = Gameboard();
    myGameBoard.placeShip(Ship("Carrier"), "a", 0);
    myGameBoard.receiveAttack("a", 0);
    myGameBoard.receiveAttack("a", 1);
    myGameBoard.receiveAttack("a", 2);
    myGameBoard.receiveAttack("a", 3);
    myGameBoard.receiveAttack("a", 4);

    myGameBoard.placeShip(Ship("Battleship"), "b", 0);
    myGameBoard.receiveAttack("b", 0);
    myGameBoard.receiveAttack("b", 1);
    myGameBoard.receiveAttack("b", 2);
    myGameBoard.receiveAttack("b", 3);

    myGameBoard.placeShip(Ship("Destroyer"), "c", 0);
    myGameBoard.receiveAttack("c", 0);
    myGameBoard.receiveAttack("c", 1);
    myGameBoard.receiveAttack("c", 2);

    myGameBoard.placeShip(Ship("Submarine"), "d", 0);
    myGameBoard.receiveAttack("d", 0);
    myGameBoard.receiveAttack("d", 1);
    myGameBoard.receiveAttack("d", 2);

    myGameBoard.placeShip(Ship("PatrolBoat"), "e", 0);
    myGameBoard.receiveAttack("e", 0);
    myGameBoard.receiveAttack("e", 1);

    expect(myGameBoard.areAllShipsSunk()).toBe(true);
  });
});
