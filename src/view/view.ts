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
    const userBoardUI = this.createDisplayBoard("user", gameBoard);
    this.enablePlaceShips(userBoardUI, gameBoard);
    this.app.append(userBoardUI);
  }

  showUserBoardAgain(gameBoard: IGameboard) {
    const userBoardUI = this.createDisplayBoard("user", gameBoard);
    this.enablePlaceShips(userBoardUI, gameBoard);

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

  enablePlaceShips(gameBoardUI: Element, gameBoard: IGameboard) {
    this.attachListenerToTheCell(gameBoardUI, "click", (e: MouseEvent) => {
      const target = e.target as HTMLDivElement;
      const coordinates: HitCoordinates = {
        x: target.dataset.xCoord as XCoordinates,
        y: Number(target.dataset.yCoord) as YCoordinates,
      };

      let isEnoughSpace = gameBoard.hasEnoughSpace(
        this.getCurrentShip().name,
        coordinates
      );

      let hasNoShip = gameBoard.hasNoShipOnTheCoordinate(
        this.getCurrentShip().name,
        gameBoard.getCoordinates(),
        coordinates
      );

      if (isEnoughSpace && hasNoShip) {
        console.log("you can place the ship");
      } else {
        console.log("You can not place the ship");
      }

      this.placeShip(
        this.getCurrentShip().name,
        { x: coordinates.x, y: coordinates.y },
        gameBoard
      );
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

        let isEnoughSpace = gameBoard.hasEnoughSpace(
          this.getCurrentShip().name,
          coordinates
        );

        let hasNoShip = gameBoard.hasNoShipOnTheCoordinate(
          this.getCurrentShip().name,
          gameBoard.getCoordinates(),
          coordinates
        );

        if (isEnoughSpace && hasNoShip) {
          target.style.cursor = "cell";
          // I first need to grab all the cells that ship will be taking place

          const rowElement = this.getElement("#user").children[coordinates.y];
          const numXCoord = getXCoordNumber(coordinates.x);
          for (let i = 0; i < this.getCurrentShip().length; i++) {
            const cell = rowElement.children[numXCoord + i] as HTMLDivElement;
            cell.style.background = "blue";
          }
        } else {
          target.style.cursor = "not-allowed";
          target.style.background = "grey";
          console.log("X - disable click, grey out them");
        }
      }
    );

    this.attachListenerToTheCell(gameBoardUI, "mouseleave", (e: MouseEvent) => {
      const target = e.currentTarget as HTMLDivElement;
      const coordinates: HitCoordinates = {
        x: target.dataset.xCoord as XCoordinates,
        y: Number(target.dataset.yCoord) as YCoordinates,
      };

      let isEnoughSpace = gameBoard.hasEnoughSpace(
        this.getCurrentShip().name,
        coordinates
      );

      let hasNoShip = gameBoard.hasNoShipOnTheCoordinate(
        this.getCurrentShip().name,
        gameBoard.getCoordinates(),
        coordinates
      );

      if (isEnoughSpace && hasNoShip) {
        const rowElement = this.getElement("#user").children[coordinates.y];
        const numXCoord = getXCoordNumber(coordinates.x);
        for (let i = 0; i < this.getCurrentShip().length; i++) {
          const cell = rowElement.children[numXCoord + i] as HTMLDivElement;
          cell.style.background = "none";
        }
      } else {
        target.style.background = "none";
      }
    });
  }

  placeShip(
    shipName: ShipNames,
    coordinates: HitCoordinates,
    gameBoard: IGameboard
  ) {
    const MAX_SHIP_INDEX = 4;

    gameBoard.placeShip(shipName, coordinates.x, coordinates.y);

    if (this.shipIndex === MAX_SHIP_INDEX) {
      // Now I need to show the userboard
    } else {
      this.shipIndex++;
    }

    this.showUserBoardAgain(gameBoard);
  }

  setNextShipToPlace() {
    this.shipIndex++;
  }

  getUserBoard() {
    return this.userBoard;
  }

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
    const shipNames: ShipNames[] = [
      "Carrier",
      "Battleship",
      "Destroyer",
      "PatrolBoat",
      "Submarine",
    ];
    const coordinates = gameboard.getCoordinates();

    const board = this.createElement("div", "board");
    player === "user"
      ? board.setAttribute("id", "user")
      : board.setAttribute("id", "computer");

    coordinates.forEach((eachRow, rowIndex) => {
      const row = this.createElement("div", "row");
      eachRow.forEach((cell, cellIndex) => {
        const dCell = this.createElement("div");

        const isNotShip = shipNames.every((shipName) => shipName !== cell);
        if (!isNotShip) {
          const shipLetter = this.createElement("span");
          shipLetter.innerText = cell[0];
          dCell.appendChild(shipLetter);
        }

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
