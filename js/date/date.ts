const test = new Date();

// console.log(test);
// console.log(String(test));

// const test1 = Date();
// console.log(test1);

// console.log(Date.now());
// console.log(Date.parse(test1));

// const myBirthDay = new Date(1999, 6, 20, 11, 30, 40, 100);
// console.log(myBirthDay);
// console.log(String(myBirthDay));

const birth = new Date("Tue Jul 20 1999 11:30:40")

console.log(birth);

console.log(birth.getDate());
console.log(birth.getDay());
console.log(birth.getFullYear());
console.log(birth.getHours());
console.log(birth.getMilliseconds());
console.log(birth.getMinutes());
console.log(birth.getMonth());
console.log(birth.getSeconds());
console.log(birth.getTime());
console.log(birth.getTimezoneOffset());
console.log(birth.getUTCDate());
console.log(birth.getUTCDay());
console.log(birth.getUTCFullYear());

console.log(birth.toJSON());
console.log(birth.toString());
console.log(birth.toTimeString());
console.log(birth.valueOf());
console.log(birth[Symbol.toPrimitive]("string"));




