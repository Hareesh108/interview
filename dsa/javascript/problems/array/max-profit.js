const prices = [7, 1, 5, 3, 6, 4];
const prices1 = [7, 6, 4, 3, 1];

const maxProfit = function (prices) {
  let min = prices[0];
  let profit = 0;

  for (let i = 1; i < prices.length; i++) {
    if (prices[i] - min > profit) {
      profit = prices[i] - min;
    }

    if (min > prices[i]) {
      min = prices[i];
    }
  }

  return profit;
};

console.log(maxProfit(prices));
console.log(maxProfit(prices1));
