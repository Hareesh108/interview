const isPrime = (num) => {
  if (num === 2) {
    return true;
  }

  if (num <= 1 || num % 2 === 0) {
    return false;
  }

  for (let i = 3; i <= Math.sqrt(num); i += 2) {
    if (num % i === 0) {
      return false;
    }
  }

  return true;
};

console.log(isPrime(5));

const getPrimeNumbers = (n) => {
  const primeList = [];

  let num = 2;

  while (primeList.length < n) {
    if (isPrime(num)) {
      primeList.push(num);
    }
    num++;
  }
  return primeList;
};

console.log(getPrimeNumbers(5));

const getRangePrimeNumbers = (start, end) => {
  const primeList = [];

  for (let k = start; k < end; k++) {
    if (isPrime(k)) {
      primeList.push(k);
    }
  }

  return primeList;
};

console.log(getRangePrimeNumbers(5, 15));
