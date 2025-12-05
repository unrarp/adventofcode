function findMax(bank: string, left: number, startIndex = 0): string {
  if (left === 0) return "";

  const remaining = bank.length - startIndex;
  if (remaining === left) return bank.slice(startIndex);

  let maxDigit = bank[startIndex]!;
  let maxIndex = startIndex;
  for (let i = startIndex; i <= bank.length - left; i++) {
    const digit = parseInt(bank[i]!);
    if (bank[i]! > maxDigit) {
      maxDigit = bank[i]!;
      maxIndex = i;
      if (maxDigit === "9") break;
    }
  }
  return maxDigit + findMax(bank, left - 1, maxIndex + 1);
}

async function main() {
  const file = Bun.file("day3/input");
  const text = await file.text();
  const banks = text.split("\n").filter((line) => line.trim() !== "");

  let result = 0;
  for (const bank of banks) {
    const max = findMax(bank, 12);
    result += parseInt(max);
  }
  console.log(`Result: ${result}`);
}

main();
