import { hasEnoughSpace } from "./util";

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
