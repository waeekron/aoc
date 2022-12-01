// Find the elf carrying the most calories =)
import * as fs from 'fs'

const values: number[] = fs
  .readFileSync('input1.txt', { encoding: 'utf-8' })
  .split('\n\n')
  .map((data: string) => data.split('\n'))
  .map((data: string[]) => stringArrayToNumber(data))
  .map(
    (nums: number[]) =>
      nums.reduce((accumulator, currentValue) => accumulator + currentValue),
    0
  )

console.log(maxValue(values))
console.log(sumOfThreeLargest(values))

function sumOfThreeLargest(arr: number[]): number {
  const sorted: number[] = arr.sort((a, b) => b - a)
  return sorted[0] + sorted[1] + sorted[2]
}

function maxValue(arr: number[]): [number, number] {
  let valueAndIndex: [number, number] = [0, 0]
  for (const [i, value] of arr.entries()) {
    if (value > valueAndIndex[1]) valueAndIndex = [i, value]
  }
  return valueAndIndex
}

function stringArrayToNumber(arr: string[]): number[] {
  let nums: number[] = new Array<number>()
  try {
    nums = arr.map((str) => parseInt(str))
  } catch (error) {
    console.log('Bad input!!!')
  }
  return nums
}
