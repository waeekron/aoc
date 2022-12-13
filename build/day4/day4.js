"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const lines = fs_1.default.readFileSync("input4.txt", "utf-8").split("\n");
const parseLine = (line) => {
    const [left, right] = line
        .split(",")
        .map((el) => el.split("-"))
        .map((numsString) => {
        return numsString.map((str) => parseInt(str));
    });
    return [left, right];
};
const isContained = (pair) => {
    const [left, right] = pair;
    // if left fits in right
    if (left[0] >= right[0] && left[1] <= right[1])
        return true;
    // if right fits in left
    if (left[0] <= right[0] && left[1] >= right[1])
        return true;
    return false;
};
const isOverlap = (pair) => {
    const [left, right] = pair;
    const [start1, end1] = left, [start2, end2] = right;
    return !(end1 < start2 || end2 < start1);
};
const countOfFullyContainedPairs = lines
    .map(parseLine)
    .filter(isContained).length;
const overlapCount = lines.map(parseLine).filter(isOverlap).length;
console.log(countOfFullyContainedPairs);
console.log(overlapCount);
