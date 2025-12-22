// IMPLICIT

const implicit = {
  username: "Hareesh",
  greet() {
    console.log("this value:", this.username);
  },
};

implicit.greet();

// EXPLICIT

const explicit1 = { username: "Harry" };
const explicit2 = { username: "Prince" };

function greet(message, punct) {
  console.log(`${message}, my name is ${this.username}${punct}`);
}

// 1. call(): Invoke immediately with individual arguments
greet.call(explicit1, "Hello", "!"); // Output: Hello, my name is Alice!

// 2. apply(): Invoke immediately with arguments in an array
greet.apply(explicit2, ["Hi", "."]); // Output: Hi, my name is Bob.

// 3. bind(): Create a new function for later use
const greetHarry = greet.bind(explicit1, "Hey");
greetHarry("!"); // Output: Hey, my name is Alice!
// The "!" argument here is appended to the "Hey" argument provided during bind().

// CONSTRUCTOR BINDING

function Person(name) {
  this.name = name;
  console.log(`Hello, ${this.name}!`);
}

const p1 = new Person("Harsh");

class Person1 {
  constructor(name) {
    this.name = name;
    console.log(name);
  }

  greet() {
    console.log(`${this.name}, My name`);
    
  }
}

const p2 = new Person1("Harry!!");
p2.greet()
