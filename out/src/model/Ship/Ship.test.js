"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Ship_1 = require("./Ship");
describe("It returns all the public properties and methods", function () {
    test("Assigns the name properly", function () {
        expect((0, Ship_1.Ship)("Destroyer")).toMatchObject({ name: "Destroyer" });
    });
    test("Assigns the proper length for each ship", function () {
        expect((0, Ship_1.Ship)("Carrier")).toMatchObject({ length: 5 });
        expect((0, Ship_1.Ship)("Battleship")).toMatchObject({ length: 4 });
        expect((0, Ship_1.Ship)("Destroyer")).toMatchObject({ length: 3 });
        expect((0, Ship_1.Ship)("Submarine")).toMatchObject({ length: 3 });
        expect((0, Ship_1.Ship)("PatrolBoat")).toMatchObject({ length: 2 });
    });
});
describe("hit function", function () {
    test("All the positions are hit correctly", function () {
        var Carrier = (0, Ship_1.Ship)("Carrier");
        Carrier.hit(2);
        expect(Carrier.getHits()).toEqual([
            "noHit",
            "noHit",
            "hit",
            "noHit",
            "noHit",
        ]);
        var Destroyer = (0, Ship_1.Ship)("Destroyer");
        Destroyer.hit(1);
        expect(Destroyer.getHits()).toEqual(["noHit", "hit", "noHit"]);
    });
    test("Positions that are outside the range is not hit", function () {
        var PatrolBoat = (0, Ship_1.Ship)("PatrolBoat");
        PatrolBoat.hit(3);
        expect(PatrolBoat.getHits()).toEqual(["noHit", "noHit"]);
        var Battleship = (0, Ship_1.Ship)("Battleship");
        Battleship.hit(10);
        expect(Battleship.getHits()).toStrictEqual([
            "noHit",
            "noHit",
            "noHit",
            "noHit",
        ]);
    });
});
describe("isSunk", function () {
    test("isSunk works correctly", function () {
        var myShip1 = (0, Ship_1.Ship)("Carrier");
        for (var i = 0; i < myShip1.length; i++) {
            myShip1.hit(i);
        }
        expect(myShip1.isSunk()).toBe(true);
        var myShip2 = (0, Ship_1.Ship)("Battleship");
        for (var i = 0; i < myShip2.length; i++) {
            myShip2.hit(i);
        }
        expect(myShip2.isSunk()).toBe(true);
        var myShip3 = (0, Ship_1.Ship)("Destroyer");
        for (var i = 0; i < myShip3.length; i++) {
            myShip3.hit(i);
        }
        expect(myShip3.isSunk()).toBe(true);
        var myShip4 = (0, Ship_1.Ship)("Submarine");
        for (var i = 0; i < myShip4.length; i++) {
            myShip4.hit(i);
        }
        expect(myShip4.isSunk()).toBe(true);
        var myShip5 = (0, Ship_1.Ship)("PatrolBoat");
        for (var i = 0; i < myShip5.length; i++) {
            myShip5.hit(i);
        }
        expect(myShip5.isSunk()).toBe(true);
    });
});
//# sourceMappingURL=Ship.test.js.map