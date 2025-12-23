const reverseString = (str) => str.split("").reverse().join("");

console.log(reverseString("Hareesh"));

const checkPalindrome = (str) => {
  const rev = reverseString(str);

  return rev === str;
};

console.log(checkPalindrome("hrh"));

