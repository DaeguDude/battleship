// Manipulating the DOM
import { Gameboard as IGameboard } from "../types";
import { CellStatus, Gameboard } from "../types";
import { getXCoordChar } from "../utils/getXCoordChar";

export class View {
  app: Element;
  container: HTMLElement;
  header: HTMLElement;
  title: HTMLElement;
  shipsContainer: HTMLElement;
  userBoard: any;
  computerBoard: any;
  onGameboardUpdated: any;

  constructor() {
    this.app = this.getElement(".app");
    this.clearDisplay();

    this.header = this.createElement("header", "header");
    this.title = this.createElement("h1", "title");
    this.title.innerText = "BATTLESHIP";
    this.container = this.createElement("div", "container");
    this.header.append(this.title);
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

  displayGameStartPage(boardOne: IGameboard) {
    const boardToDisplay = this.createNewDisplayBoard("user", boardOne);
    const shipsContainer = this.createShipsContainer();
    this.container.append(boardToDisplay, shipsContainer);

    this.app.append(this.header, this.container);
  }

  enablePlaceShips() {
    const userBoard = this.createEmptyDisplayBoard("user");
    const appContainer = this.getElement(".app");

    const rows = userBoard.children;
    for (let i = 0; i < rows.length; i++) {
      const cells = rows[i].children;
      for (let j = 0; j < cells.length; j++) {
        const cell = cells[j];
        cell.addEventListener("mouseover", () => {
          // I need some coding effect that can show it is being hovered
          // I need to make it hoverable.
        });
      }
    }

    Array.from(userBoard.children);
    console.log(userBoard.children);

    appContainer.append(userBoard);

    // Now I need to....enable place ships.
    // Make this hoverable
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
      const newDisplayBoard = this.createNewDisplayBoard(player, gameboard);
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

  createNewDisplayBoard(player: "user" | "computer", gameboard: Gameboard) {
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

function getClassNameForCell(cell: CellStatus) {
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
