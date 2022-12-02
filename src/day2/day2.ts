import fs from 'fs'
/**
 * Scoring system
 * win 6p
 * draw 3
 * loss 0
 *
 * rock 1
 * paper 2
 * scissors 3
 *
 * x -> lose
 * y -> draw
 * z -> win
 */

type Hand = 'rock' | 'paper' | 'scissors'
type Instruction = 'X' | 'Y' | 'Z'
type Letter = 'A' | 'B' | 'C' | 'X' | 'Y' | 'Z'
const letterToHandMap: Record<Letter, Hand> = {
  A: 'rock',
  X: 'rock',
  B: 'paper',
  Y: 'paper',
  C: 'scissors',
  Z: 'scissors',
}
const valueMap: Record<Hand, number> = {
  rock: 1,
  paper: 2,
  scissors: 3,
}

let values: Letter[][] = new Array<Letter[]>([])

try {
  values = fs
    .readFileSync('input2.txt', 'utf-8')
    .split('\n')
    .map((row: string) => row.split(' ') as Letter[])
} catch (err) {
  console.error(err)
}

/**
 *
 * @param a Hand
 * @param b Hand
 * @returns Winner
 */
function rockPaperScissors(a: Hand, b: Hand): Hand | null {
  if (a === 'rock' && b === 'scissors') return a
  if (a === 'scissors' && b === 'rock') return b
  if (a === 'rock' && b === 'paper') return b
  if (a === 'paper' && b === 'rock') return a
  if (a === 'scissors' && b === 'paper') return a
  if (a === 'paper' && b === 'scissors') return b
  console.log('draw', a, b)
  return null // draw
}

function changeLetter(letter: Instruction): Instruction {
  if (letter === 'X') return 'Y'
  if (letter === 'Y') return 'Z'
  if (letter === 'Z') return 'X'
  return letter
}

/**
 * x -> lose
 * y -> draw
 * z -> win
 */
function mutateValues(values: Letter[][]): Letter[][] {
  const newVals: Letter[][] = []
  for (const row of values) {
    const opponentLetter = row[0]
    const instruction = row[1]
    let myLetter = row[1]
    let myHand = letterToHandMap[myLetter]
    const opponentsHand = letterToHandMap[opponentLetter]
    let result = rockPaperScissors(myHand, opponentsHand)

    //we need to lose
    if (instruction === 'X') {
      //change our hand to one that loses
      while (result !== opponentsHand) {
        myLetter = changeLetter(myLetter as Instruction)
        myHand = letterToHandMap[myLetter]
        result = rockPaperScissors(myHand, opponentsHand)
      }
    }
    if (instruction === 'Y') {
      myLetter = opponentLetter
    }
    if (instruction === 'Z') {
      while (result !== myHand) {
        myLetter = changeLetter(myLetter as Instruction)
        myHand = letterToHandMap[myLetter]
        result = rockPaperScissors(myHand, opponentsHand)
      }
    }
    newVals.push([opponentLetter, myLetter])
  }

  console.log({ newVals, values })
  return newVals
}
function countTotalScore(values: Letter[][]): {
  score1: number
  score2: number
} {
  let mySum = 0,
    opponentSum = 0

  for (const row of values) {
    const [opponentLetter, myLetter] = row
    const myHand = letterToHandMap[myLetter]
    const myHandVal = valueMap[myHand]
    const opponentsHand = letterToHandMap[opponentLetter]
    const opponentsHandVal = valueMap[opponentsHand]

    const result: Hand | null = rockPaperScissors(myHand, opponentsHand)
    if (result === null) {
      mySum += myHandVal + 3
      opponentSum += opponentsHandVal + 3
      continue
    }
    if (result === myHand) {
      mySum += myHandVal + 6
      opponentSum += opponentsHandVal
      continue
    }

    mySum += myHandVal
    opponentSum += 6 + opponentsHandVal
  }
  return { score1: mySum, score2: opponentSum }
}

console.log(countTotalScore(values))
console.log(countTotalScore(mutateValues(values)))
