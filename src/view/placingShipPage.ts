import { Gameboard } from "../types";
import { getXCoordChar } from "../utils/getXCoordChar";

export function getPlacingShipPage(userName: string, gameBoard: Gameboard) {
  const mainContainer = document.createElement("main");
  mainContainer.className =
    "bg-[#fff] flex flex-col grow items-center justify-center";

  const gameBoardDisplay = createDisplayBoard(gameBoard);

  const title = createTitle(userName);

  mainContainer.append(title, gameBoardDisplay);

  return mainContainer;
}

export function createDisplayBoard(
  gameBoard: Gameboard,
  boardId?: string,
  className?: string
) {
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

      if (gameBoardCell !== "noHit") {
        cell.classList.add("bg-black", "text-white");
        cell.innerText = gameBoardCell[0];
      }

      cell.dataset.xCoord = getXCoordChar(j);
      cell.dataset.yCoord = String(i);

      row.appendChild(cell);
    }

    gameBoardContainer.appendChild(row);
  }

  return gameBoardContainer;
}

function createTitle(userName: string) {
  return document.createRange().createContextualFragment(`
    <h2 class="text-center text-3xl uppercase font-bold">
      Hey ${userName}, please place the ship!
    </h2>
  `);
}
