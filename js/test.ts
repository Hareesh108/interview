const arrTest: number[] = [1, 2, 3, 2, 4, 1];

const unique1 = [];
const visited1: Record<number, boolean> = {};

for (const num of arrTest) {
  if (!visited1[num]) {
    visited1[num] = true;
    unique1.push(num);
  }
}

console.log(unique1);
