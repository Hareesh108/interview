const TEST = [
  { name: "Harsh", age: 20 },
  { name: "John", age: 25 },
  { name: "Jane", age: 30 },
  { name: "Keshav", age: 16 },
  { name: "Rahul", age: 28 },
];

const sortMe = () => {
  return TEST.sort((a, b) => a.age - b.age);
};


console.log(sortMe());

module.exports = { sortMe };