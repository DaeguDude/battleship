// Manipulating the DOM
import { CellStatus, Gameboard } from "../types";
import { getXCoordChar } from "../utils/getXCoordChar";

export class View {
  app: any;
  userBoard: any;
  computerBoard: any;
  container: any;
  onGameboardUpdated: any;

  constructor() {
    this.app = this.getElement(".app");
    this.container = this.createElement("div", "container");
    this.app.append(this.container);
    this.onGameboardUpdated;
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

  clearBoard() {
    while (this.container.firstChild) {
      this.container.removeChild(this.container.firstChild);
    }
  }

  bindClickCoordinate(
    player: "user" | "computer",
    handler: (event: any, player: "user" | "computer") => void
  ) {
    const board = this.getElement(`#${player}`);
    const rows = board.children;

    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      const cells = row.children;

      for (let j = 0; j < cells.length; j++) {
        const cell = cells[j];
        cell.addEventListener("click", (event: any) => {
          handler(event, player);
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
}

function getClassNameForCell(cell: CellStatus) {
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
