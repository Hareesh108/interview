---

# 📄 JavaScript Functions — 1-Page Cheat Sheet

## 🧠 Core Idea

**Functions are first-class citizens in JavaScript**, meaning they can be:

* Assigned to variables
* Passed as arguments
* Returned from functions

This enables:
✔ Callbacks
✔ Closures
✔ Higher-Order Functions
✔ Functional Programming

---

## 🔹 Function Types (At a Glance)

### 1️⃣ Function Declaration

```js
function greet() {
  console.log("Hello");
}
```

* ✅ Hoisted
* ✅ Has its own `this`
* 📌 Used for reusable logic

---

### 2️⃣ Function Expression

```js
const greet = function () {
  console.log("Hello");
};
```

* ❌ Not hoisted
* 📌 Stored in variables
* 📌 Useful for conditional logic

---

### 3️⃣ Arrow Function (ES6)

```js
const greet = () => console.log("Hello");
```

* ❌ No own `this`
* ❌ No `arguments`
* 📌 Common in React & callbacks

---

### 4️⃣ Anonymous Function

```js
setTimeout(function () {
  console.log("Hello");
}, 1000);
```

* ❌ No name
* 📌 One-time usage
* 📌 Mostly callbacks

---

### 5️⃣ Named Function Expression

```js
const greet = function sayHello() {
  console.log("Hello");
};
```

* ✅ Name helps debugging
* ❌ Not hoisted
* 📌 Recursive / debuggable logic

---

### 6️⃣ IIFE (Immediately Invoked)

```js
(function () {
  console.log("Hello");
})();
```

* ✅ Executes immediately
* ✅ Private scope
* 📌 Avoids global pollution

---

### 7️⃣ Constructor Function

```js
function Person(name) {
  this.name = name;
}
const user = new Person("Hareesh");
```

* 📌 Creates objects
* 📌 Pre-ES6 class pattern

---

### 8️⃣ Generator Function

```js
function* gen() {
  yield 1;
  yield 2;
}
```

* ✅ Pausable execution
* ✅ Returns iterator
* 📌 Lazy evaluation

---

### 9️⃣ Async Function

```js
async function fetchData() {
  return "data";
}
```

* ✅ Always returns Promise
* ✅ Cleaner async code
* 📌 API calls

---

### 🔟 Callback Function

```js
function greet(cb) {
  cb();
}
```

* 📌 Passed as argument
* 📌 Enables async behavior
* ⚠ Can cause callback hell

---

## ⚡ Key Comparisons

### Function vs Arrow

| Feature   | Function | Arrow   |
| --------- | -------- | ------- |
| `this`    | Dynamic  | Lexical |
| Hoisting  | Yes      | No      |
| arguments | Yes      | No      |

---

## 🧩 Interview Keywords (MEMORIZE)

* First-class functions
* Higher-order functions
* Lexical scope
* Closure
* Execution context
* Hoisting
* Callback
* Async / Await

---

## 🎯 One-Line Interview Answer

> “JavaScript supports multiple ways to define functions because functions are first-class citizens, enabling callbacks, closures, higher-order functions, and asynchronous patterns.”

---
