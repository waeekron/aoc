import { readFileSync } from "fs"

const data = readFileSync("in7.txt", "utf-8").split("\n")
const dirSizes = new Map<string, number>()
const tree: {
  name: string
  sum: number
  parent: string
  children: string[]
}[] = []
const path: string[] = []
let dir = "/"
let prevDir = "/"
for (let i = 0; i < data.length; i++) {
  const pieces = data[i].split(" ")
  if (pieces[2] === "..") {
    path.pop()
    dir = prevDir
    continue
  }
  if (pieces[1] === "cd") {
    prevDir = dir
    dir = pieces[2]
    path.push(dir)
    tree.push({
      name: dir,
      parent: prevDir,
      sum: 0,
      children: new Array<string>(),
    })
  }

  if (pieces[1] === "ls") {
    let sum = 0
    let j = i + 1
    while (j < data.length && data[j].split(" ")[0] !== "$") {
      if (data[j].split(" ")[0] !== "dir" && data[j].split(" ")[0] !== "$") {
        console.log(path, data[j].split(" ")[0])
        sum += parseInt(data[j].split(" ")[0])
      }
      j++
    }
    dirSizes.set(path.join("/"), sum)
    addSum(tree, path.join("/"), sum)
  }
}
function addSum(
  tree: { parent: string; name: string; sum: number; children: string[] }[],
  dir: string,
  sum: number
) {
  tree.forEach((node) => {
    if (node.name[node.name.length - 1] === dir[dir.length - 1]) {
      node.sum += sum
    }
  })
}

const totalSizes = new Map<string, number>()
for (const [k, v] of dirSizes.entries()) {
  let newVal = v
  for (const [k2, v2] of dirSizes.entries()) {
    if (k2.startsWith(k) && k !== k2) {
      newVal += v2
    }
  }
  totalSizes.set(k, newVal)
}
let total = 0
totalSizes.forEach((val, _) => (val <= 100000 ? (total += val) : ""))
console.log(total)
total = 0
totalSizes.forEach((val, _) => (total += val))
const r: number[] = []
for (const [k, v] of totalSizes.entries()) {
  if (v + (70000000 - (totalSizes.get("/") || 0)) >= 30000000) {
    r.push(v)
  }
}
r.sort((a, b) => a - b)
console.log(r[0])
