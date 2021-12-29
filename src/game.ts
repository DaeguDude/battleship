import { Gameboard } from "./model/Gameboard/Gameboard";
import { Player } from "./model/Player/Player";
import "./style/style.css";
import { Gameboard as IGameboard, Player as IPlayer } from "./types";
import { View } from "./view/view";

export class Game {
  view: InstanceType<typeof View>;
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

    this.start();
    this.currentPlayer = "user";
  }

  start() {
    this.view.showUserBoard(this.userBoard);
  }
}
