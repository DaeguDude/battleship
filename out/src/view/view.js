"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getClassNameForCell = exports.View = void 0;
// Manipulating the DOM
var Gameboard_1 = require("../model/Gameboard/Gameboard");
var getXCoordChar_1 = require("../utils/getXCoordChar");
var getXCoordNumber_1 = require("../utils/getXCoordNumber");
var View = /** @class */ (function () {
    function View() {
        this.app = this.getElement(".app");
        this.clearDisplay();
        this.header = this.createElement("header", "header");
        this.title = this.createElement("h1", "title");
        this.title.innerText = "BATTLESHIP";
        this.container = this.createElement("div", "container");
        this.header.append(this.title);
        this.userBoard;
        this.ships = [
            { name: "Carrier", length: 5 },
            { name: "Battleship", length: 4 },
            { name: "Destroyer", length: 3 },
            { name: "Submarine", length: 3 },
            { name: "PatrolBoat", length: 2 },
        ];
        this.shipIndex = 0;
        this.currentShip = this.ships[this.shipIndex];
    }
    View.prototype.createElement = function (tag, className) {
        var element = document.createElement(tag);
        if (typeof className === "string") {
            element.classList.add(className);
        }
        if (Array.isArray(className)) {
            className.forEach(function (eachClassName) {
                return element.classList.add(eachClassName);
            });
        }
        return element;
    };
    View.prototype.getElement = function (selector) {
        var element = document.querySelector(selector);
        return element;
    };
    View.prototype.showUserBoard = function (gameBoard) {
        // we are storing userBoard
        this.userBoard = gameBoard;
        var userBoardUI = this.createDisplayBoard("user", gameBoard);
        this.enablePlaceShips(userBoardUI, gameBoard.placeShip);
        this.app.append(userBoardUI);
    };
    View.prototype.showUserBoardAgain = function (gameBoard) {
        var userBoardUI = this.createDisplayBoard("user", gameBoard);
        this.enablePlaceShips(userBoardUI, gameBoard.placeShip);
        var oldUserBoard = this.getElement("#user");
        this.app.replaceChild(userBoardUI, oldUserBoard);
    };
    View.prototype.displayGameStartPage = function (boardOne) {
        var boardToDisplay = this.createDisplayBoard("user", boardOne);
        var shipsContainer = this.createShipsContainer();
        this.container.append(boardToDisplay, shipsContainer);
        this.app.append(this.header, this.container);
    };
    View.prototype.getCurrentShip = function () {
        return this.ships[this.shipIndex];
    };
    View.prototype.enablePlaceShips = function (gameBoardUI, placeShip) {
        var _this = this;
        this.attachListenerToTheCell(gameBoardUI, "click", function (e) {
            var target = e.target;
            var coordinates = {
                x: target.dataset.xCoord,
                y: Number(target.dataset.yCoord),
            };
            var hasEnoughSpaceToPlaceShip = _this.hasEnoughSpaceToPlaceShip(_this.getCurrentShip(), coordinates);
            var isShipExistOnTheCoordinate = _this.isShipExistOnTheCoordinate(coordinates);
            if (hasEnoughSpaceToPlaceShip) {
                console.log("there is enough space, placing the ship!");
                placeShip(_this.getCurrentShip().name, coordinates.x, coordinates.y);
                _this.setNextShipToPlace();
                _this.showUserBoardAgain(_this.userBoard);
            }
            // Check if there is enough space, if not don't let user to place the ship
            // I need to show the gameboard again.
            // I also need to attach all the listeners again
        });
        this.attachListenerToTheCell(gameBoardUI, "mouseenter", 
        // ShowWhetherValidateMove
        function (e) {
            var target = e.currentTarget;
            var coordinates = {
                x: target.dataset.xCoord,
                y: Number(target.dataset.yCoord),
            };
            var hasEnoughSpaceToPlaceShip = _this.hasEnoughSpaceToPlaceShip(_this.getCurrentShip(), coordinates);
            if (hasEnoughSpaceToPlaceShip) {
                target.style.background = "blue";
            }
            else {
                //
                target.style.background = "grey";
                console.log("X - disable click, grey out them");
            }
        });
        this.attachListenerToTheCell(gameBoardUI, "mouseleave", function (e) {
            var target = e.currentTarget;
            target.style.background = "none";
        });
    };
    View.prototype.setNextShipToPlace = function () {
        this.shipIndex++;
    };
    // User can't place the ship if there is already a ship
    // where they are trying to place the ship
    View.prototype.isShipExistOnTheCoordinate = function (hitCoordinate) {
        var shipNames = [
            "Battleship",
            "Carrier",
            "Destroyer",
            "PatrolBoat",
            "Submarine",
        ];
        var userBoard = this.getUserBoard();
        var currentShip = this.getCurrentShip();
        var x = hitCoordinate.x, y = hitCoordinate.y;
        var xCoordNum = (0, getXCoordNumber_1.getXCoordNumber)(x);
        var isNoExistingShip = true;
        for (var i = xCoordNum; i < xCoordNum + currentShip.length; i++) {
            console.log({ x: x, y: y });
            console.log(userBoard.getCoordinates());
            // const cellStatus = userBoard.getCoordinate(x, y);
            // isNoExistingShip = shipNames.every((ship) => ship !== cellStatus);
            // if (isNoExistingShip) {
            //   continue;
            // } else {
            //   break;
            // }
        }
        if (isNoExistingShip) {
            console.log("there is no ship");
        }
        else {
            console.log("there is a ship");
        }
        // I need to calculate if there is existing ship on the coordinates that I am going to
        // place the new ship
        // what status can ship
        // For example it's placed at 5. Ship length is 3
        // You need to check 5, 6, and 7
        // So I need to check XCoordinate 5, 6, 7. And check if it has....any ship names
        // If it has one of ships name....there is...!
    };
    View.prototype.getUserBoard = function () {
        return this.userBoard;
    };
    View.prototype.hasEnoughSpaceToPlaceShip = function (ship, coordinates) {
        var LAST_X_INDEX = 9;
        if ((0, getXCoordNumber_1.getXCoordNumber)(coordinates.x) + (ship.length - 1) > LAST_X_INDEX) {
            return false;
        }
        return true;
    };
    View.prototype.handleClick = function () { };
    View.prototype.attachListenerToTheCell = function (gameBoardUI, eventType, callback) {
        var rows = gameBoardUI.children;
        for (var i = 0; i < rows.length; i++) {
            var cells = rows[i].children;
            for (var j = 0; j < cells.length; j++) {
                var cell = cells[j];
                cell.addEventListener(eventType, callback);
            }
        }
    };
    View.prototype.showBoard = function (gameBoardElem) {
        var board = this.getElement(".board");
        board.parentNode.replaceChild(gameBoardElem, board);
    };
    View.prototype.createEmptyDisplayBoard = function (player) {
        var board = this.createElement("div", "board");
        player === "user"
            ? board.setAttribute("id", "user")
            : board.setAttribute("id", "computer");
        for (var i = 0; i < 10; i++) {
            var row = this.createElement("div", "row");
            for (var j = 0; j < 10; j++) {
                var dCell = this.createElement("div");
                dCell.className = getClassNameForCell("noHit");
                dCell.dataset.xCoord = (0, getXCoordChar_1.getXCoordChar)(j);
                dCell.dataset.yCoord = String(i);
                row.appendChild(dCell);
            }
            board.appendChild(row);
        }
        return board;
    };
    View.prototype.displayBoard = function (gameboard, player) {
        var coordinates = gameboard.getCoordinates();
        if (!this.getElement("#user") || !this.getElement("#computer")) {
            var newDisplayBoard = this.createDisplayBoard(player, gameboard);
            this.container.append(newDisplayBoard);
        }
        // There is already board present
        var board = this.getElement("#".concat(player));
        coordinates.forEach(function (eachRow, rowIndex) {
            var dRow = board.children[rowIndex];
            eachRow.forEach(function (cell, cellIndex) {
                var dCell = dRow.children[cellIndex];
                dCell.className = getClassNameForCell(cell);
            });
        });
    };
    View.prototype.clearDisplay = function () {
        while (this.app.firstChild) {
            this.app.removeChild(this.app.firstChild);
        }
    };
    View.prototype.bindClickCoordinate = function (player, handler) {
        var board = this.getElement("#".concat(player));
        var rows = board.children;
        for (var i = 0; i < rows.length; i++) {
            var row = rows[i];
            var cells = row.children;
            for (var j = 0; j < cells.length; j++) {
                var cell = cells[j];
                cell.addEventListener("click", function (e) {
                    handler(e);
                });
            }
        }
    };
    View.prototype.bindGameboardUpdated = function (callback) {
        this.onGameboardUpdated = callback;
    };
    View.prototype.createDisplayBoard = function (player, gameboard) {
        var _this = this;
        var coordinates = gameboard.getCoordinates();
        var board = this.createElement("div", "board");
        player === "user"
            ? board.setAttribute("id", "user")
            : board.setAttribute("id", "computer");
        coordinates.forEach(function (eachRow, rowIndex) {
            var row = _this.createElement("div", "row");
            eachRow.forEach(function (cell, cellIndex) {
                var dCell = _this.createElement("div");
                dCell.className = getClassNameForCell(cell);
                dCell.dataset.xCoord = (0, getXCoordChar_1.getXCoordChar)(cellIndex);
                dCell.dataset.yCoord = String(rowIndex);
                row.appendChild(dCell);
            });
            board.appendChild(row);
        });
        return board;
    };
    View.prototype.createShipsContainer = function () {
        var container = this.createElement("div", "ships-container");
        for (var i = 0; i < 5; i++) {
            var shipRow = this.createElement("div", "ship-row");
            for (var j = 0; j < 2; j++) {
                // I need to create ship and attach here...
            }
            container.append(shipRow);
        }
        return container;
    };
    return View;
}());
exports.View = View;
function getClassNameForCell(cell) {
    if (cell === "Battleship") {
        return "cell Battleship";
    }
    if (cell === "Carrier") {
        return "cell Carrier";
    }
    if (cell === "Destroyer") {
        return "cell Destroyer";
    }
    if (cell === "PatrolBoat") {
        return "cell PatrolBoat";
    }
    if (cell === "Submarine") {
        return "cell Submarine";
    }
    if (cell === "hit") {
        return "cell hit";
    }
    if (cell === "missed") {
        return "cell missed";
    }
    if (cell === "noHit") {
        return "cell noHit";
    }
}
exports.getClassNameForCell = getClassNameForCell;
function getCurrentShipBeingPlaced(shipCounter) {
    switch (shipCounter) {
        case 0:
            return { name: "Carrier", length: 5 };
        case 1:
            return { name: "Battleship", length: 4 };
        case 2:
            return { name: "Destroyer", length: 3 };
        case 3:
            return { name: "Submarine", length: 3 };
        case 4:
            return { name: "PatrolBoat", length: 2 };
    }
}
function getCurrentShipBeingPlacedUI(gameBoardUI) {
    // No, no, no... I can just check coordinates from the gameBoard!
}
function hasEnoughSpace(shipInfo, coordinates) {
    if ((0, Gameboard_1.checkForEnoughSpace)(shipInfo.length, coordinates.x)) {
        return true;
    }
    return false;
}
// NOTE: ONCE ship is placed, show the gameboard again.
// switch (shipCounter) {
//   case 0:
//     gameBoard.placeShip("Carrier", coordinates.x, coordinates.y);
//     this.showBoard(getBoardToDisplay(gameBoard));
//     shipCounter++;
//     break;
//   case 1:
//     gameBoard.placeShip("Battleship", coordinates.x, coordinates.y);
//     this.showBoard(getBoardToDisplay(gameBoard));
//     shipCounter++;
//     break;
//   case 2:
//     gameBoard.placeShip("Destroyer", coordinates.x, coordinates.y);
//     this.showBoard(getBoardToDisplay(gameBoard));
//     shipCounter++;
//     break;
//   case 3:
//     gameBoard.placeShip("PatrolBoat", coordinates.x, coordinates.y);
//     this.showBoard(getBoardToDisplay(gameBoard));
//     shipCounter++;
//     break;
//   case 4:
//     gameBoard.placeShip("Submarine", coordinates.x, coordinates.y);
//     this.showBoard(getBoardToDisplay(gameBoard));
//     shipCounter++;
//     break;
// }
//# sourceMappingURL=view.js.map