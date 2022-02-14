import { Gameboard } from "./model/Gameboard/Gameboard";
import { Model } from "./model/model";
import { Player } from "./model/Player/Player";
import "./style/style.css";
import {
  Gameboard as IGameboard,
  HitCoordinates,
  Player as IPlayer,
  ShipNames,
} from "./types";
import { View } from "./view/view";

export class Game {
  view: InstanceType<typeof View>;
  model: InstanceType<typeof Model>;
  user: IPlayer;

  // computer: IPlayer;
  // userBoard: IGameboard;
  // computerBoard: IGameboard;
  // currentPlayer: "user" | "computer";

  constructor(
    view: InstanceType<typeof View>,
    model: InstanceType<typeof Model>
  ) {
    this.view = view;
    this.model = model;
  }

  onPlayerAdded = (userName: string, gameBoard: IGameboard) => {
    this.view.showPlacingShipPage(userName, gameBoard);
  };

  onShipPlaced = (gameBoard: IGameboard) => {
    this.view.updateGameBoard(gameBoard);
  };

  onReceivedAttack = () => {
    console.log("Controller: Computerboard should be updated");
    this.view.updateMainGameBoard(this.model.computerBoard);
  };

  onEveryShipPlaced = () => {
    const userBoard = this.model.userBoard;
    const computerBoard = this.model.computerBoard;

    this.view.showMainGamePage(userBoard, computerBoard);
  };

  handleReceiveAttack = (coordinates: HitCoordinates) => {
    this.model.receiveAttack(coordinates);
  };

  handlePlaceShip = (coordinates: HitCoordinates, ship: ShipNames) => {
    this.model.placeShip("user", coordinates, ship);
  };

  showUserBoardToPlaceTheShip = (userName: string) => {};

  handleAddPlayer = (userName: string) => {
    console.log("Controller - handleAddPlayer ");
    // I need to call add player from model
    this.model.addPlayer(userName);
  };

  start() {
    this.view.bindAddPlayer(this.handleAddPlayer);
    this.model.bindPlayerAdded(this.onPlayerAdded);

    // View 한테, place ship을 할 때 사용할 핸들러를 주어야함
    this.view.bindPlaceShip(this.handlePlaceShip);
    this.model.bindShipPlaced(this.onShipPlaced);

    //
    this.view.bindEveryShipPlaced(this.onEveryShipPlaced);

    // When received attack...
    this.view.bindReceiveAttack(this.handleReceiveAttack);
    this.model.bindReceivedAttack(this.onReceivedAttack);
  }
}
