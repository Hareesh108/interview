console.log("sync: start");

// ---------------- SYNCHRONOUS ----------------

// IIFE (Immediately Invoked Function Expression)
(function () {
  console.log("sync: IIFE");
})();

// normal function
function normalFn() {
  console.log("3️⃣ sync: normal function");
}
normalFn();

// new Promise executor (SYNC part!)
new Promise((resolve) => {
  console.log("sync: Promise constructor");
  resolve();
}).then(() => {
  console.log("microtask: Promise.then");
});

// async / await (SYNC until await)
async function asyncFn() {
  console.log("sync: async function start");
  await null; // creates a microtask
  console.log("microtask: after await");
}
asyncFn();

// ---------------- MICROTASKS ----------------

// explicit microtask
queueMicrotask(() => {
  console.log("microtask: queueMicrotask");
});

// browser-only microtask
// const observer = new MutationObserver(() => {
//   console.log("microtask: MutationObserver");
// });
// const div = document.createElement("div");
// observer.observe(div, { childList: true });
// div.textContent = "change";

// ---------------- MACROTASKS ----------------

setTimeout(() => {
  console.log("macrotask: setTimeout");
}, 0);

const id = setInterval(() => {
  console.log("❌ macrotask: setInterval (later)");
  clearInterval();
}, 1000);

setTimeout(() => {
  clearInterval(id);
  console.log("macrotask: setInterval stopped");
}, 2100);

// DOM event (macrotask)
// document.addEventListener("click", () => {
//   console.log("🖱 macrotask: click event");
// });

console.log("sync: end");


// 1. Run all synchronous code (call stack) 
// 2. Run ALL microtasks 
// 3. Run ONE macrotask 
// 4. Repeat