const sRev = "Hareesh";

// console.log(s.split("").reverse().join(""));

const reverseString = (s) => {
  const str = s.split("");

  for (let i = 0; i < str.length / 2; i++) {
    // const temp = str[i];
    // str[i] = str[str.length - 1 - i];
    // str[str.length - 1 - i] = temp;
    [str[i], str[str.length - 1 - i]] = [str[str.length - 1 - i], str[i]];
  }

  return str.join("");
};

console.log(reverseString(sRev));
