const harsh = "Hareesh"

// console.log(harsh.charAt(0));
// console.log(harsh.charCodeAt());

// console.log(harsh.includes("e"));
// console.log(harsh.indexOf("e"));
// console.log(harsh.lastIndexOf("e"));

// const regex = /[A-Z]/g;
// const found = harsh.match(/[a-z]/g);
const found = [...harsh.matchAll(/H(a)/g)];

// console.log(found);


// console.log(harsh.padEnd(8,"."));
// console.log(harsh.padStart(8,"*"));

// console.log(harsh.repeat(2));
// console.log(harsh.replace("e","E"));
// console.log(harsh.replaceAll("e","E"));


// console.log(harsh.search("e"));

// console.log(harsh.slice(2,4));
// console.log(harsh.slice(2));
// console.log(harsh.slice(-2));
// console.log(harsh.slice(-4,-2));

console.log(harsh.split(""));

const str = "The quick brown fox jumps over the lazy dog.";

const words = str.split(" ");
console.log(words);
console.log(words[2]);
