const nums = [0, 1, 2, 2, 3, 0, 4, 2];
const val = 2;

// IMP
const removeElement = function (nums, val) {
  let flag = 0;

  for (let num of nums) {
    if (num !== val) {
      nums[flag] = num;
      flag++;
    }
  }
  console.log(nums);
  return flag;
};

console.log(removeElement(nums, val));
