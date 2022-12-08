"use strict";
exports.__esModule = true;
var fs_1 = require("fs");
var grid = (0, fs_1.readFileSync)("in8.txt", "utf-8")
    .split("\n")
    .map(function (row) { return row.split("").map(function (c) { return parseInt(c); }); });
// eslint-disable-next-line @typescript-eslint/no-explicit-any
var grid2 = grid.concat();
console.log(grid2);
var count = 0; //4 * grid.length - 4 //* (grid[0].length - 2)
for (var y = 0; y < grid.length; y++) {
    for (var x = 0; x < grid[y].length; x++) {
        var treeHeight = grid[y][x];
        // horizontal
        var left = grid[y].slice(0, x);
        var right = grid[y].slice(x + 1, grid[y].length);
        // vertiacl
        var up = [];
        var down = [];
        for (var u = y - 1; u >= 0; u--) {
            up.push(grid[u][x]);
        }
        for (var d = y + 1; d < grid.length; d++) {
            down.push(grid[d][x]);
        }
        // console.log(
        //   { up },
        //   treeHeight,
        //   { down },
        //   { up: isVisible(up, treeHeight) },
        //   { down: isVisible(down, treeHeight) }
        // )
        // console.log()
        // console.log(
        //   { left },
        //   treeHeight,
        //   { right },
        //   { left: isVisible(left, treeHeight) },
        //   { right: isVisible(right, treeHeight) }
        // )
        // console.log("---------------------------------------------")
        // console.log(treeHeight, down)
        if (isVisible(left, treeHeight) ||
            isVisible(right, treeHeight) ||
            isVisible(up, treeHeight) ||
            isVisible(down, treeHeight)) {
            grid2[y][x] = "!";
            count += 1;
        }
    }
}
function isVisible(arr, num) {
    return arr.find(function (n) {
        return n >= num;
    })
        ? false
        : true;
}
console.log(count, grid2);
