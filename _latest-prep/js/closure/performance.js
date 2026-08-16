function Outer() {
  this.name = 'Hareesh';
}

Outer.prototype.getName = () => {
  return this.name;
};

const res = new Outer();

console.log(res.getName());

const result = 0 * -1;
console.log(result);
