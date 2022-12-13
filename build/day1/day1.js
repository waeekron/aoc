"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
// Find the elf carrying the most calories =)
const fs = __importStar(require("fs"));
const values = fs
    .readFileSync('input1.txt', { encoding: 'utf-8' })
    .split('\n\n')
    .map((data) => data.split('\n'))
    .map((data) => stringArrayToNumber(data))
    .map((nums) => nums.reduce((accumulator, currentValue) => accumulator + currentValue), 0);
console.log(maxValue(values));
console.log(sumOfThreeLargest(values));
function sumOfThreeLargest(arr) {
    const sorted = arr.sort((a, b) => b - a);
    return sorted[0] + sorted[1] + sorted[2];
}
function maxValue(arr) {
    let valueAndIndex = [0, 0];
    for (const [i, value] of arr.entries()) {
        if (value > valueAndIndex[1])
            valueAndIndex = [i, value];
    }
    return valueAndIndex;
}
function stringArrayToNumber(arr) {
    let nums = new Array();
    try {
        nums = arr.map((str) => parseInt(str));
    }
    catch (error) {
        console.log('Bad input!!!');
    }
    return nums;
}
