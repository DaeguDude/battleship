"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = void 0;
var Player = function (name, enemyBoard) {
    var _name = name;
    var _enemyBoard = enemyBoard;
    var hit = function (coordinates) {
        if (_name === "computer") {
            while (true) {
                var xCoord = getRandomXCoordinate();
                var yCoord = getRandomYCoordinate();
                // Try to
                var specifiedCoordinate = _enemyBoard.getCoordinate(xCoord, yCoord);
                // 만약... 'missed'가 아니고 'hit'이 아닐시에만...break
                if (specifiedCoordinate !== "missed" && specifiedCoordinate !== "hit") {
                    _enemyBoard.receiveAttack(xCoord, yCoord);
                    break;
                }
            }
            return;
        }
        if (coordinates !== undefined) {
            var hitResult = _enemyBoard.receiveAttack(coordinates.x, coordinates.y);
            if (hitResult === "failure") {
                return "failure";
            }
            return "success";
        }
    };
    return { name: name, hit: hit };
};
exports.Player = Player;
function getRandomXCoordinate() {
    var xCoords = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"];
    var randNum = getRandomIntInclusive(0, 9);
    return xCoords[randNum];
}
function getRandomYCoordinate() {
    return getRandomIntInclusive(0, 9);
}
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}
//# sourceMappingURL=Player.js.map