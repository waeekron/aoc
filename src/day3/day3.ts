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

let values = new Array<string[][]>()
values = fs
  .readFileSync("input3.txt", "utf-8")
  .split("\n")
  .map((row) => row.split(""))
  .map((row) => [row.slice(0, row.length / 2), row.slice(row.length / 2)])

function charToPriority(char: string): number {
  let priority = alphabet.findIndex((el) => el === char.toUpperCase()) + 1
  if (char === char.toUpperCase()) {
    priority += 26
  }
  return priority
}

const part1 = values.map((row) => {
  const [left, right] = row
  //find the element that is in both left & right
  for (const c of left) {
    if (right.some((c2) => c === c2)) {
      return c
    }
  }
  return ""
})

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
  return ""
})

console.log(part1.map(charToPriority).reduce((acc, curr) => acc + curr, 0))
console.log(badges.map(charToPriority).reduce((acc, curr) => acc + curr, 0))
