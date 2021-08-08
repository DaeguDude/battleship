import { Ship } from "./Ship";

// Ship factory funciton

// Only test methods or properties that are used outside
test("Check if it has right property", () => {
  // This will return object that has length,
  // They've been hit or they've been sunk
  // const myShip = Ship();

  expect(Ship()).toHaveProperty("length");
  expect(Ship(3)).toHaveProperty("length", 3);
  expect(Ship()).toHaveProperty("hit");
  expect(Ship()).toHaveProperty("isSunk");

  // Ships should have a 'hit' function that takes
  // a number and then marks that position as 'hit'

  // isSunk() should be a function that calculates it
  // based on their length and whether all of their positions
  // are hit
});

test("hit funciton working correcty", () => {
  const length = 4;
  expect(Ship(length).hit(0)).toEqual(["hit", null, null, null]);
  expect(Ship(length).hit(1)).toEqual([null, "hit", null, null]);
  expect(Ship(length).hit(2)).toEqual([null, null, "hit", null]);
  expect(Ship(length).hit(3)).toEqual([null, null, null, "hit"]);

  // number that is out of the length
  expect(Ship(length).hit(4)).toEqual([null, null, null, null]);
  expect(Ship(length).hit(10)).toEqual([null, null, null, null]);
  expect(Ship(length).hit(-2)).toEqual([null, null, null, null]);
  expect(Ship(length).hit(-1)).toEqual([null, null, null, null]);
});

test("isSunk works correctly", () => {
  const myShip1 = Ship(5);
  for (let i = 0; i < 5; i++) {
    myShip1.hit(i);
  }
  expect(myShip1.isSunk()).toBe(true);

  const myShip2 = Ship(2);
  myShip2.hit(0);
  myShip2.hit(1);
  expect(myShip2.isSunk()).toBe(true);

  const myShip3 = Ship(5);
  myShip3.hit(3);
  expect(myShip3.isSunk()).toBe(false);

  const myShip4 = Ship(4);
  for (let i = 0; i < 3; i++) {
    myShip4.hit(i);
  }
  expect(myShip4.isSunk()).toBe(false);
});
