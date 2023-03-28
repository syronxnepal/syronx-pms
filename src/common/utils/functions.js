"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Capitalize = exports.RandomWords = exports.getFirstWord = exports.getDirectories = exports.isDirectory = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
const isDirectory = (source) => (0, fs_1.lstatSync)(source).isDirectory();
exports.isDirectory = isDirectory;
const getDirectories = (source) => (0, fs_1.readdirSync)(source).filter((name) => (0, exports.isDirectory)((0, path_1.join)(source, name)));
exports.getDirectories = getDirectories;
const getFirstWord = (str) => {
    let acronym = str.split(/\s/).reduce((response, word) => response += word.slice(0, 1), '').toUpperCase();
    return acronym;
};
exports.getFirstWord = getFirstWord;
const RandomWords = () => {
    let r = (Math.random() + 1).toString(36).substring(7);
    return r;
};
exports.RandomWords = RandomWords;
const Capitalize = (str) => {
    const arr = str.split(" ");
    for (var i = 0; i < arr.length; i++) {
        arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
    }
    return arr.join(" ");
};
exports.Capitalize = Capitalize;
//# sourceMappingURL=functions.js.map