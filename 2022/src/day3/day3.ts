import fs from "fs"
const alphabet = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
]
const lines = fs.readFileSync("input3.txt", "utf-8").split("\n")
const prioritySum = lines
  .map((row) => ({
    left: row.slice(0, row.length / 2),
    right: row.slice(row.length / 2),
  }))
  .map((obj) => {
    const { left, right } = obj
    for (const char of left) {
      if (right.includes(char)) return char
    }
  })
  .map(charToPriority)
  .reduce((acc, curr) => acc + curr, 0)

console.log("Part1:" + prioritySum)

let values = new Array<string[][]>()
values = lines
  .map((row) => row.split(""))
  .map((row) => [row.slice(0, row.length / 2), row.slice(row.length / 2)])

function charToPriority(char: string | undefined): number {
  if (!char) return 0
  let priority = alphabet.findIndex((el) => el === char.toUpperCase()) + 1
  if (char === char.toUpperCase()) {
    priority += 26
  }
  return priority
}

const part2 = values.map((row) => [...row[0], ...row[1]])
const elfGroup: string[][][] = []
for (let i = 0; i < part2.length; i += 3) {
  const j = i + 1,
    k = i + 2
  elfGroup.push([part2[i], part2[j], part2[k]])
}

const badges = elfGroup.map((row) => {
  const [top, mid, bottom] = row
  for (const c1 of top) {
    if (mid.some((c2) => c2 === c1) && bottom.some((c2) => c2 === c1)) {
      return c1
    }
  }
})

console.log(
  "Part2:" + badges.map(charToPriority).reduce((acc, curr) => acc + curr, 0)
)
