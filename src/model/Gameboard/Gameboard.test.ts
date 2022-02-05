import { Gameboard } from "./Gameboard";
import { hasEnoughSpace, hasNoShipOnTheCoordinate } from "./util";

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

  test("It has enough space to place the ship", () => {
    const myGameBoard = Gameboard();

    expect(myGameBoard.placeShip("Carrier", "f", 0)).toBe(true);
    expect(myGameBoard.placeShip("Battleship", "g", 1)).toBe(true);
    expect(myGameBoard.placeShip("Destroyer", "h", 2)).toBe(true);
    expect(myGameBoard.placeShip("Submarine", "h", 3)).toBe(true);
    expect(myGameBoard.placeShip("PatrolBoat", "i", 4)).toBe(true);
  });

  test("There is not enough space to place the ship", () => {
    const myGameBoard = Gameboard();

    expect(myGameBoard.placeShip("Carrier", "g", 0)).toBe("not enough space");
    expect(myGameBoard.placeShip("Battleship", "h", 1)).toBe(
      "not enough space"
    );
    expect(myGameBoard.placeShip("Destroyer", "i", 1)).toBe("not enough space");
    expect(myGameBoard.placeShip("Submarine", "i", 1)).toBe("not enough space");
    expect(myGameBoard.placeShip("PatrolBoat", "j", 1)).toBe(
      "not enough space"
    );
  });

  test("There is already a boat, can't place the ship", () => {
    const myGameBoard = Gameboard();

    myGameBoard.placeShip("PatrolBoat", "i", 0);
    expect(myGameBoard.placeShip("Carrier", "f", 0)).toBe(
      "there is a ship along the xCoordinates"
    );

    myGameBoard.placeShip("Submarine", "h", 1);
    expect(myGameBoard.placeShip("Battleship", "g", 1)).toBe(
      "there is a ship along the xCoordinates"
    );

    myGameBoard.placeShip("Carrier", "f", 2);
    expect(myGameBoard.placeShip("Battleship", "c", 2)).toBe(
      "there is a ship along the xCoordinates"
    );

    myGameBoard.placeShip("Destroyer", "a", 3);
    expect(myGameBoard.placeShip("Battleship", "c", 3)).toBe(
      "there is a ship along the xCoordinates"
    );
  });
});

describe("ReceiveAttack", () => {
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

  test("Check if it sends the hit function to the correct ship", () => {
    const myGameBoard = Gameboard();
    myGameBoard.placeShip("PatrolBoat", "b", 0);
    myGameBoard.receiveAttack("b", 0);
    myGameBoard.receiveAttack("c", 0);

    const patrolBoat = myGameBoard.getShip("PatrolBoat");
    const positions = patrolBoat.getHits();
    expect(positions[0]).toBe("hit");
    expect(positions[1]).toBe("hit");
  });

  test("return 'failure' if specified coordinate was already shot", () => {
    const myGameBoard = Gameboard();
    myGameBoard.placeShip("PatrolBoat", "b", 0);

    myGameBoard.receiveAttack("b", 0);
    expect(myGameBoard.receiveAttack("b", 0)).toBe("failure");
  });
});

describe("AreAllShipsSunk", () => {
  test("Check if all ships are sunk", () => {
    const myGameBoard = Gameboard();
    myGameBoard.placeShip("Carrier", "a", 0);
    myGameBoard.receiveAttack("a", 0);
    myGameBoard.receiveAttack("b", 0);
    myGameBoard.receiveAttack("c", 0);
    myGameBoard.receiveAttack("d", 0);
    myGameBoard.receiveAttack("e", 0);

    myGameBoard.placeShip("Battleship", "a", 1);
    myGameBoard.receiveAttack("a", 1);
    myGameBoard.receiveAttack("b", 1);
    myGameBoard.receiveAttack("c", 1);
    myGameBoard.receiveAttack("d", 1);

    myGameBoard.placeShip("Destroyer", "a", 2);
    myGameBoard.receiveAttack("a", 2);
    myGameBoard.receiveAttack("b", 2);
    myGameBoard.receiveAttack("c", 2);

    myGameBoard.placeShip("Submarine", "a", 3);
    myGameBoard.receiveAttack("a", 3);
    myGameBoard.receiveAttack("b", 3);
    myGameBoard.receiveAttack("c", 3);

    myGameBoard.placeShip("PatrolBoat", "a", 4);
    myGameBoard.receiveAttack("a", 4);
    myGameBoard.receiveAttack("b", 4);

    expect(myGameBoard.areAllShipsSunk()).toBe(true);
  });
});

describe("isValidMove", () => {
  test("checks if it has enough space or not", () => {
    expect(hasEnoughSpace("Carrier", { x: "f", y: 0 })).toBe(true);
    expect(hasEnoughSpace("Carrier", { x: "g", y: 0 })).toBe(false);

    expect(hasEnoughSpace("Battleship", { x: "g", y: 0 })).toBe(true);
    expect(hasEnoughSpace("Battleship", { x: "h", y: 0 })).toBe(false);

    expect(hasEnoughSpace("Destroyer", { x: "h", y: 0 })).toBe(true);
    expect(hasEnoughSpace("Destroyer", { x: "i", y: 0 })).toBe(false);

    expect(hasEnoughSpace("Submarine", { x: "h", y: 0 })).toBe(true);
    expect(hasEnoughSpace("Submarine", { x: "i", y: 0 })).toBe(false);

    expect(hasEnoughSpace("PatrolBoat", { x: "i", y: 0 })).toBe(true);
    expect(hasEnoughSpace("PatrolBoat", { x: "j", y: 0 })).toBe(false);
  });

  test("no ships along the way on the coordinate", () => {
    const myGameBoard = Gameboard();

    myGameBoard.placeShip("Carrier", "f", 0);
    expect(
      hasNoShipOnTheCoordinate("Battleship", myGameBoard.getCoordinates(), {
        x: "c",
        y: 0,
      })
    ).not.toBe(true);

    expect(
      hasNoShipOnTheCoordinate("Battleship", myGameBoard.getCoordinates(), {
        x: "b",
        y: 0,
      })
    ).toBe(true);

    myGameBoard.placeShip("Battleship", "a", 1);
    expect(
      hasNoShipOnTheCoordinate("PatrolBoat", myGameBoard.getCoordinates(), {
        x: "d",
        y: 1,
      })
    ).not.toBe(true);
    expect(
      hasNoShipOnTheCoordinate("PatrolBoat", myGameBoard.getCoordinates(), {
        x: "e",
        y: 1,
      })
    ).toBe(true);

    myGameBoard.placeShip("Destroyer", "h", 2);
    expect(
      hasNoShipOnTheCoordinate("PatrolBoat", myGameBoard.getCoordinates(), {
        x: "g",
        y: 2,
      })
    ).not.toBe(true);

    expect(
      hasNoShipOnTheCoordinate("PatrolBoat", myGameBoard.getCoordinates(), {
        x: "f",
        y: 2,
      })
    ).toBe(true);
  });
});
