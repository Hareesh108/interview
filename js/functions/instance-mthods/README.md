# 📌 Call, Apply, Bind — Difference & Polyfill

JavaScript provides **`call`**, **`apply`**, and **`bind`** methods to **explicitly control the `this` context** of a function at invocation time.
These methods live on **`Function.prototype`**, so every function can use them.

---

## 🔹 Why do we need call / apply / bind?

* JavaScript’s `this` is **dynamic**
* Functions can be:

  * Detached from objects
  * Passed as callbacks
  * Reused across different contexts
* `call`, `apply`, and `bind` solve this by **explicitly setting `this`**

---

## 🔹 Difference between Call, Apply, Bind

| Method  | Execution | Arguments           | Returns            |
| ------- | --------- | ------------------- | ------------------ |
| `call`  | Immediate | Passed individually | Function result    |
| `apply` | Immediate | Passed as array     | Function result    |
| `bind`  | Delayed   | Passed individually | New bound function |

---

## 🔹 Examples

### `call`

```js
function greet(city) {
  return `${this.name} from ${city}`;
}

const user = { name: "Hareesh" };

greet.call(user, "Bangalore");
// Hareesh from Bangalore
```

---

### `apply`

```js
function sum(a, b) {
  return a + b;
}

sum.apply(null, [2, 3]);
// 5
```

---

### `bind`

```js
function greet() {
  return `Hello ${this.name}`;
}

const user = { name: "Hareesh" };

const boundGreet = greet.bind(user);
boundGreet();
// Hello Hareesh
```

---

## 🔹 Real-world Use Case: Method Borrowing

```js
const arrayLike = {
  0: 10,
  1: 20,
  length: 2,
};

Array.prototype.map.call(arrayLike, x => x * 2);
// [20, 40]
```

---

## 🔹 Key Notes (Interview Gold)

* These methods **do not change the prototype chain**
* They only control **how a function is invoked**
* Arrow functions **ignore** `call`, `apply`, and `bind`
* `bind` is commonly used in callbacks and event handlers

---

# ⚙️ Polyfill Implementations

Below are **simple, interview-safe polyfills** (not edge-case complete).

---

## 🔸 Polyfill for `call`

```js
Function.prototype.myCall = function (context, ...args) {
  context = context || globalThis;

  const fnSymbol = Symbol();
  context[fnSymbol] = this;

  const result = context[fnSymbol](...args);
  delete context[fnSymbol];

  return result;
};
```

### Usage

```js
function greet() {
  return this.name;
}

greet.myCall({ name: "Hareesh" });
// Hareesh
```

---

## 🔸 Polyfill for `apply`

```js
Function.prototype.myApply = function (context, argsArray) {
  context = context || globalThis;

  const fnSymbol = Symbol();
  context[fnSymbol] = this;

  const result = context[fnSymbol](...(argsArray || []));
  delete context[fnSymbol];

  return result;
};
```

---

## 🔸 Polyfill for `bind`

```js
Function.prototype.myBind = function (context, ...args) {
  const originalFn = this;

  return function (...newArgs) {
    return originalFn.apply(context, [...args, ...newArgs]);
  };
};
```

### Usage

```js
function greet(city) {
  return `${this.name} from ${city}`;
}

const boundFn = greet.myBind({ name: "Hareesh" });
boundFn("Bangalore");
// Hareesh from Bangalore
```

---

## 🧠 How the Polyfill Works (High Level)

1. Temporarily attach the function to the context object
2. Invoke it so `this` points to that object
3. Remove the temporary reference
4. Return result (or function in case of `bind`)

---