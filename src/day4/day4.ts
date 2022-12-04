import fs from "fs"
const lines = fs.readFileSync("input4.txt", "utf-8").split("\n")
const parseLine = (line: string): [number[], number[]] => {
  const [left, right] = line
    .split(",")
    .map((el) => el.split("-"))
    .map((numsString) => {
      return numsString.map((str) => parseInt(str))
    })
  return [left, right]
}

const isContained = (pair: [number[], number[]]): boolean => {
  const [left, right] = pair
  // if left fits in right
  if (left[0] >= right[0] && left[1] <= right[1]) return true
  // if right fits in left
  if (left[0] <= right[0] && left[1] >= right[1]) return true
  return false
}

const isOverlap = (pair: [number[], number[]]): boolean => {
  let [left, right] = pair
  left = fill(left)
  right = fill(right)
  let overlaps = false
  left.forEach((n) => {
    if (right.includes(n)) overlaps = true
  })
  return overlaps
}

const fill = (nums: number[]): number[] => {
  let start = nums[0]
  const end = nums[1]
  const filled = new Array<number>()
  while (start <= end) {
    filled.push(start)
    start++
  }
  return filled
}

const countOfFullyContainedPairs = lines
  .map(parseLine)
  .filter(isContained).length

const overlapCount = lines.map(parseLine).filter(isOverlap).length

console.log(countOfFullyContainedPairs)
console.log(overlapCount)
