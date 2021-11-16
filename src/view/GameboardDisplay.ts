// This one will make a coordinate

// 10 x 10

export function GameboardDisplay() {
  const board = document.createElement("div");
  board.classList.add("board");

  for (let i = 0; i < 10; i++) {
    const row = document.createElement("div");
    row.classList.add("row");

    for (let j = 0; j < 10; j++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      row.appendChild(cell);
    }

    board.appendChild(row);
  }

  return board;
}
