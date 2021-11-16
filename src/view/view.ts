// Manipulating the DOM
import { Gameboard } from "../types";
import { GameboardDisplay } from "./GameboardDisplay";

export class View {
  app: any;
  userBoard: any;
  computerBoard: any;
  container: any;

  constructor() {
    // Set up all the things you need in your view
    this.app = this.getElement(".app");

    this.container = this.createElement("div", "container");

    this.userBoard = GameboardDisplay();
    this.computerBoard = GameboardDisplay();

    this.container.append(this.userBoard, this.computerBoard);
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
    // 으흠...
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
}
