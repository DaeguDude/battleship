import { Gameboard } from "./model/Gameboard/Gameboard";
import { Player } from "./model/Player/Player";
import "./style/style.css";
import { Gameboard as IGameboard, Player as IPlayer } from "./types";
import { View } from "./view/view";

// NOTE: It's time for me to let users place their ships using drag and drop api.
// So I need to look into a drag and drop api
export class Game {
  view: any;
  user: IPlayer;
  computer: IPlayer;
  userBoard: IGameboard;
  computerBoard: IGameboard;
  currentPlayer: "user" | "computer";

  constructor() {
    this.view = new View();
    this.userBoard = Gameboard();
    this.computerBoard = Gameboard();
    this.user = Player("user", this.computerBoard);
    this.computer = Player("computer", this.userBoard);

    this.userPlaceShips();

    this.currentPlayer = "user";
    // this.startGame();
  }

  userPlaceShips() {
    this.view.enablePlaceShips();
    // User should be able to place ships now.
    // How? With a click of mouse
    // Okay. Then it should be some sort of event listeners?
  }

  // It should alternate turn
  changeTurn() {
    if (this.currentPlayer === "user") {
      return (this.currentPlayer = "computer");
    }

    return (this.currentPlayer = "user");
  }

  startGame() {
    this.userBoard.placeShip("Battleship", "b", 0);
    this.userBoard.placeShip("Carrier", "a", 1);
    this.userBoard.placeShip("Destroyer", "e", 2);
    this.userBoard.placeShip("PatrolBoat", "d", 3);
    this.userBoard.placeShip("Submarine", "f", 4);

    this.view.displayGameStartPage(this.userBoard);

    this.computerBoard.placeShip("Destroyer", "a", 0);
    this.computerBoard.placeShip("Submarine", "c", 1);
    this.computerBoard.placeShip("Carrier", "b", 2);
    this.computerBoard.placeShip("PatrolBoat", "a", 3);
    this.computerBoard.placeShip("Battleship", "d", 4);

    this.view.displayBoard(this.computerBoard, "computer");
    this.view.bindClickCoordinate("computer", this.handleReceiveAttack);
  }

  handleReceiveAttack = (e: any) => {
    const x = e.currentTarget.dataset.xCoord;
    const y = e.currentTarget.dataset.yCoord;

    const hitResult = this.user.hit({ x, y });
    if (hitResult === "success") {
      this.view.displayBoard(this.computerBoard, "computer");
      const isComputerShipsAllSunk = this.checkAllShipsSunk(this.computerBoard);

      if (isComputerShipsAllSunk) {
        alert("user wins");
        this.reset();
      } else {
        this.changeTurn();
        this.computerHits();
        const isUserShipsAllSunk = this.checkAllShipsSunk(this.userBoard);

        if (isUserShipsAllSunk) {
          alert("computer wins");
          this.reset();
        }
      }
    }
  };

  checkAllShipsSunk = (gameBoard: IGameboard): boolean => {
    if (gameBoard.areAllShipsSunk()) {
      return true;
    }

    return false;
  };

  reset = () => {
    this.view = new View();
    this.userBoard = Gameboard();
    this.computerBoard = Gameboard();
    this.user = Player("user", this.computerBoard);
    this.computer = Player("computer", this.userBoard);

    this.currentPlayer = "user";
    this.startGame();
  };

  computerHits = () => {
    this.computer.hit();
    this.view.displayBoard(this.userBoard, "user");
  };
}
