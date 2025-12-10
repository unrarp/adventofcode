function printGrid(grid: (string | number)[][]) {
  grid.forEach((row) => console.log(row.join("")));
  console.log();
}

function forEachCell(
  grid: (string | number)[][],
  fn: (row: number, col: number) => void
) {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i]!.length; j++) {
      fn(i, j);
    }
  }
}

function adjustNeighbours(
  grid: (string | number)[][],
  row: number,
  col: number,
  delta: number
) {
  for (let i = row - 1; i <= row + 1; i++) {
    for (let j = col - 1; j <= col + 1; j++) {
      if (i === row && j === col) continue;
      const cell = grid[i]?.[j];
      if (typeof cell === "number") grid[i]![j] = cell + delta;
    }
  }
}

async function main() {
  const file = Bun.file("day4/input");
  const text = await file.text();
  const lines = text.trim().split("\n");
  let grid: (string | number)[][] = lines.map((line) =>
    line.split("").map((c) => (c === "@" ? 0 : c))
  );
  printGrid(grid);

  // Initial count pass
  forEachCell(grid, (i, j) => {
    if (grid[i]![j] !== ".") {
      adjustNeighbours(grid, i, j, 1);
    }
  });
  printGrid(grid);

  let finalResult = 0;
  let eliminated: number;
  do {
    eliminated = 0;
    forEachCell(grid, (i, j) => {
      const cell = grid[i]![j];
      if (typeof cell === "number" && cell < 4) {
        eliminated++;
        grid[i]![j] = ".";
        adjustNeighbours(grid, i, j, -1);
      }
    });
    finalResult += eliminated;
    printGrid(grid);
    console.log(`Result: ${finalResult}`);
  } while (eliminated > 0);
}

main();
