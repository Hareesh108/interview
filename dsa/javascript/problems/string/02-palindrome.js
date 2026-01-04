const sPalindrome1 = "Hareesh";
const sPalindrome2 = "HaraH";

// console.log(s.split("").reverse().join(""));

const reverseString = (s) => {
  const str = s.split("");

  for (let i = 0; i < str.length / 2; i++) {
    // const temp = str[i];
    // str[i] = str[str.length - 1 - i];
    // str[str.length - 1 - i] = temp;
    [str[i], str[str.length - 1 - i]] = [str[str.length - 1 - i], str[i]];
  }

  return str.join("") === s;
};

console.log(reverseString(sPalindrome1));
console.log(reverseString(sPalindrome2));
