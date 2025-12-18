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
for (let [index, value] of iterator) {
  console.log(index);
  console.log(value);
}

console.log(iterator);
