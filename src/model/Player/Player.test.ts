import { Gameboard } from "../Gameboard/Gameboard";
import { Player } from "./Player";
import { HitCoordinates } from "../../types";

// When creating a player instance, you should
// pass the enemyboard reference. So I do not have to
// pass enemyboard everytime it hits something
describe("Player", () => {
  // Player can hit the enemy gameboard
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

    // I am going to create a loop that will iterate
    // for the length of row and columns
    // So it is 10 x 10, i will loop for 100 times
    for (let i = 0; i < 100; i++) {
      player.hit();
    }

    // So now I assume, every position was hit.
    // So let me check the coordinate that ship was placed
    expect(enemyBoard.getCoordinate("a", 0)).toBe("hit");
    expect(enemyBoard.getCoordinate("a", 1)).toBe("hit");
    expect(enemyBoard.getCoordinate("a", 2)).toBe("hit");
    expect(enemyBoard.getCoordinate("a", 3)).toBe("hit");
    expect(enemyBoard.getCoordinate("a", 4)).toBe("hit");
  });
});
