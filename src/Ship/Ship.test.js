import { Ship } from "./Ship";

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
    expect(Ship("Carrier")).toMatchObject({ length: 5 });
    expect(Ship("Battleship")).toMatchObject({ length: 4 });
    expect(Ship("Destroyer")).toMatchObject({ length: 3 });
    expect(Ship("Submarine")).toMatchObject({ length: 3 });
    expect(Ship("PatrolBoat")).toMatchObject({ length: 2 });
  });
});

describe("hit function", () => {
  test("All the positions are hit correctly", () => {
    expect(Ship("Carrier").hit(4)).toEqual([null, null, null, null, "hit"]);
    expect(Ship("Battleship").hit(0)).toEqual(["hit", null, null, null]);
    expect(Ship("Destroyer").hit(1)).toEqual([null, "hit", null]);
    expect(Ship("PatrolBoat").hit(1)).toEqual([null, "hit"]);
    expect(Ship("Submarine").hit(2)).toEqual([null, null, "hit"]);
  });

  test("Positions that are outside the range is not hit", () => {
    expect(Ship("Carrier").hit(5)).toEqual([null, null, null, null, null]);
    expect(Ship("Battleship").hit(10)).toEqual([null, null, null, null]);
    expect(Ship("Destroyer").hit(-2)).toEqual([null, null, null]);
    expect(Ship("PatrolBoat").hit(-1)).toEqual([null, null]);
    expect(Ship("Submarine").hit(-1)).toEqual([null, null, null]);
  });
});

describe("isSunk", () => {
  test.only("isSunk works correctly", () => {
    const myShip1 = Ship("Carrier");
    for (let i = 0; i < myShip1.length; i++) {
      myShip1.hit(i);
    }
    expect(myShip1.isSunk()).toBe(true);

    const myShip2 = Ship("Battleship");
    for (let i = 0; i < myShip2.length; i++) {
      myShip2.hit(i);
    }
    expect(myShip2.isSunk()).toBe(true);

    const myShip3 = Ship("Destroyer");
    for (let i = 0; i < myShip3.length; i++) {
      myShip3.hit(i);
    }
    expect(myShip3.isSunk()).toBe(true);

    const myShip4 = Ship("Submarine");
    for (let i = 0; i < myShip4.length; i++) {
      myShip4.hit(i);
    }
    expect(myShip4.isSunk()).toBe(true);

    const myShip5 = Ship("PatrolBoat");
    for (let i = 0; i < myShip5.length; i++) {
      myShip5.hit(i);
    }
    expect(myShip5.isSunk()).toBe(true);
  });
});
