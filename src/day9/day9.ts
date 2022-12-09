import { readFileSync } from "fs"

const commands = readFileSync("in9.txt", "utf-8")
  .split("\n")
  .map((line) => {
    const [direction, steps] = line.split(" ")
    return [direction, parseInt(steps)] as [direction: string, steps: number]
  })

type Point = {
  x: number
  y: number
}

const tailLocations = new Set<string>()
tailLocations.add("0,0")

const head: Point = { x: 0, y: 0 }
// let tail: Point = { x: 0, y: 0 }
const knots: Point[] = []
for (let i = 0; i < 9; i++) {
  knots.push({ x: 0, y: 0 })
}
// knots.push(tail)
console.log(knots)
for (const [direction, steps] of commands) {
  let i = 0

  while (i < steps) {
    //up
    if (direction === "U") {
      head.y++
    }
    //down
    if (direction === "D") {
      head.y--
    }
    //left
    if (direction === "L") {
      head.x--
    }
    //right
    if (direction === "R") {
      head.x++
    }

    for (let j = 0; j < knots.length; j++) {
      let tail = knots[j]
      // check if we need to move the tail closer
      const distance = Math.sqrt(
        Math.pow(head.x - tail.x, 2) + Math.pow(head.y - tail.y, 2)
      )
      if (distance > 1) {
        //up
        if (direction === "U" && distance !== 1.4142135623730951) {
          if (head.x !== tail.x) {
            tail = { x: head.x, y: head.y - 1 }
          } else {
            tail.y++
          }
        }
        //down
        if (direction === "D" && distance !== 1.4142135623730951) {
          if (head.x !== tail.x) {
            tail = { x: head.x, y: head.y + 1 }
          } else {
            tail.y--
          }
        }

        //left
        if (direction === "L" && distance !== 1.4142135623730951) {
          if (head.y !== tail.y) {
            tail = { x: head.x + 1, y: head.y }
          } else {
            tail.x--
          }
        }
        //right
        if (direction === "R" && distance !== 1.4142135623730951) {
          if (head.y !== tail.y) {
            tail = { x: head.x - 1, y: head.y }
          } else {
            tail.x++
          }
        }
        if (j === 8) {
          tailLocations.add(`${tail.x},${tail.y}`)
        }
      }
    }

    // console.log({ tail }, steps, direction)
    i++
  }
}
console.log(tailLocations.size)
