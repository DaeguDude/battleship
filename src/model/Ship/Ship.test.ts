import { Ship } from "./Ship";

describe("It returns all the public properties and methods", () => {
  test("Assigns the name properly", () => {
    expect(Ship("Destroyer")).toMatchObject({ name: "Destroyer" });
  });

  test("Assigns the proper length for each ship", () => {
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
    Carrier.hit(2);
    expect(Carrier.getHits()).toEqual([
      "noHit",
      "noHit",
      "hit",
      "noHit",
      "noHit",
    ]);

    const Destroyer = Ship("Destroyer");
    Destroyer.hit(1);
    expect(Destroyer.getHits()).toEqual(["noHit", "hit", "noHit"]);
  });

  test("Positions that are outside the range is not hit", () => {
    const PatrolBoat = Ship("PatrolBoat");
    PatrolBoat.hit(3);
    expect(PatrolBoat.getHits()).toEqual(["noHit", "noHit"]);

    const Battleship = Ship("Battleship");
    Battleship.hit(10);
    expect(Battleship.getHits()).toStrictEqual([
      "noHit",
      "noHit",
      "noHit",
      "noHit",
    ]);
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
