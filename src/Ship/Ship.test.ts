import { Ship } from "./Ship";

describe("It returns all the public properties and methods", () => {
  test("It has all the properties", () => {
    const Carrier = Ship("Carrier");
    expect(Carrier).toHaveProperty("length");
    expect(Carrier).toHaveProperty("name");
    expect(Carrier).toHaveProperty("hit");
    expect(Carrier).toHaveProperty("isSunk");
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
    const Carrier = Ship("Carrier");
    // Command - Create direct public side effects
    Carrier.hit(2);
    // public side effects - Carrier.hits
    expect(Carrier.getHits()).toEqual([false, false, true, false, false]);

    const Destroyer = Ship("Destroyer");
    Destroyer.hit(2);
    expect(Destroyer.getHits()).toEqual([false, false, true]);
  });

  test("Positions that are outside the range is not hit", () => {
    const Carrier = Ship("Carrier");
    const Battleship = Ship("Battleship");
    const Destroyer = Ship("Destroyer");

    expect(Carrier.getHits()).toEqual([false, false, false, false, false]);
    expect(Battleship.getHits()).toEqual([false, false, false, false]);
    expect(Destroyer.getHits()).toEqual([false, false, false]);
  });
});

describe("isSunk", () => {
  test("isSunk works correctly", () => {
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
