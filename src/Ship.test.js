import { Ship } from "./Ship";

// Ship factory funciton

describe("It returns all the public properties and methods", () => {
  test("It has all the properties", () => {
    expect(Ship()).toHaveProperty("length");
    expect(Ship()).toHaveProperty("name");
    expect(Ship()).toHaveProperty("hit");
    expect(Ship()).toHaveProperty("isSunk");
  });

  test("It assigns the name well", () => {
    expect(Ship("Destroyer")).toMatchObject({ name: "Destroyer" });
  });

  test("It assigns the length well", () => {
    expect(Ship(undefined, 2)).toMatchObject({ length: 2 });
    expect(Ship(undefined, 3)).toMatchObject({ length: 3 });
    expect(Ship(undefined, 4)).toMatchObject({ length: 4 });
    expect(Ship(undefined, 5)).toMatchObject({ length: 5 });
  });
});

// Only test methods or properties that are used outside
describe("hit function", () => {
  test("All the positions are hit correctly", () => {
    const length = 4;
    expect(Ship("Battleship", length).hit(0)).toEqual([
      "hit",
      null,
      null,
      null,
    ]);
    expect(Ship("Battleship", length).hit(1)).toEqual([
      null,
      "hit",
      null,
      null,
    ]);
    expect(Ship("Battleship", length).hit(2)).toEqual([
      null,
      null,
      "hit",
      null,
    ]);
    expect(Ship("Battleship", length).hit(3)).toEqual([
      null,
      null,
      null,
      "hit",
    ]);
  });

  test("Positions that are outside the range is not hit", () => {
    const length = 4;
    expect(Ship("Battleship", length).hit(4)).toEqual([null, null, null, null]);
    expect(Ship("Battleship", length).hit(10)).toEqual([
      null,
      null,
      null,
      null,
    ]);
    expect(Ship("Battleship", length).hit(-2)).toEqual([
      null,
      null,
      null,
      null,
    ]);
    expect(Ship("Battleship", length).hit(-1)).toEqual([
      null,
      null,
      null,
      null,
    ]);
  });
});

describe("isSunk", () => {
  test("isSunk works correctly", () => {
    const myShip1 = Ship("Carrier", 5);
    for (let i = 0; i < 5; i++) {
      myShip1.hit(i);
    }
    expect(myShip1.isSunk()).toBe(true);

    const myShip2 = Ship("Battleship", 2);
    myShip2.hit(0);
    myShip2.hit(1);
    expect(myShip2.isSunk()).toBe(true);

    const myShip3 = Ship("Carrier", 5);
    myShip3.hit(3);
    expect(myShip3.isSunk()).toBe(false);

    const myShip4 = Ship("Battleship", 4);
    for (let i = 0; i < 3; i++) {
      myShip4.hit(i);
    }
    expect(myShip4.isSunk()).toBe(false);
  });
});
