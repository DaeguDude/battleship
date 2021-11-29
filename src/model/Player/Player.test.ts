import { Gameboard } from "../Gameboard/Gameboard";
import { Player } from "./Player";
import { HitCoordinates } from "../../types";

describe("Player", () => {
  test("Player misses the shot", () => {
    const enemyBoard = Gameboard();
    const player = Player("Sanghak", enemyBoard);

    const coordinates: HitCoordinates = {
      x: "c",
      y: 3,
    };

    player.hit(coordinates);

    expect(enemyBoard.getCoordinate("c", 3)).toBe("missed");
  });

  test("Player hits the ship", () => {
    const enemyBoard = Gameboard();
    const player = Player("Sanghak", enemyBoard);

    const coordinates: HitCoordinates = {
      x: "c",
      y: 3,
    };

    enemyBoard.placeShip("Battleship", coordinates.x, coordinates.y);
    player.hit(coordinates);
    expect(enemyBoard.getCoordinate("c", 3)).toBe("hit");
  });

  test("return 'success' if hit was success", () => {
    const enemyBoard = Gameboard();
    enemyBoard.placeShip("Carrier", "c", 3);
    const player = Player("Sanghak", enemyBoard);

    expect(player.hit({ x: "c", y: 3 })).toBe("success");
  });

  test("return 'failure' if hit was failed", () => {
    const enemyBoard = Gameboard();
    enemyBoard.placeShip("Carrier", "c", 3);
    const player = Player("Sanghak", enemyBoard);

    player.hit({ x: "c", y: 3 });
    expect(player.hit({ x: "c", y: 3 })).toBe("failure");
  });
});

describe("computer player", () => {
  test("computer misses the shot", () => {
    const enemyBoard = Gameboard();
    const player = Player("computer", enemyBoard);

    player.hit();

    const coordinates = enemyBoard.getCoordinates();
    let hasMissed = false;
    for (let i = 0; i < coordinates.length; i++) {
      const row = coordinates[i];
      if (row.includes("missed")) {
        hasMissed = true;
        break;
      }
    }

    expect(hasMissed).toBe(true);
  });

  test("computer hits the ship", () => {
    const enemyBoard = Gameboard();
    const player = Player("computer", enemyBoard);
    enemyBoard.placeShip("Carrier", "a", 0);
    enemyBoard.placeShip("Carrier", "a", 1);
    enemyBoard.placeShip("Carrier", "a", 2);
    enemyBoard.placeShip("Carrier", "a", 3);
    enemyBoard.placeShip("Carrier", "a", 4);

    for (let i = 0; i < 100; i++) {
      player.hit();
    }

    expect(enemyBoard.getCoordinate("a", 0)).toBe("hit");
    expect(enemyBoard.getCoordinate("a", 1)).toBe("hit");
    expect(enemyBoard.getCoordinate("a", 2)).toBe("hit");
    expect(enemyBoard.getCoordinate("a", 3)).toBe("hit");
    expect(enemyBoard.getCoordinate("a", 4)).toBe("hit");
  });
});
