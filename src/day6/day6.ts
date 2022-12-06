import { readFileSync } from "fs"

const data = readFileSync("in6.txt", "utf-8").split("")
const BUFFER_LEN = 4 // 4 for part 1, 14 for part 2
let amountProcessed = 0
for (const [i, _] of data.entries()) {
  if (i === data.length - BUFFER_LEN - 1) break
  const buffer = new Set(data.slice(i, i + BUFFER_LEN))
  if (buffer.size === BUFFER_LEN) {
    amountProcessed = i + BUFFER_LEN
    break
  }
}

console.log(amountProcessed)
