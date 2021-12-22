"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
var Gameboard_1 = require("./model/Gameboard/Gameboard");
var Player_1 = require("./model/Player/Player");
require("./style/style.css");
var view_1 = require("./view/view");
var Game = /** @class */ (function () {
    function Game() {
        var _this = this;
        this.handleReceiveAttack = function (e) {
            var x = e.currentTarget.dataset.xCoord;
            var y = e.currentTarget.dataset.yCoord;
            var hitResult = _this.user.hit({ x: x, y: y });
            if (hitResult === "success") {
                _this.view.displayBoard(_this.computerBoard, "computer");
                var isComputerShipsAllSunk = _this.checkAllShipsSunk(_this.computerBoard);
                if (isComputerShipsAllSunk) {
                    alert("user wins");
                    _this.reset();
                }
                else {
                    _this.changeTurn();
                    _this.computerHits();
                    var isUserShipsAllSunk = _this.checkAllShipsSunk(_this.userBoard);
                    if (isUserShipsAllSunk) {
                        alert("computer wins");
                        _this.reset();
                    }
                }
            }
        };
        this.checkAllShipsSunk = function (gameBoard) {
            if (gameBoard.areAllShipsSunk()) {
                return true;
            }
            return false;
        };
        this.reset = function () {
            _this.view = new view_1.View();
            _this.userBoard = (0, Gameboard_1.Gameboard)();
            _this.computerBoard = (0, Gameboard_1.Gameboard)();
            _this.user = (0, Player_1.Player)("user", _this.computerBoard);
            _this.computer = (0, Player_1.Player)("computer", _this.userBoard);
            _this.currentPlayer = "user";
            _this.startGame();
        };
        this.computerHits = function () {
            _this.computer.hit();
            _this.view.displayBoard(_this.userBoard, "user");
        };
        this.view = new view_1.View();
        this.userBoard = (0, Gameboard_1.Gameboard)();
        this.computerBoard = (0, Gameboard_1.Gameboard)();
        this.user = (0, Player_1.Player)("user", this.computerBoard);
        this.computer = (0, Player_1.Player)("computer", this.userBoard);
        // this.userPlaceShips();
        this.start();
        this.currentPlayer = "user";
        // this.startGame();
    }
    Game.prototype.start = function () {
        this.view.showUserBoard(this.userBoard);
    };
    Game.prototype.userPlaceShips = function () {
        // I should pass placeships of game.
        // this.view.enablePlaceShips(this.userBoard);
        // User should be able to place ships now.
        // How? With a click of mouse
        // Okay. Then it should be some sort of event listeners?
    };
    // It should alternate turn
    Game.prototype.changeTurn = function () {
        if (this.currentPlayer === "user") {
            return (this.currentPlayer = "computer");
        }
        return (this.currentPlayer = "user");
    };
    Game.prototype.startGame = function () {
        this.userBoard.placeShip("Battleship", "b", 0);
        this.userBoard.placeShip("Carrier", "a", 1);
        this.userBoard.placeShip("Destroyer", "e", 2);
        this.userBoard.placeShip("PatrolBoat", "d", 3);
        this.userBoard.placeShip("Submarine", "f", 4);
        this.view.displayGameStartPage(this.userBoard);
        this.computerBoard.placeShip("Destroyer", "a", 0);
        this.computerBoard.placeShip("Submarine", "c", 1);
        this.computerBoard.placeShip("Carrier", "b", 2);
        this.computerBoard.placeShip("PatrolBoat", "a", 3);
        this.computerBoard.placeShip("Battleship", "d", 4);
        this.view.displayBoard(this.computerBoard, "computer");
        this.view.bindClickCoordinate("computer", this.handleReceiveAttack);
    };
    return Game;
}());
exports.Game = Game;
//# sourceMappingURL=game.js.map