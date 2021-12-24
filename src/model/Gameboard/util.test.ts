import { Gameboard } from "./Gameboard";
import { hasEnoughSpace, hasNoShipOnTheCoordinate } from "./util";

describe("Check if the gameboard has enough space to place the current ship", () => {
  test("It has enough space", () => {
    expect(hasEnoughSpace("Battleship", { x: "a", y: 0 })).toBe(true);
    expect(hasEnoughSpace("Carrier", { x: "f", y: 1 })).toBe(true);
    expect(hasEnoughSpace("Battleship", { x: "c", y: 1 })).toBe(true);
    expect(hasEnoughSpace("PatrolBoat", { x: "h", y: 1 })).toBe(true);
    expect(hasEnoughSpace("Destroyer", { x: "h", y: 1 })).toBe(true);
    expect(hasEnoughSpace("PatrolBoat", { x: "i", y: 1 })).toBe(true);
    expect(hasEnoughSpace("Submarine", { x: "h", y: 1 })).toBe(true);
  });

  test("It doesn't have enough space", () => {
    expect(hasEnoughSpace("Carrier", { x: "g", y: 0 })).toBe(false);
    expect(hasEnoughSpace("Battleship", { x: "h", y: 1 })).toBe(false);
    expect(hasEnoughSpace("Destroyer", { x: "i", y: 1 })).toBe(false);
    expect(hasEnoughSpace("Submarine", { x: "i", y: 1 })).toBe(false);
    expect(hasEnoughSpace("PatrolBoat", { x: "j", y: 1 })).toBe(false);
  });
});

describe("Check if there is any ship along the coordinate that you are trying to place", () => {
  test("It returns true if there is no ship", () => {});

  test.only("It returns false if there is a ship", () => {
    const myGameboard = Gameboard();

    myGameboard.placeShip("PatrolBoat", "i", 0);
    expect(
      hasNoShipOnTheCoordinate("Carrier", myGameboard.getCoordinates(), {
        x: "f",
        y: 0,
      })
    ).toBe(false);

    myGameboard.placeShip("Submarine", "h", 1);
    expect(
      hasNoShipOnTheCoordinate("Battleship", myGameboard.getCoordinates(), {
        x: "g",
        y: 1,
      })
    ).toBe(false);

    myGameboard.placeShip("Carrier", "f", 2);
    expect(
      hasNoShipOnTheCoordinate("Battleship", myGameboard.getCoordinates(), {
        x: "c",
        y: 2,
      })
    ).toBe(false);

    myGameboard.placeShip("Destroyer", "a", 3);
    expect(
      hasNoShipOnTheCoordinate("Battleship", myGameboard.getCoordinates(), {
        x: "c",
        y: 3,
      })
    ).toBe(false);
  });
});
