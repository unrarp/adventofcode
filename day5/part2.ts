async function main() {
  const file = Bun.file("day5/input");
  const text = await file.text();

  const [intervalSection] = text.trim().split("\n\n");
  const intervals = intervalSection!.split("\n").map((line) => {
    const [start, end] = line.split("-").map(Number);
    return [start, end] as [number, number];
  });

  intervals.sort((a, b) => a[0] - b[0]);

  console.log(intervals);

  let lastProcessed = -Infinity;
  let freshCount = 0;

  for (const [start, end] of intervals) {
    if (lastProcessed >= end) continue;
    const effectiveStart = Math.max(start, lastProcessed + 1);
    freshCount += end - effectiveStart + 1;
    lastProcessed = end;
  }

  console.log(freshCount);
}

main();
