function Person(name) {
  // => new Person(...) creates an empty object {}
  // => `this` is bound to that new object
  // => property `name` is assigned on the instance
  this.name = name;
}

Person.prototype.sayHi = function () {
  // => `this` is determined by HOW the function is called
  console.log("Hi, I am " + this.name);
};

const p1 = new Person("Hareesh");
// => create empty object {}
// => set p1.__proto__ = Person.prototype
// => call Person with `this = p1`
// => p1 = { name: "Hareesh" }

p1.sayHi();
// => lookup "sayHi" on p1 (not found)
// => lookup on p1.__proto__ (Person.prototype) → found
// => call sayHi with `this = p1`
// => output: "Hi, I am Hareesh"

p1.__proto__.sayHi.call(p1);
// => access p1.__proto__ → Person.prototype
// => get sayHi function
// => call sayHi with explicit `this = p1`
// => output: "Hi, I am Hareesh"
