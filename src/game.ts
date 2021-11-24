import { Gameboard } from "./model/Gameboard/Gameboard";
import { Player } from "./model/Player/Player";
import "./style/style.css";
import { Gameboard as IGameboard, Player as IPlayer } from "./types";
import { View } from "./view/view";

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

    this.currentPlayer = "user";

    this.startGame();
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

    this.user.hit({ x, y });
    this.view.displayBoard(this.computerBoard, "computer");

    this.changeTurn();
    this.computerHits();

    // NOTE: There is a little bug, which is when I click on the coordinate that
    // has been clicked, it still counts as an attack, and computer hits the coordinate
    // of the userboard. It shouldn't hit the userBoard when attack was failure
  };

  computerHits = () => {
    this.computer.hit();
    this.view.displayBoard(this.userBoard, "user");
  };
}
