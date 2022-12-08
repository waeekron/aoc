import { readFileSync } from "fs"

const grid = readFileSync("in8.txt", "utf-8")
  .split("\n")
  .map((row) => row.split("").map((c) => parseInt(c)))
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const grid2: any[][] = grid.concat()
console.log(grid2)
let count = 0 //4 * grid.length - 4 //* (grid[0].length - 2)

for (let y = 0; y < grid.length - 0; y++) {
  for (let x = 0; x < grid[y].length - 0; x++) {
    if (
      x === 0 ||
      y === 0 ||
      x === grid[y].length - 1 ||
      y === grid.length - 1
    ) {
      count++
      continue
    }
    const treeHeight = grid[y][x]
    // horizontal
    const left = grid[y].slice(0, x)
    const right = grid[y].slice(x + 1, grid[y].length)
    // vertiacl
    const up = []
    const down = []
    for (let u = y - 1; u >= 0; u--) {
      up.push(grid[u][x])
    }
    for (let d = y; d < grid.length; d++) {
      down.push(grid[d][x])
    }
    // console.log(
    //   { up },
    //   treeHeight,
    //   { down },
    //   { up: isVisible(up, treeHeight) },
    //   { down: isVisible(down, treeHeight) }
    // )
    // console.log()
    // console.log(
    //   { left },
    //   treeHeight,
    //   { right },
    //   { left: isVisible(left, treeHeight) },
    //   { right: isVisible(right, treeHeight) }
    // )
    // console.log("---------------------------------------------")

    if (isVisible(left, treeHeight)) count++
    if (isVisible(right, treeHeight)) count++
    if (isVisible(up, treeHeight)) count++
    if (isVisible(down, treeHeight)) count++
  }
}
function isVisible(arr: number[], num: number): boolean {
  return arr.find((n, i) => {
    return n >= num
  })
    ? false
    : true
}

console.log(count)
