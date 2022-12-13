"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const data = (0, fs_1.readFileSync)("in5.txt", "utf-8").split("\n");
const i = data.indexOf("");
const crates = data.slice(0, i);
const moves = data.slice(i).filter((s) => s !== "");
const CRATE_MOVER_9001 = true; // if false -> solves for part1
let crates2d = crates
    .map((str) => str.replace(/\[|\]/g, " "))
    .map((str) => str.split(""));
crates2d.pop();
crates2d = transpose(crates2d).filter((row) => row.join().replaceAll(",", "").trim() !== "");
const movedCrates = move(crates2d, moves);
const topCrates = movedCrates.map(pickTopOne).join("");
console.log("Solution:", topCrates);
function transpose(matrix) {
    const transposed = [];
    for (let k = 0; k < matrix[0].length; k++) {
        transposed[k] = new Array(matrix.length);
    }
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[0].length; j++) {
            transposed[j][i] = matrix[i][j];
        }
    }
    return transposed;
}
function parseMoves(moves) {
    const parsed = moves.map((move) => move
        .replaceAll(new RegExp("move | from | to | ' '", "g"), " ")
        .trim()
        .split(" ")
        .map((str) => parseInt(str)));
    const transposed = transpose(parsed);
    const amounts = transposed[0];
    const origins = transposed[1];
    const destinations = transposed[2];
    return [amounts, origins, destinations];
}
function move(crates, moves) {
    const [amounts, origins, destinations] = parseMoves(moves);
    for (let i = 0; i < moves.length; i++) {
        const amount = amounts[i], origin = origins[i] - 1, destination = destinations[i] - 1;
        const { taken, stack } = take(crates[origin], amount);
        // remove the empty ones in destination
        crates[destination] = [
            ...taken,
            ...crates[destination].filter((c) => c !== " "),
        ];
        crates[origin] = stack;
    }
    return crates;
}
function take(stack, amount) {
    const taken = [];
    const newStack = stack.concat();
    let index = 0;
    while (amount > 0 && index < stack.length) {
        if (stack[index] !== " ") {
            taken.push(stack[index]);
            newStack[index] = " ";
            amount -= 1;
        }
        index++;
    }
    if (!CRATE_MOVER_9001) {
        taken.reverse();
    }
    return { taken, stack: newStack };
}
function pickTopOne(crates) {
    return crates.filter((c) => c !== " ")[0];
}
