// enablePlaceShips(userBoardUI: Element, gameBoard: IGameboard) {
//   // this.handleMouseEnterOnTheCell(gameBoardUI);
//   // handleClick();
//   // handleMouseLeaveOffTheCell();
//   // this.attachListenerToTheCell(gameBoardUI, "click", (e: MouseEvent) => {
//   //   const target = e.target as HTMLDivElement;
//   //   const coordinates: HitCoordinates = {
//   //     x: target.dataset.xCoord as XCoordinates,
//   //     y: Number(target.dataset.yCoord) as YCoordinates,
//   //   };
//   //   let isEnoughSpace = gameBoard.hasEnoughSpace(
//   //     this.getCurrentShip().name,
//   //     coordinates
//   //   );
//   //   let hasNoShip = gameBoard.hasNoShipOnTheCoordinate(
//   //     this.getCurrentShip().name,
//   //     gameBoard.getCoordinates(),
//   //     coordinates
//   //   );
//   //   if (isEnoughSpace && hasNoShip) {
//   //     console.log("you can place the ship");
//   //     this.placeShip(
//   //       this.getCurrentShip().name,
//   //       { x: coordinates.x, y: coordinates.y },
//   //       gameBoard
//   //     );
//   //   } else {
//   //     console.log("You can not place the ship");
//   //   }
//   // });
// }

import { CellStatus } from "../types";

// handleMouseEnterOnTheCell(gameBoardUI: Element) {
//   this.attachListenerToTheCell(
//     gameBoardUI,
//     "mouseenter",
//     // ShowWhetherValidateMove
//     (e: MouseEvent) => {
//       const target = e.currentTarget as HTMLDivElement;
//       const coordinates: HitCoordinates = {
//         x: target.dataset.xCoord as XCoordinates,
//         y: Number(target.dataset.yCoord) as YCoordinates,
//       };

//       // And then I can ask...Controller.
//       // Hey, is this valid move?
//       console.log(coordinates);

//       // let isEnoughSpace = gameBoard.hasEnoughSpace(
//       //   this.getCurrentShip().name,
//       //   coordinates
//       // );

//       // let hasNoShip = gameBoard.hasNoShipOnTheCoordinate(
//       //   this.getCurrentShip().name,
//       //   gameBoard.getCoordinates(),
//       //   coordinates
//       // );

//       // if (isEnoughSpace && hasNoShip) {
//       //   target.style.cursor = "cell";
//       //   // I first need to grab all the cells that ship will be taking place

//       //   const rowElement = this.getElement("#user").children[coordinates.y];
//       //   const numXCoord = getXCoordNumber(coordinates.x);
//       //   for (let i = 0; i < this.getCurrentShip().length; i++) {
//       //     const cell = rowElement.children[numXCoord + i] as HTMLDivElement;
//       //     cell.style.background = "blue";
//       //   }
//       // } else {
//       //   target.style.cursor = "not-allowed";
//       //   target.style.background = "grey";
//       //   console.log("X - disable click, grey out them");
//       // }
//     }
//   );
// }

// handleMouseLeave(gameBoardUI: Element) {
//   this.attachListenerToTheCell(gameBoardUI, "mouseleave", (e: MouseEvent) => {
//     const target = e.currentTarget as HTMLDivElement;
//     const coordinates: HitCoordinates = {
//       x: target.dataset.xCoord as XCoordinates,
//       y: Number(target.dataset.yCoord) as YCoordinates,
//     };

//     // let isEnoughSpace = gameBoard.hasEnoughSpace(
//     //   this.getCurrentShip().name,
//     //   coordinates
//     // );

//     // let hasNoShip = gameBoard.hasNoShipOnTheCoordinate(
//     //   this.getCurrentShip().name,
//     //   gameBoard.getCoordinates(),
//     //   coordinates
//     // );

//     // if (isEnoughSpace && hasNoShip) {
//     //   const rowElement = this.getElement("#user").children[coordinates.y];
//     //   const numXCoord = getXCoordNumber(coordinates.x);
//     //   for (let i = 0; i < this.getCurrentShip().length; i++) {
//     //     const cell = rowElement.children[numXCoord + i] as HTMLDivElement;
//     //     cell.style.background = "none";
//     //   }
//     // } else {
//     //   target.style.background = "none";
//     // }
//   });
// }

export function getClassNameForCell(cell: CellStatus) {
  if (cell === "Battleship") {
    return "cell Battleship";
  }

  if (cell === "Carrier") {
    return "cell Carrier";
  }

  if (cell === "Destroyer") {
    return "cell Destroyer";
  }

  if (cell === "PatrolBoat") {
    return "cell PatrolBoat";
  }

  if (cell === "Submarine") {
    return "cell Submarine";
  }

  if (cell === "hit") {
    return "cell hit";
  }
  if (cell === "missed") {
    return "cell missed";
  }

  if (cell === "noHit") {
    return "cell noHit";
  }
}
