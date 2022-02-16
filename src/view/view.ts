// Manipulating the DOM
import { ValueIteratorTypeGuard } from "lodash";
import {
  CellStatus,
  Gameboard as IGameboard,
  HitCoordinates,
  ShipNames,
  ShipPositionStatus,
  XCoordinates,
  YCoordinates,
} from "../types";
import { Gameboard } from "../types";
import { createDisplayBoardComputer } from "./createDisplayBoard";
import { getFrontPage } from "./frontPage";
import { getMainPage } from "./mainGamePage";
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
  onEveryShipPlaced: any;
  onReceiveAttack: any;
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
    this.addHanlderOnTheCells(userBoardUI, {
      eventType: "click",
      handler: this.placeShipHanlder,
    });
  }

  handleAttack = (e: Event) => {
    const xCoord = (e.target as HTMLDivElement).dataset.xCoord;
    const yCoord = (e.target as HTMLDivElement).dataset.yCoord;

    this.onReceiveAttack({ x: xCoord, y: yCoord });
  };

  addHanlderOnTheCells = (
    gameBoardUI: Element,
    {
      eventType,
      handler,
    }: {
      eventType: string;
      handler: (e: Event) => void;
    }
  ) => {
    const rows = gameBoardUI.children;
    for (let i = 0; i < rows.length; i++) {
      const cells = rows[i].children;
      for (let j = 0; j < cells.length; j++) {
        const cell = cells[j];
        cell.addEventListener(eventType, handler);
      }
    }
  };

  placeShipHanlder = (e: Event) => {
    console.log("placeShipHandler");
    const target = e.target as HTMLDivElement;
    const coordinates: HitCoordinates = {
      x: target.dataset.xCoord as XCoordinates,
      y: Number(target.dataset.yCoord) as YCoordinates,
    };

    this.onPlaceShip(coordinates, this.getCurrentShip().name);
  };

  bindAddPlayer = (handler: any) => {
    const frontPageHTMLContent = this.frontPageHTMLContent;
    const app = this.getElement(".app");

    const frontPageFragment = document
      .createRange()
      .createContextualFragment(frontPageHTMLContent);

    frontPageFragment
      .querySelector(".start-game-btn")
      .addEventListener("click", () => {
        const name = (this.getElement(".user-name") as HTMLInputElement).value;
        handler(name);
      });

    app.appendChild(frontPageFragment);
  };

  updateGameBoard = (gameBoard: IGameboard) => {
    const board = this.getElement(".board");
    const newBoard = ECreateDisplayBoard(gameBoard);
    this.addHanlderOnTheCells(newBoard, {
      eventType: "click",
      handler: this.placeShipHanlder,
    });
    board.replaceWith(newBoard);

    if (this.areAllShipsPlaced(this.shipIndex)) {
      this.onEveryShipPlaced();
    }

    this.shipIndex++;
  };

  updateMainGameBoard = (gameBoard: IGameboard) => {
    // What are the gameBoard status that can be?
    // const noShips: ShipPositionStatus[] = ["hit", "missed", "noHit"];
    // const ships: ShipNames[] = [
    //   "Battleship",
    //   "Carrier",
    //   "Destroyer",
    //   "PatrolBoat",
    //   "Submarine",
    // ];

    // replace old computer board with a new one
    const oldComputerBoard = this.getElement("#computer-board");
    const newComputerBoard = createDisplayBoardComputer(
      gameBoard,
      "computer-board",
      "ml-1"
    );
    this.addHanlderOnTheCells(newComputerBoard, {
      eventType: "click",
      handler: this.handleAttack,
    });

    oldComputerBoard.replaceWith(newComputerBoard);
  };

  showMainGamePage(userBoard: IGameboard, computerBoard: IGameboard) {
    const mainOnTheScreen = document.querySelector("main");
    const mainToReplace = getMainPage(userBoard, computerBoard);
    mainOnTheScreen.replaceWith(mainToReplace);

    // I first need to grap userBoard and computerBoard
    const computerBoardUI = this.getElement("#computer-board");
    this.addHanlderOnTheCells(computerBoardUI, {
      eventType: "click",
      handler: this.handleAttack,
    });

    // And then...add handler on the computerBoard
  }

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

  bindEveryShipPlaced = (handler: any) => {
    this.onEveryShipPlaced = handler;
  };

  bindReceiveAttack = (handler: any) => {
    this.onReceiveAttack = handler;
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
