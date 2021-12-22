import { Coordinates, HitCoordinates, ShipNames } from "../../types";
import { getXCoordNumber } from "../../utils/getXCoordNumber";

export function hasEnoughSpace(
  shipName: ShipNames,
  coordinateToPlaceTheShip: HitCoordinates
): boolean {
  const LAST_X_COORD = 9;
  const shipLength = getShipLength(shipName);
  const xCoordNum = getXCoordNumber(coordinateToPlaceTheShip.x);
  console.log({ xCoordNum });

  // i.e Carrier: length 5, coordinate: { x: f(5), y: 0}
  // 5, 6, 7, 8, 9 is Okay.
  // However, shipLength + xCoordNum 5 + 5 will exceed LAST_X_COORd
  if (shipLength - 1 + xCoordNum <= LAST_X_COORD) {
    return true;
  }

  return false;
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
