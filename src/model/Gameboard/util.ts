import { Coordinates, HitCoordinates, ShipNames } from "../../types";
import { getXCoordNumber } from "../../utils/getXCoordNumber";

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
