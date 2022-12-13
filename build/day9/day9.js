"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const commands = (0, fs_1.readFileSync)("in9.txt", "utf-8")
    .split("\n")
    .map((line) => {
    const [direction, steps] = line.split(" ");
    return [direction, parseInt(steps)];
});
const tailLocations = new Set();
const headLocations = new Set();
const knots = [];
for (let i = 0; i < 10; i++) {
    knots.push({ x: 0, y: 0 });
}
for (const [direction, steps] of commands) {
    let i = 0;
    // move the head
    while (i < steps) {
        //up
        if (direction === "U") {
            knots[0].y++;
            //   head1.y++
        }
        //down
        if (direction === "D") {
            knots[0].y--;
            //   head1.y--
        }
        //left
        if (direction === "L") {
            knots[0].x--;
            //   head1.x--
        }
        //right
        if (direction === "R") {
            knots[0].x++;
            //   head1.x++
        }
        for (let j = 1; j < knots.length; j++) {
            const head = knots[j - 1];
            let tail = knots[j];
            const distance = Math.sqrt(Math.pow(head.x - tail.x, 2) + Math.pow(head.y - tail.y, 2));
            if (distance > 1) {
                //up
                if (direction === "U" && distance !== 1.4142135623730951) {
                    if (head.x !== tail.x) {
                        tail = { x: head.x, y: head.y - 1 };
                    }
                    else {
                        tail.y++;
                    }
                }
                //down
                if (direction === "D" && distance !== 1.4142135623730951) {
                    if (head.x !== tail.x) {
                        tail = { x: head.x, y: head.y + 1 };
                    }
                    else {
                        tail.y--;
                    }
                }
                //left
                if (direction === "L" && distance !== 1.4142135623730951) {
                    if (head.y !== tail.y) {
                        tail = { x: head.x + 1, y: head.y };
                    }
                    else {
                        tail.x--;
                    }
                }
                //right
                if (direction === "R" && distance !== 1.4142135623730951) {
                    if (head.y !== tail.y) {
                        tail = { x: head.x - 1, y: head.y };
                    }
                    else {
                        tail.x++;
                    }
                }
                knots[j] = tail;
            }
            if (j === 9)
                tailLocations.add(`${tail.x},${tail.y}`);
        }
        i++;
    }
}
console.log(headLocations.size, tailLocations, tailLocations.size);
