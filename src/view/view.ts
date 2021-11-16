// Manipulating the DOM
import { Gameboard } from "../types";

export class View {
  app: any;
  userBoard: any;
  computerBoard: any;
  container: any;

  constructor() {
    // Set up all the things you need in your view
    this.app = this.getElement(".app");
    this.container = this.createElement("div", "container");
    this.app.append(this.container);
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
    const coordinates = gameboard.getCoordinates();
    const board = this.createElement("div", "board");

    coordinates.forEach((eachRow) => {
      const row = this.createElement("div", "row");
      eachRow.forEach((cell) => {
        let className: string;
        if (cell === "hit") {
          className = "hit";
        } else if (cell === "missed") {
          className = "missed";
        } else if (cell === "noHit") {
          className = "noHit";
        }
        const dCell = this.createElement("div", ["cell", className]);
        row.appendChild(dCell);
      });

      board.appendChild(row);
    });

    this.container.append(board);
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
}
