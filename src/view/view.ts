// Manipulating the DOM
import { checkForEnoughSpace } from "../model/Gameboard/Gameboard";
import {
  Coordinates,
  Gameboard as IGameboard,
  HitCoordinates,
  ShipNames,
  XCoordinates,
  YCoordinates,
} from "../types";
import { CellStatus, Gameboard } from "../types";
import { getXCoordChar } from "../utils/getXCoordChar";
import { getXCoordNumber } from "../utils/getXCoordNumber";

export class View {
  app: Element;
  container: HTMLElement;
  header: HTMLElement;
  title: HTMLElement;
  shipsContainer: HTMLElement;
  userBoard: IGameboard;
  computerBoard: IGameboard;
  onGameboardUpdated: any;
  ships: { name: ShipNames; length: number }[];
  shipIndex: number;
  currentShip: { name: ShipNames; length: number };

  constructor() {
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

  createElement(tag: string, className?: string | string[]) {
    const element = document.createElement(tag);

    if (typeof className === "string") {
      element.classList.add(className);
    }

    if (Array.isArray(className)) {
      className.forEach((eachClassName) =>
        element.classList.add(eachClassName)
      );
    }

    return element;
  }

  getElement(selector: string) {
    const element = document.querySelector(selector);

    return element;
  }

  showUserBoard(gameBoard: IGameboard) {
    // we are storing userBoard
    this.userBoard = gameBoard;

    const userBoardUI = this.createDisplayBoard("user", gameBoard);

    this.enablePlaceShips(userBoardUI, gameBoard.placeShip);

    this.app.append(userBoardUI);
  }

  showUserBoardAgain(gameBoard: IGameboard) {
    const userBoardUI = this.createDisplayBoard("user", gameBoard);
    this.enablePlaceShips(userBoardUI, gameBoard.placeShip);

    const oldUserBoard = this.getElement("#user");

    this.app.replaceChild(userBoardUI, oldUserBoard);
  }

  displayGameStartPage(boardOne: IGameboard) {
    const boardToDisplay = this.createDisplayBoard("user", boardOne);
    const shipsContainer = this.createShipsContainer();
    this.container.append(boardToDisplay, shipsContainer);

    this.app.append(this.header, this.container);
  }

  getCurrentShip() {
    return this.ships[this.shipIndex];
  }

  enablePlaceShips(
    gameBoardUI: Element,
    placeShip: (
      shipName: ShipNames,
      xCoord: XCoordinates,
      yCoord: YCoordinates
    ) => void
  ) {
    this.attachListenerToTheCell(gameBoardUI, "click", (e: MouseEvent) => {
      const target = e.target as HTMLDivElement;
      const coordinates: HitCoordinates = {
        x: target.dataset.xCoord as XCoordinates,
        y: Number(target.dataset.yCoord) as YCoordinates,
      };

      const hasEnoughSpaceToPlaceShip = this.hasEnoughSpaceToPlaceShip(
        this.getCurrentShip(),
        coordinates
      );

      const isShipExistOnTheCoordinate =
        this.isShipExistOnTheCoordinate(coordinates);

      if (hasEnoughSpaceToPlaceShip) {
        console.log("there is enough space, placing the ship!");
        placeShip(this.getCurrentShip().name, coordinates.x, coordinates.y);
        this.setNextShipToPlace();
        this.showUserBoardAgain(this.userBoard);
      }

      // Check if there is enough space, if not don't let user to place the ship

      // I need to show the gameboard again.
      // I also need to attach all the listeners again
    });

    this.attachListenerToTheCell(
      gameBoardUI,
      "mouseenter",
      // ShowWhetherValidateMove
      (e: MouseEvent) => {
        const target = e.currentTarget as HTMLDivElement;
        const coordinates: HitCoordinates = {
          x: target.dataset.xCoord as XCoordinates,
          y: Number(target.dataset.yCoord) as YCoordinates,
        };

        const hasEnoughSpaceToPlaceShip = this.hasEnoughSpaceToPlaceShip(
          this.getCurrentShip(),
          coordinates
        );

        if (hasEnoughSpaceToPlaceShip) {
          target.style.background = "blue";
        } else {
          //
          target.style.background = "grey";
          console.log("X - disable click, grey out them");
        }
      }
    );

    this.attachListenerToTheCell(gameBoardUI, "mouseleave", (e: MouseEvent) => {
      const target = e.currentTarget as HTMLDivElement;
      target.style.background = "none";
    });
  }

  setNextShipToPlace() {
    this.shipIndex++;
  }

  isShipExistOnTheCoordinate(hitCoordinate: HitCoordinates) {
    const shipNames: ShipNames[] = [
      "Battleship",
      "Carrier",
      "Destroyer",
      "PatrolBoat",
      "Submarine",
    ];

    const userBoard = this.getUserBoard();
    const currentShip = this.getCurrentShip();

    const { x, y } = hitCoordinate;
    const xCoordNum = getXCoordNumber(x);

    let isExistingShip = false;

    // i.e: xCoord: 5, currentShip carrier: 4
    // 5, 6, 7, 8 is what we need to check
    const coordinates = userBoard.getCoordinates();
    for (let i = xCoordNum; i < xCoordNum + currentShip.length; i++) {
      const cellStatus = userBoard.getCoordinate(x, y);
    }

    // I need to calculate if there is existing ship on the coordinates that I am going to
    // place the new ship

    // what status can ship

    // For example it's placed at 5. Ship length is 3
    // You need to check 5, 6, and 7

    // So I need to check XCoordinate 5, 6, 7. And check if it has....any ship names

    // If it has one of ships name....there is...!
  }

  getUserBoard() {
    return this.userBoard;
  }

  hasEnoughSpaceToPlaceShip(
    ship: { name: ShipNames; length: number },
    coordinates: HitCoordinates
  ): boolean {
    const LAST_X_INDEX = 9;

    if (getXCoordNumber(coordinates.x) + (ship.length - 1) > LAST_X_INDEX) {
      return false;
    }

    return true;
  }

  handleClick() {}

  attachListenerToTheCell(
    gameBoardUI: Element,
    eventType: string,
    callback: (e: MouseEvent) => void
  ) {
    const rows = gameBoardUI.children;
    for (let i = 0; i < rows.length; i++) {
      const cells = rows[i].children;
      for (let j = 0; j < cells.length; j++) {
        const cell = cells[j];
        cell.addEventListener(eventType, callback);
      }
    }
  }

  showBoard(gameBoardElem: Element) {
    const board = this.getElement(".board");
    board.parentNode.replaceChild(gameBoardElem, board);
  }

  createEmptyDisplayBoard(player: "user") {
    const board = this.createElement("div", "board");
    player === "user"
      ? board.setAttribute("id", "user")
      : board.setAttribute("id", "computer");

    for (let i = 0; i < 10; i++) {
      const row = this.createElement("div", "row");
      for (let j = 0; j < 10; j++) {
        const dCell = this.createElement("div");
        dCell.className = getClassNameForCell("noHit");
        dCell.dataset.xCoord = getXCoordChar(j);
        dCell.dataset.yCoord = String(i);

        row.appendChild(dCell);
      }
      board.appendChild(row);
    }

    return board;
  }

  displayBoard(gameboard: Gameboard, player: "user" | "computer") {
    const coordinates = gameboard.getCoordinates();

    if (!this.getElement("#user") || !this.getElement("#computer")) {
      const newDisplayBoard = this.createDisplayBoard(player, gameboard);
      this.container.append(newDisplayBoard);
    }

    // There is already board present
    const board = this.getElement(`#${player}`);
    coordinates.forEach((eachRow, rowIndex) => {
      const dRow = board.children[rowIndex];
      eachRow.forEach((cell, cellIndex) => {
        const dCell = dRow.children[cellIndex];
        dCell.className = getClassNameForCell(cell);
      });
    });
  }

  clearDisplay() {
    while (this.app.firstChild) {
      this.app.removeChild(this.app.firstChild);
    }
  }

  bindClickCoordinate(
    player: "user" | "computer",
    handler: (event: any) => void
  ) {
    const board = this.getElement(`#${player}`);
    const rows = board.children;

    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      const cells = row.children;

      for (let j = 0; j < cells.length; j++) {
        const cell = cells[j];
        cell.addEventListener("click", (e: any) => {
          handler(e);
        });
      }
    }
  }

  bindGameboardUpdated(callback: any) {
    this.onGameboardUpdated = callback;
  }

  createDisplayBoard(player: "user" | "computer", gameboard: Gameboard) {
    const coordinates = gameboard.getCoordinates();

    const board = this.createElement("div", "board");
    player === "user"
      ? board.setAttribute("id", "user")
      : board.setAttribute("id", "computer");

    coordinates.forEach((eachRow, rowIndex) => {
      const row = this.createElement("div", "row");
      eachRow.forEach((cell, cellIndex) => {
        const dCell = this.createElement("div");
        dCell.className = getClassNameForCell(cell);
        dCell.dataset.xCoord = getXCoordChar(cellIndex);
        dCell.dataset.yCoord = String(rowIndex);

        row.appendChild(dCell);
      });

      board.appendChild(row);
    });

    return board;
  }

  createShipsContainer() {
    const container = this.createElement("div", "ships-container");
    for (let i = 0; i < 5; i++) {
      const shipRow = this.createElement("div", "ship-row");
      for (let j = 0; j < 2; j++) {
        // I need to create ship and attach here...
      }

      container.append(shipRow);
    }

    return container;
  }
}

export function getClassNameForCell(cell: CellStatus) {
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

interface IShipInfo {
  name: ShipNames;
  length: 2 | 3 | 4 | 5;
}

function getCurrentShipBeingPlaced(shipCounter: number): IShipInfo {
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

function getCurrentShipBeingPlacedUI(gameBoardUI: Element) {
  // No, no, no... I can just check coordinates from the gameBoard!
}

function hasEnoughSpace(shipInfo: IShipInfo, coordinates: HitCoordinates) {
  if (checkForEnoughSpace(shipInfo.length, coordinates.x)) {
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
