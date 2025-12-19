// const promise = new Promise(() => {});
const promise = Promise.resolve(new Promise((res) => {
    res("lkkl")
}));

console.log(promise);

promise.then((value) => console.log(value))

const promise1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("foo");
  }, 300);
});

promise1.then((value) => {
  console.log(value);
  // Expected output: "foo"
});

console.log(promise1);
// Expected output: [object Promise]


// console.log(Promise.resolve("Hello"));
// console.log(  Promise.resolve("Hello") instanceof Promise);


