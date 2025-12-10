function printGrid(grid: (string | number)[][]) {
  grid.forEach((row) => console.log(row.join("")));
  console.log();
}

function incrementNeighbours(
  grid: (string | number)[][],
  row: number,
  col: number
) {
  for (let i = row - 1; i <= row + 1; i++) {
    for (let j = col - 1; j <= col + 1; j++) {
      if (i === row && j === col) continue;
      const cell = grid[i]?.[j];
      if (typeof cell === "number") grid[i]![j] = cell + 1;
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

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i]!.length; j++) {
      if (grid[i]![j] === ".") continue;
      incrementNeighbours(grid, i, j);
    }
  }
  printGrid(grid);

  const result = grid
    .flat()
    .filter((cell) => typeof cell === "number" && cell < 4).length;

  console.log(`Result: ${result}`);
}

main();
