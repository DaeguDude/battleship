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
  onReceivedAttack: any;
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

  placeShipsForComputerBoard() {}

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

    this.userBoard.placeShip(ship, coordinates.x, coordinates.y);
    this.onShipPlaced(this.userBoard);
  }

  receiveAttack = (coordinates: HitCoordinates) => {
    this.computerBoard.receiveAttack(coordinates.x, coordinates.y);
    this.onReceivedAttack();
  };

  bindPlayerAdded = (callback: any) => {
    this.onPlayerAdded = callback;
  };

  bindShipPlaced = (callback: any) => {
    this.onShipPlaced = callback;
  };

  bindReceivedAttack = (callback: any) => {
    this.onReceivedAttack = callback;
  };

  addPlayer(userName: string) {
    this.playerName = userName;
    this.onPlayerAdded(userName, this.userBoard);
  }
}
