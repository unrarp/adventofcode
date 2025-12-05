async function main() {
  const file = Bun.file("day3/input");
  const text = await file.text();
  const banks = text.split("\n").filter((line) => line.trim() !== "");

  let result = 0;
  for (const bank of banks) {
    let max = 11;
    for (let i = 0; i < bank.length && max < 99; i++) {
      const firstDigit = parseInt(bank[i]!);
      if (firstDigit < Math.floor(max / 10)) continue;
      for (let j = i + 1; j < bank.length; j++) {
        const secondDigit = parseInt(bank[j]!);
        const current = firstDigit * 10 + secondDigit;
        if (current > max) max = current;
      }
    }
    result += max;
  }
  console.log(`Result: ${result}`);
}

main();
