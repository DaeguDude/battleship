import { Gameboard } from "../types";

export class Controller {
  model: any;
  view: any;

  constructor(model: any, view: any) {
    this.model = model;
    this.view = view;

    this.onGameboardChanged(this.model.userBoard);
  }

  onGameboardChanged = (gameboard: Gameboard) => {
    this.view.displayBoard(gameboard);
  };
}
