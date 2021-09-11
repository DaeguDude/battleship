import { Player } from "./Player";
import { Gameboard } from "../Gameboard/Gameboard";
import { Ship } from "../Ship/Ship";

// jest.mock("../Gameboard/Gameboard");

// Maybe something with ES6 import syntax is different
jest.mock("../Gameboard/Gameboard", () => {
  return jest.fn(() => 42);
});

describe("Player", () => {
  test.only("check if it hits", () => {
    const newPlayer = Player();
    console.log(Gameboard);
    // const gameBoard = Gameboard();
    // newPlayer.hit(gameBoard, 3, "a");
    // expect(gameBoard.getCoordinates()["a"][3]).toBe("missed");
  });

  test("hits the ship", () => {
    const newPlayer = Player();
    const gameBoard = Gameboard();
    const ship = Ship("Carrier");
    gameBoard.placeShip(ship, 3, "a");
    newPlayer.hit(gameBoard, 3, "a");
    expect(ship.getHits()).toEqual([true, false, false, false, false]);
  });
});

describe("Computer Player", () => {
  test("check if it hits", () => {
    const newPlayer = Player("computer");
    const gameBoard = Gameboard();
    console.log(gameBoard);

    // newPlayer.hit(gameBoard);

    // Check what xCoord, yCoord was that were passed to the gameBoard.receiveAttack
    // And then check if that was hit correctly
    // expect(gameBoard.getCoordinates()["a"][3]).toBe("missed");
  });

  test("hits the ship", () => {
    const newPlayer = Player();
    const gameBoard = Gameboard();
    const ship = Ship("Carrier");
    gameBoard.placeShip(ship, 3, "a");
    newPlayer.hit(gameBoard, 3, "a");
    expect(ship.getHits()).toEqual([true, false, false, false, false]);
  });
});

/**
 * Players can take turns playing the game by attacking the
 * enemy gameboard
 */

/**
 * The game is played against the computer, so make 'computer'
 * players capable of making random plays. The AI doesn't
 * have to be smart, but it should know whether or not a
 * given move is legal.(i.e. it shouldn't shoot the same
 * coordinate twice)
 */

// How does player attacking the enemy gameboard?
// It needs a gameboard from enemy. We will need to use
// Gameboard

// How can players take turns...?

// How can players can attack the enemy gameboard?

// Game
// Creating Players and Gameboards.

// Players...
// - name
// - Ships
// - gameboards
