import { Gameboard as IGameboard } from "../types";
import { createDisplayBoard } from "./placingShipPage";

// First I need to show 2 game board on the page
// Left one is a user board
// Right one is a computer board
// After placing the board, computer board should hide....that
// It has something placed.
export function getMainPage(userBoard: IGameboard, computerBoard: IGameboard) {
  const mainContainer = document.createElement("main");
  mainContainer.className = "bg-[#fff] flex grow items-center justify-center";

  const userBoardDisplay = createDisplayBoard(userBoard, "user-board");
  const computerBoardDisplay = createDisplayBoard(
    computerBoard,
    "computer-board",
    "ml-1"
  );

  mainContainer.appendChild(userBoardDisplay);
  mainContainer.appendChild(computerBoardDisplay);

  return mainContainer;
}
