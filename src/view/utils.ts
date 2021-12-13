import { Gameboard as IGameboard } from "../types";
import { getXCoordChar } from "../utils/getXCoordChar";
import { getClassNameForCell } from "./view";

/**
 * create gameboard element that will be displayed on the
 * DOM
 * @param gameBoard
 * @return Element
 */
export function getBoardToDisplay(gameBoard: IGameboard) {
  const board = createElement("div", "board");
  const coordinates = gameBoard.getCoordinates();

  coordinates.forEach((eachRow, rowIndex) => {
    const row = createElement("div", "row");
    eachRow.forEach((cell, cellIndex) => {
      const dCell = createElement("div");
      dCell.className = getClassNameForCell(cell);
      dCell.dataset.xCoord = getXCoordChar(cellIndex);
      dCell.dataset.yCoord = String(rowIndex);

      row.appendChild(dCell);
    });

    board.appendChild(row);
  });

  return board;
}

function createElement(tag: string, className?: string | string[]) {
  const element = document.createElement(tag);

  if (typeof className === "string") {
    element.classList.add(className);
  }

  if (Array.isArray(className)) {
    className.forEach((eachClassName) => element.classList.add(eachClassName));
  }

  return element;
}
