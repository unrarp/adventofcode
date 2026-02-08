type Point = [number, number, number];

async function main() {
  const file = Bun.file("day8/input");
  const text = await file.text();
  const input: Point[] = text
    .trim()
    .split("\n")
    .map((line) => {
      const [x, y, z] = line.split(",").map(Number);
      return [x, y, z] as Point;
    });

  const pairs: { distSq: number; pair: [Point, Point] }[] = [];
  for (let i = 0; i < input.length; i++) {
    for (let j = i + 1; j < input.length; j++) {
      const x = input[i]!;
      const y = input[j]!;
      const distSq =
        (x[0] - y[0]) ** 2 + (x[1] - y[1]) ** 2 + (x[2] - y[2]) ** 2;
      pairs.push({
        distSq,
        pair: [x, y],
      });
    }
  }
  pairs.sort((a, b) => a.distSq - b.distSq);

  const sets: Set<Point[]> = new Set();
  for (let i = 0; i < 1000; i++) {
    const [a, b] = pairs[i]!.pair;
    const setA = sets.values().find((s) => s.includes(a));
    const setB = sets.values().find((s) => s.includes(b));
    if (setA && setB) {
      if (setA === setB) continue;
      sets.delete(setA);
      sets.delete(setB);
      sets.add([...setA, ...setB]);
    } else if (!setA && setB) {
      sets.delete(setB);
      sets.add([...setB, a]);
    } else if (setA && !setB) {
      sets.delete(setA);
      sets.add([...setA, b]);
    } else {
      sets.add([a, b]);
    }
  }

  const lengths = [...sets].map((s) => s.length).sort((a, b) => b - a);
  console.log(lengths[0]! * lengths[1]! * lengths[2]!);
}

main();
