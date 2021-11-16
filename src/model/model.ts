// Doesn't invovle any events or DOM Manipulation

import { Gameboard as IGameboard } from "../types";
import { Gameboard } from "./Gameboard/Gameboard";

// just storing and modifying data
export class Model {
  userBoard: IGameboard;
  computerBoard: IGameboard;

  constructor() {
    this.userBoard = Gameboard();
    this.computerBoard = Gameboard();

    // this.user = Player("DGDude", userBoard);
  }

  clickCoordinate(event: any) {
    console.log(event);
    console.log("Model is responding...I should update something here");
  }
}
