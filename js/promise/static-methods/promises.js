"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.promise4 = exports.promise3 = exports.promise2 = exports.promise1 = void 0;
exports.promise1 = new Promise(function (resolve, reject) {
    setTimeout(function () {
        resolve("Resolved1");
    }, 2000);
});
exports.promise2 = new Promise(function (resolve, reject) {
    setTimeout(function () {
        reject(new Error("API error"));
    }, 2000);
});
exports.promise3 = new Promise(function (resolve, reject) {
    setTimeout(function () {
        resolve("Resolved2");
    }, 3000);
});
exports.promise4 = new Promise(function (resolve, reject) {
    setTimeout(function () {
        resolve("Resolved3");
    }, 3000);
});
