async function main() {
  const file = Bun.file("day5/input");
  const text = await file.text();

  const [intervalSection, ingredientSection] = text.trim().split("\n\n");
  const intervals = intervalSection!.split("\n").map((line) => {
    const [start, end] = line.split("-").map(Number);
    return [start, end] as [number, number];
  });
  const ingredientIds = ingredientSection!.split("\n").map(Number);

  intervals.sort((a, b) => a[0] - b[0]);
  ingredientIds.sort((a, b) => a - b);

  console.log(intervals);
  console.log(ingredientIds);

  let intervalIndex = 0;
  let freshCount = 0;

  for (const id of ingredientIds) {
    while (
      intervalIndex < intervals.length &&
      id > intervals[intervalIndex]![1]
    ) {
      intervalIndex++;
    }

    if (intervalIndex >= intervals.length) break;

    const interval = intervals[intervalIndex];
    if (id >= interval![0] && id <= interval![1]) {
      freshCount++;
    }
  }
  console.log(freshCount);
}

main();
