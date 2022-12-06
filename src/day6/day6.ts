import { readFileSync } from "fs"

const data = readFileSync("in6.txt", "utf-8").split("")
let amountProcessed = 0
for (const [i, char] of data.entries()) {
  if (i === data.length - 3) break
  const buffer = new Set([char, data[i + 1], data[i + 2], data[i + 3]])
  if (buffer.size === 4) {
    amountProcessed = i + 4
    console.log(i + 4, char, buffer)
    break
  }
}

console.log(amountProcessed)
