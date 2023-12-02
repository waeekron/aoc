import { readFileSync } from "fs"
import { EventEmitter } from "stream"
// 20th, 60th, 100th, 140th, 180th, and 220th
const RECORD_CYCLES = [20, 60, 100, 140, 180, 220]
const data = readFileSync("in10.txt", "utf-8")
  .split("\n").map(row => row.split(" "))

class Instruction {
  cyclesRemaining = 2
  type: string
  value: number
  constructor(value: number, type: string) {
    this.value = value
    this.type = type
    if (type === 'noop') this.cyclesRemaining = 1
  }
  pulse(): boolean {
    console.log('pulse')
    this.cyclesRemaining--
    if(this.cyclesRemaining !== -1) return true
    return false
  }
}
// 1 + 15 - 11 + 6 - 3 + 5 - 1 - 8 + 13 + 4
class Runner extends EventEmitter {
  signalsStrengths: number[] = []
  addx = 1
  programCounter = 1
  executionUnit: Instruction | null
  instructions: Instruction[] = []
  constructor(data: string[][]) {
    super()
    this.executionUnit = null
    this.instructions = data.map(([instruction, value]) => {
      return new Instruction(parseInt(value), instruction)
    })
    
  }
  tick() {
    while(this.executionUnit?.pulse()) {
      if (RECORD_CYCLES.includes(this.programCounter)) this.signalsStrengths.push(this.addx * this.programCounter)
      this.programCounter++
    }
    if (this.executionUnit)
      this.addx +=  this.executionUnit.value
    
  }
  run() {
    for (const instruction of this.instructions) {
      if (instruction.type === 'noop') this.executionUnit = new Instruction(0, 'noop')
      if (instruction.type === 'addx') this.executionUnit = new Instruction(instruction.value, 'addx')
      this.tick()
      console.log('tick:' + this.programCounter, this.addx)
    }
  }
}

const runner = new Runner(data);
runner.run()
console.log(runner.addx, runner.programCounter, runner.signalsStrengths)
//console.log(runner.instructions)
console.log(runner.signalsStrengths.reduce((p, c) => p+c))