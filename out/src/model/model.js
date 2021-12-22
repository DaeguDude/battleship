"use strict";
// Doesn't invovle any events or DOM Manipulation
Object.defineProperty(exports, "__esModule", { value: true });
exports.Model = void 0;
var Gameboard_1 = require("./Gameboard/Gameboard");
// just storing and modifying data
var Model = /** @class */ (function () {
    function Model() {
        this.userBoard = (0, Gameboard_1.Gameboard)();
        this.computerBoard = (0, Gameboard_1.Gameboard)();
        this.onGameboardChanged;
        // this.user = Player("DGDude", userBoard);
    }
    Model.prototype.bindGameboardChanged = function (callback) {
        this.onGameboardChanged = callback;
    };
    Model.prototype.clickCoordinate = function (e, player) {
        var x = e.currentTarget.dataset.xCoord;
        var y = e.currentTarget.dataset.yCoord;
        if (player === "user") {
            this.userBoard.receiveAttack(x, y);
        }
        if (player === "computer") {
            this.computerBoard.receiveAttack(x, y);
        }
        player === "user"
            ? this.onGameboardChanged(this.userBoard, player)
            : this.onGameboardChanged(this.computerBoard, player);
    };
    return Model;
}());
exports.Model = Model;
//# sourceMappingURL=model.js.map