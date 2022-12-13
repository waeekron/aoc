"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.asyncReadFile = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
async function asyncReadFile(fileName) {
    try {
        const result = await fs_1.promises.readFile((0, path_1.join)(__dirname, fileName), 'utf-8');
        return result;
    }
    catch (error) {
        console.log(error);
        return 'Something went wrong :/';
    }
}
exports.asyncReadFile = asyncReadFile;
