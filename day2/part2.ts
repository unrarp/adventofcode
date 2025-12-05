import _ from "lodash";

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
      let isInvalid = false;

      for (let i = Math.floor(s.length / 2); i > 0; i--) {
        if (s.length % i !== 0) continue;
        const parts = _.chunk(s.split(""), i).map((chunk) => chunk.join(""));
        if (parts.every((part) => part === parts[0])) {
          isInvalid = true;
          break;
        }
      }

      if (isInvalid) {
        console.log(`Found invalid id ${s} in range ${idRange}`);
        result += id;
      }
    }
  }

  console.log(result);
}

main();
