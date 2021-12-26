import { Coordinates, HitCoordinates, ShipNames } from "../../types";
import { getXCoordNumber } from "../../utils/getXCoordNumber";

// These belong to...Gameboard actually
// So when I place the ship, I need to check that it doesn't place the ship
// if there's pass these 2 requirements below
// - it doesn't have enough space to place the ship
// - It has some ship on the xCoordinates where new ship will be placed

export function hasEnoughSpace(
  shipName: ShipNames,
  coordinateToPlaceTheShip: HitCoordinates
): boolean {
  const LAST_X_COORD = 9;
  const shipLength = getShipLength(shipName);
  const xCoordNum = getXCoordNumber(coordinateToPlaceTheShip.x);

  if (shipLength - 1 + xCoordNum <= LAST_X_COORD) {
    return true;
  }

  return false;
}

export function hasNoShipOnTheCoordinate(
  shipName: ShipNames,
  coordinates: Coordinates,
  coordinateToPlaceTheShip: HitCoordinates
) {
  const ships: ShipNames[] = [
    "Battleship",
    "Carrier",
    "Destroyer",
    "PatrolBoat",
    "Submarine",
  ];

  const shipLength = getShipLength(shipName);
  const xCoordinatesInYRow = coordinates[coordinateToPlaceTheShip.y];

  const xCoordAsNumber = getXCoordNumber(coordinateToPlaceTheShip.x);

  let hasNoShip = true;
  for (let i = xCoordAsNumber; i < xCoordAsNumber + shipLength; i++) {
    if (
      xCoordinatesInYRow[i] === "Carrier" ||
      xCoordinatesInYRow[i] === "Battleship" ||
      xCoordinatesInYRow[i] === "Destroyer" ||
      xCoordinatesInYRow[i] === "Submarine" ||
      xCoordinatesInYRow[i] === "PatrolBoat"
    ) {
      hasNoShip = false;
      break;
    }
  }

  return hasNoShip;
}

function getShipLength(shipName: ShipNames) {
  switch (shipName) {
    case "Carrier":
      return 5;
    case "Battleship":
      return 4;
    case "Destroyer":
      return 3;
    case "Submarine":
      return 3;
    case "PatrolBoat":
      return 2;
  }
}
