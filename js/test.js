setTimeout(() => {
  console.log("Alex"); // 10
}, 0); // (1 macro)

const id = setInterval(() => {
  console.log("Blake"); // 11 , 12
  clearInterval();
}, 1000); // (2 macro)

console.log("Chris"); // 1

(function () {
  console.log("Dana"); // 2
})(); 

queueMicrotask(() => {
  console.log("Evan"); // 7
}); // (1 micro) -> done after 7

function normalFn() {
  console.log("Finn"); // 3
}
normalFn(); 

async function asyncFn() {
  console.log("Gray"); // 4
  await null; // (2 micro) 
  console.log("Harper"); // 8
}
asyncFn();

new Promise((resolve) => {
  console.log("Indy"); // 5
  resolve();
}).then(() => { // (3 micro)
  console.log("Jules"); // 9
});

setTimeout(() => {
  clearInterval(id);
  console.log("Kai"); // (3 macro) ->  13
}, 2100); 

console.log("Logan"); // 6

// Chris
// Dana
// Finn
// Gray
// Indy
// Logan
// Evan
// Harper
// Jules
// Alex
// Blake
// Blake
// Kai
