import { Gameboard } from "../Gameboard/Gameboard";
import { Player } from "./Player";
import { HitCoordinates } from "../types";

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
  test.only("computer misses the shot", () => {
    const enemyBoard = Gameboard();
    const player = Player("computer", enemyBoard);

    // Computer made a random hit
    player.hit();

    // Some coordinate on the board was hit....
    const coordinates = enemyBoard.getCoordinates();
    console.log(coordinates);
    console.log(coordinates.length);

    // How do I test computer has hit some coordinate?
    // For now... everything is 'noHit' when so when `hit` was called
    // at least one coordinate is turned to 'missed'. Gotta find that

    let hasMissed = false;
    for (let i = 0; i < coordinates.length; i++) {
      const row = coordinates[i];
      console.log(`${i} row:`, row);
      if (row.includes("missed")) {
        hasMissed = true;
        break;
      }
    }

    expect(hasMissed).toBe(true);
  });

  // test("computer hits the ship", () => {});
});
