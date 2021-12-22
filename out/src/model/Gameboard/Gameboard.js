"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Gameboard = exports.checkForEnoughSpace = void 0;
var Ship_1 = require("../Ship/Ship");
var getXCoordNumber_1 = require("../../utils/getXCoordNumber");
function Gameboard() {
    var coordinates = getInitialCoordinates();
    var shipCoordinatesInfo = {};
    var ships = [];
    // const shipNames: ShipNames[] = [
    //   "PatrolBoat",
    //   "Carrier",
    //   "Battleship",
    //   "Destroyer",
    //   "Submarine",
    // ];
    var placeShip = function (shipName, xCoord, yCoord) {
        // Make a ship
        var ship = (0, Ship_1.Ship)(shipName);
        var xCoordNumber = (0, getXCoordNumber_1.getXCoordNumber)(xCoord);
        var specifiedCorodinate = getCoordinate(xCoord, yCoord);
        // I need to check all possible situation, not just same coordinate
        for (var i = xCoordNumber; i < xCoordNumber + ship.length; i++) {
            var coordinate = getCoordinate(xCoord, yCoord);
            // I need to know how to run debugger in the vscode
            if (coordinate !== "hit" &&
                coordinate !== "noHit" &&
                coordinate !== "missed") {
                return "There is already a ship";
            }
        }
        var hasEnoughSpace = checkForEnoughSpace(ship.length, xCoord);
        if (!hasEnoughSpace) {
            throw new Error("not enough space");
        }
        // mark the ship in the coordinate
        var newCoordinates = cloneDeep(coordinates);
        var row = newCoordinates[yCoord];
        for (var i = xCoordNumber; i < xCoordNumber + ship.length; i++) {
            row[i] = ship.name;
        }
        setCoordinates(newCoordinates);
        setShipCoordinatesInfo(ship.name, xCoord, yCoord);
        ships.push(ship);
    };
    var getCoordinates = function () {
        return coordinates;
    };
    var setShipCoordinatesInfo = function (shipName, xCoord, yCoord) {
        var _a;
        shipCoordinatesInfo = __assign(__assign({}, shipCoordinatesInfo), (_a = {}, _a[shipName] = { x: xCoord, y: yCoord }, _a));
    };
    var setCoordinates = function (newCoordinates) {
        coordinates = cloneDeep(newCoordinates);
    };
    var receiveAttack = function (xCoord, yCoord) {
        var newCoordinates = cloneDeep(coordinates);
        var numXCoord = (0, getXCoordNumber_1.getXCoordNumber)(xCoord);
        var ships = [
            "PatrolBoat",
            "Carrier",
            "Battleship",
            "Destroyer",
            "Submarine",
        ];
        if (newCoordinates[yCoord][numXCoord] === "noHit") {
            newCoordinates[yCoord][numXCoord] = "missed";
            setCoordinates(newCoordinates);
            return "success";
        }
        if (ships.includes(newCoordinates[yCoord][numXCoord])) {
            var shipName = newCoordinates[yCoord][numXCoord];
            var foundShip = getShip(shipName);
            var xCoordOfTheShip = shipCoordinatesInfo[shipName]["x"];
            foundShip.hit((0, getXCoordNumber_1.getXCoordNumber)(xCoord) - (0, getXCoordNumber_1.getXCoordNumber)(xCoordOfTheShip));
            newCoordinates[yCoord][numXCoord] = "hit";
            setCoordinates(newCoordinates);
            return "success";
        }
        if (newCoordinates[yCoord][numXCoord] === "hit" ||
            newCoordinates[yCoord][numXCoord] === "missed") {
            return "failure";
        }
    };
    var getCoordinate = function (xCoord, yCoord) {
        var numXCoord = (0, getXCoordNumber_1.getXCoordNumber)(xCoord);
        return coordinates[yCoord][numXCoord];
    };
    var getShip = function (shipName) {
        return ships.find(function (ship) { return ship.name === shipName; });
    };
    var areAllShipsSunk = function () {
        return ships.every(function (ship) { return ship.isSunk(); });
    };
    return {
        placeShip: placeShip,
        getCoordinates: getCoordinates,
        receiveAttack: receiveAttack,
        getCoordinate: getCoordinate,
        getShip: getShip,
        areAllShipsSunk: areAllShipsSunk,
    };
}
exports.Gameboard = Gameboard;
// const updateCoordinates = (
//   oldCoordinates: any,
//   xCoord: XCoordinates,
//   yCoord: YCoordinates,
//   value: any
// ) => {
//   const newCoordinates = Object.assign({}, oldCoordinates);
//   newCoordinates[yCoord][xCoord] = value;
//   return newCoordinates;
// };
function cloneDeep(x) {
    return JSON.parse(JSON.stringify(x));
}
function checkForEnoughSpace(shipLength, xCoord) {
    var xCoordNumber = (0, getXCoordNumber_1.getXCoordNumber)(xCoord);
    if (xCoordNumber + shipLength > 10) {
        return false;
    }
    return true;
}
exports.checkForEnoughSpace = checkForEnoughSpace;
function getInitialCoordinates() {
    var result = [];
    for (var i = 0; i < 10; i++) {
        result.push(new Array(10).fill("noHit"));
    }
    return result;
}
function getShipLength(shipName) {
    switch (shipName) {
        case "Carrier":
            return 5;
        case "Battleship":
            return 4;
        case "Destroyer":
            return 3;
        case "Submarine":
            return 3;
        case "PatrolBoat":
            return 2;
    }
}
//# sourceMappingURL=Gameboard.js.map