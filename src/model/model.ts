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

  clickCoordinate(e: any) {
    const x = e.currentTarget.dataset.xCoord;
    const y = e.currentTarget.dataset.yCoord;

    this.userBoard.receiveAttack(x, y);

    this.onGameboardChanged(this.userBoard);
  }
}
