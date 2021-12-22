"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Gameboard_1 = require("../Gameboard/Gameboard");
var Player_1 = require("./Player");
describe("Player", function () {
    test("Player misses the shot", function () {
        var enemyBoard = (0, Gameboard_1.Gameboard)();
        var player = (0, Player_1.Player)("Sanghak", enemyBoard);
        var coordinates = {
            x: "c",
            y: 3,
        };
        player.hit(coordinates);
        expect(enemyBoard.getCoordinate("c", 3)).toBe("missed");
    });
    test("Player hits the ship", function () {
        var enemyBoard = (0, Gameboard_1.Gameboard)();
        var player = (0, Player_1.Player)("Sanghak", enemyBoard);
        var coordinates = {
            x: "c",
            y: 3,
        };
        enemyBoard.placeShip("Battleship", coordinates.x, coordinates.y);
        player.hit(coordinates);
        expect(enemyBoard.getCoordinate("c", 3)).toBe("hit");
    });
    test("return 'success' if hit was success", function () {
        var enemyBoard = (0, Gameboard_1.Gameboard)();
        enemyBoard.placeShip("Carrier", "c", 3);
        var player = (0, Player_1.Player)("Sanghak", enemyBoard);
        expect(player.hit({ x: "c", y: 3 })).toBe("success");
    });
    test("return 'failure' if hit was failed", function () {
        var enemyBoard = (0, Gameboard_1.Gameboard)();
        enemyBoard.placeShip("Carrier", "c", 3);
        var player = (0, Player_1.Player)("Sanghak", enemyBoard);
        player.hit({ x: "c", y: 3 });
        expect(player.hit({ x: "c", y: 3 })).toBe("failure");
    });
});
describe("computer player", function () {
    test("computer misses the shot", function () {
        var enemyBoard = (0, Gameboard_1.Gameboard)();
        var player = (0, Player_1.Player)("computer", enemyBoard);
        player.hit();
        var coordinates = enemyBoard.getCoordinates();
        var hasMissed = false;
        for (var i = 0; i < coordinates.length; i++) {
            var row = coordinates[i];
            if (row.includes("missed")) {
                hasMissed = true;
                break;
            }
        }
        expect(hasMissed).toBe(true);
    });
    test("computer hits the ship", function () {
        var enemyBoard = (0, Gameboard_1.Gameboard)();
        var player = (0, Player_1.Player)("computer", enemyBoard);
        enemyBoard.placeShip("Carrier", "a", 0);
        enemyBoard.placeShip("Carrier", "a", 1);
        enemyBoard.placeShip("Carrier", "a", 2);
        enemyBoard.placeShip("Carrier", "a", 3);
        enemyBoard.placeShip("Carrier", "a", 4);
        for (var i = 0; i < 100; i++) {
            player.hit();
        }
        expect(enemyBoard.getCoordinate("a", 0)).toBe("hit");
        expect(enemyBoard.getCoordinate("a", 1)).toBe("hit");
        expect(enemyBoard.getCoordinate("a", 2)).toBe("hit");
        expect(enemyBoard.getCoordinate("a", 3)).toBe("hit");
        expect(enemyBoard.getCoordinate("a", 4)).toBe("hit");
    });
});
//# sourceMappingURL=Player.test.js.map