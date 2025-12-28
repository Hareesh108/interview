const p1 = { name: "Harry" };
const p2 = { name: "Harsh" };

function greet(p) {
  console.log(`Hi, ${this.name}...${p}`);
}

greet.call(p1, 10);
const res = greet.bind(p2, 10);
console.log(res);
res()
