"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const letterToHandMap = {
    A: 'rock',
    X: 'rock',
    B: 'paper',
    Y: 'paper',
    C: 'scissors',
    Z: 'scissors',
};
const valueMap = {
    rock: 1,
    paper: 2,
    scissors: 3,
};
let values = new Array([]);
try {
    values = fs_1.default
        .readFileSync('input2.txt', 'utf-8')
        .split('\n')
        .map((row) => row.split(' '));
}
catch (err) {
    console.error(err);
}
/**
 *
 * @param a Hand
 * @param b Hand
 * @returns Winner
 */
function rockPaperScissors(a, b) {
    if (a === 'rock' && b === 'scissors')
        return a;
    if (a === 'scissors' && b === 'rock')
        return b;
    if (a === 'rock' && b === 'paper')
        return b;
    if (a === 'paper' && b === 'rock')
        return a;
    if (a === 'scissors' && b === 'paper')
        return a;
    if (a === 'paper' && b === 'scissors')
        return b;
    console.log('draw', a, b);
    return null; // draw
}
function changeLetter(letter) {
    if (letter === 'X')
        return 'Y';
    if (letter === 'Y')
        return 'Z';
    if (letter === 'Z')
        return 'X';
    return letter;
}
/**
 * x -> lose
 * y -> draw
 * z -> win
 */
function mutateValues(values) {
    const newVals = [];
    for (const row of values) {
        const opponentLetter = row[0];
        const instruction = row[1];
        let myLetter = row[1];
        let myHand = letterToHandMap[myLetter];
        const opponentsHand = letterToHandMap[opponentLetter];
        let result = rockPaperScissors(myHand, opponentsHand);
        //we need to lose
        if (instruction === 'X') {
            //change our hand to one that loses
            while (result !== opponentsHand) {
                myLetter = changeLetter(myLetter);
                myHand = letterToHandMap[myLetter];
                result = rockPaperScissors(myHand, opponentsHand);
            }
        }
        if (instruction === 'Y') {
            myLetter = opponentLetter;
        }
        if (instruction === 'Z') {
            while (result !== myHand) {
                myLetter = changeLetter(myLetter);
                myHand = letterToHandMap[myLetter];
                result = rockPaperScissors(myHand, opponentsHand);
            }
        }
        newVals.push([opponentLetter, myLetter]);
    }
    console.log({ newVals, values });
    return newVals;
}
function countTotalScore(values) {
    let mySum = 0, opponentSum = 0;
    for (const row of values) {
        const [opponentLetter, myLetter] = row;
        const myHand = letterToHandMap[myLetter];
        const myHandVal = valueMap[myHand];
        const opponentsHand = letterToHandMap[opponentLetter];
        const opponentsHandVal = valueMap[opponentsHand];
        const result = rockPaperScissors(myHand, opponentsHand);
        if (result === null) {
            mySum += myHandVal + 3;
            opponentSum += opponentsHandVal + 3;
            continue;
        }
        if (result === myHand) {
            mySum += myHandVal + 6;
            opponentSum += opponentsHandVal;
            continue;
        }
        mySum += myHandVal;
        opponentSum += 6 + opponentsHandVal;
    }
    return { score1: mySum, score2: opponentSum };
}
console.log(countTotalScore(values));
console.log(countTotalScore(mutateValues(values)));
