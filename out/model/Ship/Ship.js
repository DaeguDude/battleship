"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ship = void 0;
function Ship(name) {
    var length = getLengthForBoat(name);
    if (!length) {
        throw new Error("We don't have ".concat(name, " named boat"));
    }
    var hits = new Array(length).fill("noHit");
    var hit = function (hitLocation) {
        if (hitLocation >= length) {
            return "You cannot hit outside the range";
        }
        hits = hitReducer(hits, hitLocation);
    };
    var hitReducer = function (hits, hitLocation) {
        var newHits = __spreadArray([], hits, true);
        newHits[hitLocation] = "hit";
        return newHits;
    };
    var isSunk = function () {
        return hits.every(function (position) { return position === "hit"; });
    };
    var getHits = function () {
        return hits;
    };
    return { name: name, length: length, hit: hit, isSunk: isSunk, getHits: getHits };
}
exports.Ship = Ship;
function getLengthForBoat(name) {
    switch (name) {
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
//# sourceMappingURL=Ship.js.map