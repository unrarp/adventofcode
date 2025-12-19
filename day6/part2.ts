async function main() {
  const file = Bun.file("day6/input");
  const text = await file.text();

  const numberLines = text.trim().split("\n");
  const operatorLine = numberLines.pop();
  const operators = operatorLine?.split(" ").filter((c) => c.trim() !== "");

  console.log(numberLines);
  console.log(operators);

  let index = 0;
  const width = Math.max(...numberLines.map((l) => l.length));
  const result = operators?.reduce((acc, operator) => {
    const numbers = [];
    while (index < width) {
      const number = numberLines
        .reduce((acc, line) => (acc += line[index]), "")
        .trim();
      index++;
      if (isNaN(parseInt(number))) break;
      numbers.push(parseInt(number));
    }

    if (operator === "*") {
      return acc + numbers.reduce((acc, number) => acc * number, 1);
    } else if (operator === "+") {
      return acc + numbers.reduce((acc, number) => acc + number, 0);
    }
    return 0;
  }, 0);

  console.log(result);
}

main();
