import { readFileSync } from "fs"

const data = readFileSync("in10.txt", "utf-8")
  .split("\n\n")
  .map(parsePacketPair)

type Data = number | number[]
type Packet = Data[]
function parsePacketPair(pair: string): [first: Packet, second: Packet] {
  let [f, s] = pair.split("\n")
  const first: Packet = parsePacket(f)
  const second: Packet = parsePacket(s)

  console.log(first, "--", second)
  console.log()
  return [first, second]
}

function parsePacket(packetData: string): Packet {
  const packet: Packet = []
  const p: string[] = packetData.split("").filter((str) => str !== ",")
  let temp: number | number[] | undefined
  // remove opening and closing bracket [ ]
  p.shift()
  p.pop()
  for (let i = 0; i < p.length; i++) {
    temp = parseInt(p[i])
    if (temp) packet.push(temp)

    let bracketCounter = 1
    if (p[i] === "[") {
      let j = i + 1
      temp = []
      while (p[j] !== "]") {
        temp.push(parseInt(p[j]))
        j++
      }
      i = j + 1
      packet.push(temp)
    }
  }

  return packet
}
