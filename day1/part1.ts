async function main() {
  const file = Bun.file("day1/input");
  const text = await file.text();
  const lines = text.split("\n").filter((line) => line.trim() !== "");

  let result = 0;
  let position = 50;

  for (const line of lines) {
    const direction = line.startsWith("L") ? -1 : 1;
    const steps = parseInt(line.substring(1), 10);
    const previous = position;
    position += direction * steps;

    if (position % 100 === 0) {
      result++;
      position = 0;
    }

    console.log(
      `Rotating ${
        direction === -1 ? "left" : "right"
      } ${steps} steps from ${previous} to ${position} with result:${result}`
    );
  }

  console.log(`Result:${result}`);
}

main();
