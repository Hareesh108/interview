function findMaxDifference(arr) {
  // Check if the array has at least two elements.
  if (arr.length < 2) {
    return 0;
  }
  // Initialize both min and max values with the first element of the array.
  let minVal = arr[0];
  let maxVal = arr[0];
  // Iterate through the array starting from the second element in a single pass.
  for (let i = 1; i < arr.length; i++) {
    // Check if the current element is smaller than the current minimum value.
    if (arr[i] < minVal) {
      minVal = arr[i];
    } else if (arr[i] > maxVal) {
      maxVal = arr[i];
    }
  }
  // The result is the difference between the maximum and minimum values found.
  return maxVal - minVal;
}

const array = [2, 5, 6, 7];

const res = findMaxDifference(array);
console.log(res);

console.log(Math.sqrt(16));



function factorial(n) { 
   if (n === 0) { return 1; } 
   return n * factorial(n - 1); 
}

console.log(factorial(12));


function fibonacciSequence(n) {
    // Handle edge cases for n < 2.
    if (n <= 0) {
        return [];
    } else if (n === 1) {
        return [0];
    }

    // Initialize the sequence with the first two numbers.
    const sequence = [0, 1];
    // Use a loop to generate the remaining numbers.
    for (let i = 2; i < n; i++) {
        // Each new number is the sum of the previous two numbers in the sequence.
        const nextNumber = sequence[i - 1] + sequence[i - 2];
        console.log(sequence[i - 1]);
        
        sequence.push(nextNumber);
    }
    // Return the resulting Fibonacci sequence.
    return sequence;
}

console.log(fibonacciSequence(4));
