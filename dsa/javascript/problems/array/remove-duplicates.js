const nums = [0, 0, 1, 1, 1, 2, 2, 3, 3, 4];

// IMP
const removeDuplicates = function (nums) {
  let flag = 0;
  let prev;

  console.log(nums.length / 2,"ll");
  

  for (let num of nums) {
    if (num !== prev) {
      nums[flag] = num;
      flag = flag + 1;
      prev = num;
    }
  }
  console.log(nums);
  return flag;
};

const removeDuplicates1 = function (nums) {
  let flag = 1;

  for (let k = 1; k < nums.length; k++) {
    if (nums[k] !== nums[flag - 1]) {
      nums[flag] = nums[k];

      flag = flag + 1;
    }
  }
  console.log(nums);
  return flag;
};

console.log(removeDuplicates(nums));
console.log(removeDuplicates1(nums));
