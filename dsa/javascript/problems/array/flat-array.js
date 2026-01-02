const arr = [1, 2, 3, [4, 5, [6, 7, [10, [11]]], 8], 9];

console.log(arr);
console.log(arr.flat(3));

const flatArray = (arr, res = []) => {
  for (let i = 0; i < arr.length; i++) {
    if (!Array.isArray(arr[i])) {
      res.push(arr[i]);
    } else {
      flatArray(arr[i], res);
    }
  }

  return res;
};

console.log(flatArray(arr));

const flatArrayReduce = (arr) =>
  arr.reduce(
    (acc, item) =>
      Array.isArray(item) ? acc.concat(flatArrayReduce(item)) : acc.concat(item),
    []
  );

console.log(flatArrayReduce(arr));
