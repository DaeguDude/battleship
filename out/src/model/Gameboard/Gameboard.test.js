"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Gameboard_1 = require("./Gameboard");
describe("PlaceShip", function () {
    test("Placed the right ship", function () {
        var myGameBoard = (0, Gameboard_1.Gameboard)();
        myGameBoard.placeShip("PatrolBoat", "c", 2);
        var patrolBoatLength = 2;
        var coordinates = myGameBoard.getCoordinates();
        var ThirdRow = coordinates[2];
        expect(ThirdRow.slice(2, 2 + patrolBoatLength)).toEqual([
            "PatrolBoat",
            "PatrolBoat",
        ]);
    });
    test("Coordinates exist, but not enough space", function () {
        var myGameBoard = (0, Gameboard_1.Gameboard)();
        expect(function () {
            myGameBoard.placeShip("PatrolBoat", "j", 0);
        }).toThrow("not enough space");
        expect(function () {
            myGameBoard.placeShip("Destroyer", "i", 0);
        }).toThrow("not enough space");
    });
    test.only("There is already a boat, can't place the ship", function () {
        var myGameBoard = (0, Gameboard_1.Gameboard)();
        // // Placing on the Same Coordinate
        // myGameBoard.placeShip("PatrolBoat", "a", 0);
        // myGameBoard.placeShip("Submarine", "a", 0);
        // expect(myGameBoard.getCoordinate("a", 0)).toBe("PatrolBoat");
        // Overlap situation
        myGameBoard.placeShip("Carrier", "f", 9);
        myGameBoard.placeShip("Battleship", "d", 9);
        expect(myGameBoard.getCoordinate("f", 9)).toBe("Carrier");
        // // Overlap situation
        // myGameBoard.placeShip("Submarine", "c", 1);
        // myGameBoard.placeShip("PatrolBoat", "b", 1);
        // expect(myGameBoard.getCoordinate("c", 1)).toBe("Submarine");
    });
    test("Can't place the ship if some of coordinate overlaps ", function () {
        var myGameBoard = (0, Gameboard_1.Gameboard)();
        myGameBoard.placeShip("Destroyer", "a", 0);
        myGameBoard.placeShip("Submarine", "c", 0);
        expect(myGameBoard.getCoordinate("c", 0)).toBe("Destroyer");
        expect(myGameBoard.getCoordinate("d", 0)).toBe("noHit");
        expect(myGameBoard.getCoordinate("d", 0)).not.toBe("Submarine");
        expect(myGameBoard.getCoordinate("d", 0)).toBe("noHit");
        expect(myGameBoard.getCoordinate("e", 0)).not.toBe("Submarine");
    });
});
describe("ReceiveAttack", function () {
    test("mark missed shot", function () {
        var myGameBoard = (0, Gameboard_1.Gameboard)();
        myGameBoard.receiveAttack("b", 2);
        expect(myGameBoard.getCoordinate("b", 2)).toBe("missed");
        myGameBoard.receiveAttack("i", 5);
        expect(myGameBoard.getCoordinate("i", 5)).toBe("missed");
    });
    test("mark hit", function () {
        var myGameBoard = (0, Gameboard_1.Gameboard)();
        myGameBoard.placeShip("PatrolBoat", "b", 0);
        myGameBoard.receiveAttack("b", 0);
        expect(myGameBoard.getCoordinate("b", 0)).toBe("hit");
        myGameBoard.placeShip("Destroyer", "c", 4);
        myGameBoard.receiveAttack("d", 4);
        expect(myGameBoard.getCoordinate("d", 4)).toBe("hit");
    });
    test("Check if it sends the hit function to the correct ship", function () {
        var myGameBoard = (0, Gameboard_1.Gameboard)();
        myGameBoard.placeShip("PatrolBoat", "b", 0);
        myGameBoard.receiveAttack("b", 0);
        myGameBoard.receiveAttack("c", 0);
        var patrolBoat = myGameBoard.getShip("PatrolBoat");
        var positions = patrolBoat.getHits();
        expect(positions[0]).toBe("hit");
        expect(positions[1]).toBe("hit");
    });
    test("return 'failure' if specified coordinate was already shot", function () {
        var myGameBoard = (0, Gameboard_1.Gameboard)();
        myGameBoard.placeShip("PatrolBoat", "b", 0);
        myGameBoard.receiveAttack("b", 0);
        expect(myGameBoard.receiveAttack("b", 0)).toBe("failure");
    });
});
describe("AreAllShipsSunk", function () {
    test("Check if all ships are sunk", function () {
        var myGameboard = (0, Gameboard_1.Gameboard)();
        myGameboard.placeShip("Carrier", "a", 0);
        myGameboard.receiveAttack("a", 0);
        myGameboard.receiveAttack("b", 0);
        myGameboard.receiveAttack("c", 0);
        myGameboard.receiveAttack("d", 0);
        myGameboard.receiveAttack("e", 0);
        myGameboard.placeShip("Battleship", "a", 1);
        myGameboard.receiveAttack("a", 1);
        myGameboard.receiveAttack("b", 1);
        myGameboard.receiveAttack("c", 1);
        myGameboard.receiveAttack("d", 1);
        myGameboard.placeShip("Destroyer", "a", 2);
        myGameboard.receiveAttack("a", 2);
        myGameboard.receiveAttack("b", 2);
        myGameboard.receiveAttack("c", 2);
        myGameboard.placeShip("Submarine", "a", 3);
        myGameboard.receiveAttack("a", 3);
        myGameboard.receiveAttack("b", 3);
        myGameboard.receiveAttack("c", 3);
        myGameboard.placeShip("PatrolBoat", "a", 4);
        myGameboard.receiveAttack("a", 4);
        myGameboard.receiveAttack("b", 4);
        expect(myGameboard.areAllShipsSunk()).toBe(true);
    });
});
//# sourceMappingURL=Gameboard.test.js.map