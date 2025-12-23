const promise11 = new Promise(() => {});

const promise = Promise.resolve(new Promise((res) => {
    res("lkkl")
}));

console.log(promise);

promise.then((value) => console.log("value:",value))

const promise1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("foo");
  }, 300);
});

promise1.then((value) => {
  console.log(value);
});

console.log("promise1:",promise1);


// console.log(Promise.resolve("Hello"));
// console.log(  Promise.resolve("Hello") instanceof Promise);


