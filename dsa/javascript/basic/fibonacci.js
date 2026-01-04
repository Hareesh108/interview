const findNextNumber = (a, b) => a + b;

const getFibonacciNumbers = (n) => {
  if (n <= 0) {
    return [];
  }

  if (n === 1) {
    return [1];
  }

  const fibo = [1, 2];

  for (let i = 2; i < n; i++) {
    fibo.push(findNextNumber(fibo[i - 1], fibo[i - 2]));
  }

  return fibo;
};

console.log(getFibonacciNumbers(5));

