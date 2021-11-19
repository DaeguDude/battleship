// Doesn't invovle any events or DOM Manipulation

import { Gameboard as IGameboard } from "../types";
import { Gameboard } from "./Gameboard/Gameboard";

// just storing and modifying data
export class Model {
  userBoard: IGameboard;
  computerBoard: IGameboard;
  onGameboardChanged: any;

  constructor() {
    this.userBoard = Gameboard();
    this.computerBoard = Gameboard();
    this.onGameboardChanged;

    // this.user = Player("DGDude", userBoard);
  }

  bindGameboardChanged(callback: any) {
    this.onGameboardChanged = callback;
  }

  clickCoordinate(e: any, player: "user" | "computer") {
    const x = e.currentTarget.dataset.xCoord;
    const y = e.currentTarget.dataset.yCoord;

    if (player === "user") {
      this.userBoard.receiveAttack(x, y);
    }

    if (player === "computer") {
      this.computerBoard.receiveAttack(x, y);
    }

    player === "user"
      ? this.onGameboardChanged(this.userBoard, player)
      : this.onGameboardChanged(this.computerBoard, player);
  }
}
