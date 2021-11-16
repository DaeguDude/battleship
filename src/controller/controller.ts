import { Gameboard } from "../types";

/**
 * @class Controller
 *
 * Links the model and the view
 *
 * @param model
 * @param view
 */
export class Controller {
  model: any;
  view: any;

  constructor(model: any, view: any) {
    this.model = model;
    this.view = view;

    this.onGameboardChanged(this.model.userBoard);

    this.view.bindClickCoordinate(this.handleClickCoordinate);
  }

  onGameboardChanged = (gameboard: Gameboard) => {
    this.view.displayBoard(gameboard);
  };

  // When click on the coordinate...

  // event handler..
  handleClickCoordinate = (e: any) => {
    this.model.clickCoordinate(e);
  };
}
