function User(name) {
  this.name = name;
}

User.prototype.sayHi = function () {
  return `Hi ${this.name}`;
};

const u = new User("Hareesh");

console.log(u.sayHi());