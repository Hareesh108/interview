// const test = new Array()
const test = Array();

console.log(test);

// console.log(Array.from("foo"));

const set = new Set([1, 2, 3]);
Array.from(set);

const str = "a1b2c3";

const digits = Array.from(str.matchAll(/\d/g), (match) => Number(match[0]));

// const multiplier = {
//   factor: 10,
// };

// const result = Array.from(
//   [1, 2, 3],
//   function (num) {
//     return num * this.factor;
//   },
//   multiplier
// );

// console.log(result);


// const test2 = []
// console.log(0 in test2);
