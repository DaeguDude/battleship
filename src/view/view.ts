// Manipulating the DOM
import {
  Gameboard as IGameboard,
  HitCoordinates,
  ShipNames,
  XCoordinates,
  YCoordinates,
} from "../types";
import { Gameboard } from "../types";
import { getFrontPage } from "./frontPage";
import {
  createDisplayBoard as ECreateDisplayBoard,
  getPlacingShipPage,
} from "./placingShipPage";

type ShipInfo = { name: ShipNames; length: number };

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
  currentShip: ShipInfo;
  frontPageHTMLContent: string;
  onPlaceShip: (coordinates: HitCoordinates, ship: ShipNames) => void;

  constructor() {
    this.frontPageHTMLContent = getFrontPage();

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

  showPlacingShipPage(userName: string, gameBoard: Gameboard) {
    const mainOnTheScreen = document.querySelector("main");
    const mainToReplace = getPlacingShipPage(userName, gameBoard);
    mainOnTheScreen.replaceWith(mainToReplace);

    const userBoardUI = document.querySelector(".board") as HTMLDivElement;
    this.addClickEventHandler(userBoardUI);
  }

  addClickEventHandler = (gameBoardUI: HTMLDivElement) => {
    const rows = gameBoardUI.children;
    for (let i = 0; i < rows.length; i++) {
      const cells = rows[i].children;
      for (let j = 0; j < cells.length; j++) {
        const cell = cells[j];
        cell.addEventListener("click", (e) => {
          const target = e.target as HTMLDivElement;
          const coordinates: HitCoordinates = {
            x: target.dataset.xCoord as XCoordinates,
            y: Number(target.dataset.yCoord) as YCoordinates,
          };

          this.onPlaceShip(coordinates, this.getCurrentShip().name);
        });
      }
    }
  };

  bindAddPlayer = (handler: any) => {
    const frontPageHTMLContent = this.frontPageHTMLContent;
    const app = this.getElement(".app");

    const frontPageFragment = document
      .createRange()
      .createContextualFragment(frontPageHTMLContent);

    frontPageFragment
      .querySelector(".start-game-btn")
      .addEventListener("click", (e) => {
        const name = (this.getElement(".user-name") as HTMLInputElement).value;
        handler(name);
      });

    app.appendChild(frontPageFragment);
  };

  updateGameBoard = (gameBoard: IGameboard) => {
    const board = this.getElement(".board");
    const newBoard = ECreateDisplayBoard(gameBoard);
    this.addClickEventHandler(newBoard);
    board.replaceWith(newBoard);

    if (this.areAllShipsPlaced(this.shipIndex)) {
      return console.log("show next page");
    }

    this.shipIndex++;
  };

  areAllShipsPlaced(shipIndex: number) {
    const LAST_ShIP_INDEX = 4;
    if (shipIndex === LAST_ShIP_INDEX) {
      return true;
    }

    return false;
  }

  bindPlaceShip = (
    handler: (coordinates: HitCoordinates, ship: ShipNames) => void
  ) => {
    this.onPlaceShip = handler;
  };

  showEnteringScreen(showNextScreen: (userName: string) => void) {
    const frontPageHTMLContent = this.frontPageHTMLContent;
    const app = this.getElement(".app");

    const frontPageFragment = document
      .createRange()
      .createContextualFragment(frontPageHTMLContent);

    frontPageFragment
      .querySelector(".start-game-btn")
      .addEventListener("click", (e) => {
        const name = (this.getElement(".user-name") as HTMLInputElement).value;
        showNextScreen(name);
      });

    app.appendChild(frontPageFragment);
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

  getCurrentShip() {
    return this.ships[this.shipIndex];
  }

  setNextShipToPlace() {
    this.shipIndex++;
  }
}
