async function main() {
  const file = Bun.file("day2/input");
  const text = await file.text();
  const idRanges = text.split(",").map((line) => line.trim());

  let result = 0;
  for (const idRange of idRanges) {
    const [startStr, endStr] = idRange.split("-");
    const startId = parseInt(startStr ?? "");
    const endId = parseInt(endStr ?? "");
    for (let id = startId; id <= endId; id++) {
      const s = id.toString();
      const half = s.length / 2;
      if (s.length % 2 === 0 && s.slice(0, half) === s.slice(half)) {
        console.log(`Found invalid id ${s} in range ${idRange}`);
        result += id;
      }
    }
  }

  console.log(result);
}

main();
