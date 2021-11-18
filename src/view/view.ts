// Manipulating the DOM
import { Gameboard } from "../types";

export class View {
  app: any;
  userBoard: any;
  computerBoard: any;
  container: any;
  onGameboardUpdated: any;

  constructor() {
    // Set up all the things you need in your view
    this.app = this.getElement(".app");
    this.container = this.createElement("div", "container");
    this.app.append(this.container);
    this.onGameboardUpdated;
  }

  // Create an element with an optional CSS class
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

  displayBoard(gameboard: Gameboard) {
    this.clearBoard();

    const coordinates = gameboard.getCoordinates();
    const board = this.createElement("div", "board");

    coordinates.forEach((eachRow, rowIndex) => {
      const row = this.createElement("div", "row");
      eachRow.forEach((cell, cellIndex) => {
        let className: string;
        if (cell === "hit") {
          className = "hit";
        } else if (cell === "missed") {
          className = "missed";
        } else if (cell === "noHit") {
          className = "noHit";
        }
        const dCell = this.createElement("div", ["cell", className]);
        dCell.dataset.xCoord = getXCoordChar(cellIndex);
        dCell.dataset.yCoord = String(rowIndex);

        row.appendChild(dCell);
      });

      board.appendChild(row);
    });

    this.container.append(board);

    this.onGameboardUpdated();
  }

  clearBoard() {
    while (this.container.firstChild) {
      this.container.removeChild(this.container.firstChild);
    }
  }

  bindClickCoordinate(handler: (event: any) => void) {
    const userBoard = this.getElement(".board");
    const rows = userBoard.children;

    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      const cells = row.children;

      for (let j = 0; j < cells.length; j++) {
        const cell = cells[j];
        cell.addEventListener("click", (event: any) => {
          handler(event);
        });
      }
    }
  }

  bindGameboardUpdated(callback: any) {
    this.onGameboardUpdated = callback;
  }
}

function getXCoordChar(num: number): string {
  switch (num) {
    case 0:
      return "a";
    case 1:
      return "b";
    case 2:
      return "c";
    case 3:
      return "d";
    case 4:
      return "e";
    case 5:
      return "f";
    case 6:
      return "g";
    case 7:
      return "h";
    case 8:
      return "i";
    case 9:
      return "j";
  }
}
