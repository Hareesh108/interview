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
// console.log(num.unshift(0));
// console.log(num);


// console.log(num.slice(1, 3));
// console.log(num.slice(1, -2));
// console.log(num.slice(1));

// array.splice(startIndex, deleteCount, item1, item2, ...)
// startIndex → where to start changing the array
// deleteCount → how many elements to remove
// items → elements to insert (optional)

const months = ["Jan", "March", "April", "June"];
months.splice(1, 0, "Feb");
// Inserts at index 1
console.log(months);
// Expected output: Array ["Jan", "Feb", "March", "April", "June"]

months.splice(4, 1, "May");
console.log(months);
// Replaces 1 element at index 4
// Expected output: Array ["Jan", "Feb", "March", "April", "May"]

months.splice(5, 1, "July");
console.log(months);

months.splice(0);
console.log(months);

console.log(num.splice(1, 2));
console.log(num.splice(1, 3));
console.log(num.splice(1,-1));

// console.log(num.some((i) => i % 2 === 2));

// const checkSort = [3, 2, 8, 4, 82, 0];
// console.log(checkSort.sort());
// console.log(
//   checkSort.sort((first, second) => {
//     console.log(first, second);

//     return first - second;
//   })
// );

// console.log(num.toReversed());
// console.log(num.toSorted());

// console.log(num.toSpliced(1, 2, 6));
// console.log(num.toString());


// console.log(num.values().next().value);

// console.log(num.with(2, 6));

// console.log(num[Symbol.iterator]().next().value);

// console.log(num.length);

// console.log(num[Symbol.unscopables].values);



