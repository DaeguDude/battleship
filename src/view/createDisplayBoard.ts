import { Gameboard } from "../types";
import { getXCoordChar } from "../utils/getXCoordChar";

export function createDisplayBoardComputer(
  gameBoard: Gameboard,
  boardId?: string,
  className?: string
) {
  // computer board can be in 3 status. Because no ships are hidden
  // missed - x with red background
  // hit - o with blue background
  // noHit - nothing

  // user board can be in the same state.
  // however, when starting out userboard should show the
  // ships they are in.
  const coordinates = gameBoard.getCoordinates();

  const gameBoardContainer = document.createElement("div");
  gameBoardContainer.className = `board w-[300px] h-[300px]`;

  if (boardId) {
    gameBoardContainer.setAttribute("id", boardId);
  }

  // TODO: boardId can be undefined. But why doesn't lint warn me?
  if (typeof boardId === "string") {
    if (boardId.includes("computer") && !!className) {
      gameBoardContainer.setAttribute("class", className);
    }
  }

  const cell = document.createElement("div");
  cell.className = `cell w-[30px] h-full border-black border-[1px]`;

  for (let i = 0; i < coordinates.length; i++) {
    const row = document.createElement("div");
    row.className = `row h-[30px] w-full flex`;

    const coordinatesRow = coordinates[i];
    for (let j = 0; j < coordinatesRow.length; j++) {
      const gameBoardCell = coordinatesRow[j];
      const cell = document.createElement("div");
      cell.className = `cell w-[30px] h-full border-black border-[1px] flex items-center justify-center`;

      // ship
      if (gameBoardCell !== "noHit") {
        cell.classList.add("bg-black", "text-white");
        cell.innerText = gameBoardCell[0];
      }

      // hit
      if (gameBoardCell === "hit") {
        cell.classList.add("bg-black", "text-white");
        cell.innerText = "hit";
      }

      // missed
      if (gameBoardCell === "missed") {
        cell.classList.add("bg-black", "text-white");
        cell.innerText = "missed";
      }

      // noHit
      cell.dataset.xCoord = getXCoordChar(j);
      cell.dataset.yCoord = String(i);

      row.appendChild(cell);
    }

    gameBoardContainer.appendChild(row);
  }

  return gameBoardContainer;
}
