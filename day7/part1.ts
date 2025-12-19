async function main() {
  const file = Bun.file("day7/input");
  const text = await file.text();
  const grid = text
    .trim()
    .split("\n")
    .map((line) => [...line]);

  let splits = 0;
  for (let row = 0; row < grid.length - 1; row++) {
    const current = grid[row];
    const next = grid[row + 1];

    for (let col = 0; col < current!.length; col++) {
      const char = current![col];
      const below = next![col];

      switch (char) {
        case "S":
          next![col] = "|";
          break;
        case "|":
          if (below === ".") {
            next![col] = "|";
          } else if (below === "^") {
            splits++;
            if (col > 0) next![col - 1] = "|";
            if (col + 1 < current!.length) next![col + 1] = "|";
          }
      }
    }
    console.log(current?.join(""));
  }

  console.log(splits);
}

main();
