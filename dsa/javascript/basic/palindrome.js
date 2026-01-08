const reverseString = (str) => str.split("").map((item)=>{
  console.log(typeof item);
  return item.toUpperCase()
  
}).reverse().join("");

console.log(reverseString("Hareesh"));

const checkPalindrome = (str) => {
  const rev = reverseString(str);

  return rev === str;
};

console.log(checkPalindrome("hrh"));

