async function main() {
  const file = Bun.file("day6/input");
  const text = await file.text();
  const lines = text.trim().split("\n");

  const operators: string[] = [];
  const problems: number[][] = [];

  for (const line of lines) {
    const tokens = line.split(" ").filter((c) => c.trim() !== "");
    const firstNum = parseInt(tokens[0]!);
    if (isNaN(firstNum)) {
      operators.push(...tokens);
    } else {
      problems.push(tokens.map((c) => parseInt(c)));
    }
  }

  console.log(problems);
  console.log(operators);

  let result = 0;
  for (let i = 0; i < operators.length; i++) {
    const operator = operators[i];
    if (operator === "*") {
      result += problems.reduce((acc, row) => acc * row[i]!, 1);
    } else if (operator === "+") {
      result += problems.reduce((acc, row) => acc + row[i]!, 0);
    }
  }

  console.log(result);
}

main();
