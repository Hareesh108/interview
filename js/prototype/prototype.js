function Person(name) {
  this.name = name;
}

Person.prototype.sayHi = function () {
  console.log("Hi, I am " + this.name);
};

const p1 = new Person("Hareesh");

p1.sayHi(); 

p1.__proto__.sayHi.call(p1)