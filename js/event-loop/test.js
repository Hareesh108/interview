console.log("A");

Promise.resolve().then(() => {
  console.log("B");
});

setTimeout(() => {
  console.log("C");
}, 0);

console.log("D");


console.log("1");

Promise.resolve().then(() => {
  console.log("2");
  Promise.resolve().then(() => {
    console.log("3");
  });
});

console.log("4");


async function test() {
  console.log("X");

  await Promise.resolve();
  console.log("Y");

  setTimeout(() => console.log("Z"), 0);
}

test();

console.log("W");


console.log("start");

setTimeout(() => {
  console.log("timeout 1");
}, 10);

setTimeout(() => {
  console.log("timeout 2");
}, 0);

Promise.resolve().then(() => console.log("microtask"));

console.log("end");


console.log("A");

setTimeout(() => {
  console.log("B");

  Promise.resolve().then(() => console.log("C"));
}, 0);

console.log("D");
