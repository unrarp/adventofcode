async function main() {
  const text = await Bun.file("day7/input").text();
  const grid = text
    .trim()
    .split("\n")
    .map((line) => [...line].map((char) => ({ char, count: 0 })));

  for (let row = 0; row < grid.length - 1; row++) {
    const current = grid[row];
    const next = grid[row + 1];

    for (let col = 0; col < current!.length; col++) {
      const cell = current![col];
      const below = next![col];

      if (cell!.char === "S") {
        below!.char = "|";
        below!.count = 1;
      } else if (cell!.char === "|") {
        if (below!.char === ".") {
          below!.char = "|";
          below!.count = cell!.count;
        } else if (below!.char === "^") {
          if (col > 0) {
            next![col - 1]!.char = "|";
            next![col - 1]!.count += cell!.count;
          }
          if (col + 1 < next!.length) {
            next![col + 1]!.char = "|";
            next![col + 1]!.count += cell!.count;
          }
        } else if (below!.char === "|") {
          below!.count += cell!.count;
        }
      }
    }
    console.log(
      `${current!.map((c) => c.char).join("")}   ${current!
        .map((c) => c.count)
        .join("")}`
    );
  }
  const result = grid.at(-1)!.reduce((sum, cell) => sum + cell.count, 0);
  console.log(result);
}

main();
