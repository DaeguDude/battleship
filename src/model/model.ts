// Doesn't invovle any events or DOM Manipulation

import {
  Coordinates,
  Gameboard as IGameboard,
  HitCoordinates,
  Player as IPlayer,
  ShipNames,
} from "../types";
import { Gameboard } from "./Gameboard/Gameboard";
import { Player } from "./Player/Player";

// just storing and modifying data
export class Model {
  userBoard: IGameboard;
  computerBoard: IGameboard;
  onShipPlaced: any;
  onPlayerAdded: any;
  playerOne: IPlayer;
  playerTwo: IPlayer;
  playerName: string;

  constructor() {
    this.playerOne;
    this.playerTwo;
    this.userBoard = Gameboard();
    this.computerBoard = Gameboard();
    this.playerName = "";
  }

  // _commit(gameboard: IGameboard) {
  //   this.onGameBoardUpdated(gameboard);
  // }

  placeShip(
    player: "user" | "computer",
    coordinates: HitCoordinates,
    ship: ShipNames
  ) {
    if (!this.userBoard.hasEnoughSpace(ship, coordinates)) {
      console.log("no enough space");
      return;
    }

    if (
      !this.userBoard.hasNoShipOnTheCoordinate(
        ship,
        this.userBoard.getCoordinates(),
        coordinates
      )
    ) {
      console.log("there is a ship along the coordinates");
      return;
    }

    // First, I need to place the ship.
    this.userBoard.placeShip(ship, coordinates.x, coordinates.y);

    // Next, I need to tell controller to update the board
    this.onShipPlaced(this.userBoard);
  }

  bindPlayerAdded = (callback: any) => {
    this.onPlayerAdded = callback;
  };

  bindShipPlaced = (callback: any) => {
    this.onShipPlaced = callback;
  };

  addPlayer(userName: string) {
    console.log("model - addPlayer");
    this.playerName = userName;
    this.onPlayerAdded(userName, this.userBoard);
  }

  // createPlayer(userName: string) {
  //   this.playerOne = Player("")
  // }

  // bindGameboardChanged(callback: any) {
  //   this.onGameboardChanged = callback;
  // }

  // clickCoordinate(e: any, player: "user" | "computer") {
  //   const x = e.currentTarget.dataset.xCoord;
  //   const y = e.currentTarget.dataset.yCoord;

  //   if (player === "user") {
  //     this.userBoard.receiveAttack(x, y);
  //   }

  //   if (player === "computer") {
  //     this.computerBoard.receiveAttack(x, y);
  //   }

  //   player === "user"
  //     ? this.onGameboardChanged(this.userBoard, player)
  //     : this.onGameboardChanged(this.computerBoard, player);
  // }
}
