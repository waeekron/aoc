"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const grid = (0, fs_1.readFileSync)("in8.txt", "utf-8")
    .split("\n")
    .map((row) => row.split("").map((c) => parseInt(c)));
let count = 0;
let maxScenicScore = 0;
for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
        const treeHeight = grid[y][x];
        // horizontal
        const left = grid[y].slice(0, x);
        const right = grid[y].slice(x + 1, grid[y].length);
        // vertiacl
        const up = [];
        const down = [];
        for (let u = y - 1; u >= 0; u--) {
            up.push(grid[u][x]);
        }
        for (let d = y + 1; d < grid.length; d++) {
            down.push(grid[d][x]);
        }
        if (isVisible(left, treeHeight) ||
            isVisible(right, treeHeight) ||
            isVisible(up, treeHeight) ||
            isVisible(down, treeHeight)) {
            count++;
        }
        const score = scenicScore([left, right, up, down], treeHeight);
        if (maxScenicScore < score)
            maxScenicScore = score;
    }
}
function scenicScore(views, treeHeight) {
    const [left, right, up, down] = views;
    // if (
    //   left.length === 0 ||
    //   right.length === 0 ||
    //   up.length === 0 ||
    //   down.length === 0
    // )
    //   return 0
    let scoreL = left.length === 0 ? 1 : 0, scoreR = right.length === 0 ? 1 : 0, scoreU = up.length === 0 ? 1 : 0, scoreD = down.length === 0 ? 1 : 0;
    for (let i = left.length - 1; i >= 0; i--) {
        scoreL++;
        if (left[i] >= treeHeight)
            break;
    }
    for (let i = 0; i < right.length; i++) {
        scoreR++;
        if (right[i] >= treeHeight)
            break;
    }
    for (let i = 0; i < up.length; i++) {
        scoreU++;
        if (up[i] >= treeHeight)
            break;
    }
    for (let i = 0; i < down.length; i++) {
        scoreD++;
        if (down[i] >= treeHeight)
            break;
    }
    return scoreR * scoreD * scoreL * scoreU;
}
function isVisible(arr, num) {
    let visible = true;
    if (arr.length === 0)
        return visible;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] >= num) {
            visible = false;
            break;
        }
    }
    return visible;
}
console.log(count, maxScenicScore);
