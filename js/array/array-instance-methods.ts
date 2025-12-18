const me = ["Hareesh", "Parasu"];
const num = [1, 2, 3, 4];

// console.log(num.at(2));
// console.log(num.at(-1));

// console.log(num.concat(5));
// console.log(num.concat([5,6]));
// console.log(num.concat(5,6));

// console.log(num.copyWithin(0, 2, 3));
// console.log(num.copyWithin(0, 2));

const array = ["a", "b", "c"];

const iterator = array.entries();

// index and value needs to be together then we can use it.
// for (let [index, value] of iterator) {
//   console.log(index);
//   console.log(value);
// }

// console.log(iterator);

// console.log(num.entries().next().value);

// console.log(num.every((i)=> i === 2));

// console.log(num);
// console.log(num.fill(5, 1, 3));
// console.log(num.fill(5, 1));
// console.log(num.fill(5));

// console.log(num.filter((i) => i !== 2));
// console.log(
//   num.filter(
//     function (this: { remove: number }, i) {
//       return i !== this.remove;
//     },
//     {
//       remove: 4,
//     }
//   )
// );

// console.log(num.find((i) => i <= 3));
// console.log(num.find((i) => i === 7));
// console.log(num.findIndex((i) => i <=3 ));
// console.log(num.findIndex((i) => i === 7));
// console.log(num.findLast((i) => i <= 3));
// console.log(num.findLast((i) => i === 7));
// console.log(num.findLastIndex((i) => i <=3 ));
// console.log(num.findIndex((i) => i === 7));

// const checkFlat = [1, [2, [3, [4]]]];
// console.log(checkFlat.flat());
// console.log(checkFlat.flat(2));
// console.log(checkFlat.flat(Infinity));

// console.log(num.map((i) => i).flat(1)); // default 1
// console.log(num.flatMap((i) => i));
// console.log("new:",num.flatMap((i) => [i, i * 2]));
// console.log("old:",num);

// num.forEach((i) => console.log(i))

// console.log(num.includes(2));
// console.log(num.includes(2,9));
// console.log(num.includes(2,-1));
// console.log([,num].includes(undefined));

// console.log(num.indexOf(4));
// console.log(num.indexOf(4, 5));
// console.log(num.indexOf(4, 1));

// console.log(num.join());
// console.log(num.join(""));
// console.log(num.join(">"));

// console.log(num.keys().next().value);

// console.log(num.lastIndexOf(2));
// console.log(num.lastIndexOf(9));

// console.log(num.map((i) => i * 2));
// console.log(num);

// num.pop();
// console.log(num);
// num.push(5);
// console.log(num);
// num.push(5, 6);
// console.log(num);

// console.log(num.reduce((prev, cur) => prev + cur, 0));
// console.log(me.reduce((prev, cur) => prev + cur, ""));
// console.log(me.reduceRight((prev, cur) => prev + cur, ""));

// console.log(num.reverse());
// console.log([,3].reverse());

// console.log(num.shift());

// console.log(num.slice(1, 3));
// console.log(num.slice(1, -2));
// console.log(num.slice(1));

// console.log(num.splice(1, 2));
// console.log(num.splice(1, 3));
console.log(num.splice(1,-1));
