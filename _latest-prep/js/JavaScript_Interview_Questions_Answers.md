# JavaScript Interview Questions & Answers

> Target: Frontend Engineer / React / Next.js interviews  
> Experience: 3–5 years  
> Focus: Important, tricky, practical JavaScript questions

## 1. var vs let vs const

| Feature | var | let | const |
|---|---|---|---|
| Scope | Function | Block | Block |
| Hoisted | Yes | Yes | Yes |
| TDZ | No | Yes | Yes |
| Redeclaration | Yes | No | No |
| Reassignment | Yes | Yes | No |

**Interview answer:** `var` is function-scoped. `let` and `const` are block-scoped. `let` can be reassigned, while `const` cannot be reassigned. `let` and `const` are hoisted but remain inaccessible during the Temporal Dead Zone.

---

## 2. Scope

Scope determines where a variable can be accessed.

```js
{
  let x = 10;
}

console.log(x); // ReferenceError
```

Main types:

- Global scope
- Function scope
- Block scope
- Module scope

---

## 3. Hoisting

Declarations are processed before the surrounding code executes.

```js
console.log(a);

var a = 10;
```

Output:

```text
undefined
```

With `let`/`const`:

```js
console.log(a);

let a = 10;
```

Output:

```text
ReferenceError
```

---

## 4. Temporal Dead Zone (TDZ)

The TDZ is the period between entering a scope and reaching the declaration of a `let`, `const`, or class binding.

```js
console.log(a);
let a = 10;
```

Result: `ReferenceError`.

**Interview answer:** `let` and `const` are hoisted but remain uninitialized until execution reaches their declaration.

---

## 5. Execution Context

An execution context is the environment in which JavaScript code executes.

Common types:

- Global execution context
- Function execution context
- Eval execution context

A function context includes information such as variables, lexical environment, arguments, and `this`.

---

## 6. Call Stack

The call stack tracks currently executing function calls.

```js
function one() {
  two();
}

function two() {
  three();
}

function three() {
  console.log("Hello");
}

one();
```

Conceptually:

```text
three()
two()
one()
Global
```

Infinite recursion eventually causes:

```text
RangeError: Maximum call stack size exceeded
```

---

## 7. Closures ⭐⭐⭐

A closure occurs when a function retains access to variables from its lexical scope even after the outer function has finished.

```js
function counter() {
  let count = 0;

  return function () {
    count++;
    return count;
  };
}

const increment = counter();

console.log(increment()); // 1
console.log(increment()); // 2
console.log(increment()); // 3
```

Common uses:

- Data privacy
- Function factories
- Memoization
- Callbacks
- Event handlers

**Interview answer:** A closure allows a function to remember and access variables from its lexical scope after the outer function has completed.

---

## 8. Event Loop ⭐⭐⭐

Simplified model:

```text
Call Stack
   ↓
Runtime APIs
   ↓
Microtask / Task Queues
   ↓
Event Loop
   ↓
Call Stack
```

Example:

```js
console.log("1");

setTimeout(() => console.log("2"), 0);

Promise.resolve().then(() => console.log("3"));

console.log("4");
```

Output:

```text
1
4
3
2
```

**Key rule:** After current synchronous code finishes, microtasks are processed before the next task.

---

## 9. Microtasks vs Tasks

Microtasks include:

```text
Promise.then
Promise.catch
Promise.finally
queueMicrotask
```

Common tasks include:

```text
setTimeout
setInterval
DOM events
```

Example:

```js
setTimeout(() => console.log("timeout"), 0);

Promise.resolve().then(() => console.log("promise"));

console.log("sync");
```

Output:

```text
sync
promise
timeout
```

---

## 10. Promises

A Promise represents the eventual result of an asynchronous operation.

States:

```text
Pending
   ↓
Fulfilled
OR
Rejected
```

```js
const promise = new Promise((resolve, reject) => {
  resolve("Success");
});

promise
  .then(result => console.log(result))
  .catch(error => console.log(error))
  .finally(() => console.log("Done"));
```

---

## 11. async/await

`async/await` is syntax for working with Promises.

```js
async function getUser() {
  try {
    const response = await fetch("/api/user");
    return await response.json();
  } catch (error) {
    console.error(error);
  }
}
```

Important:

> An `async` function always returns a Promise.

`await` pauses that async function until the Promise settles; it does not block the JavaScript thread.

---

## 12. Promise.all

Use when independent operations can run concurrently and all results are required.

```js
const [users, products] = await Promise.all([
  fetchUsers(),
  fetchProducts()
]);
```

If one rejects, `Promise.all` rejects.

---

## 13. Promise.allSettled

Waits for every Promise.

```js
const results = await Promise.allSettled([
  fetchUsers(),
  fetchProducts()
]);
```

Results contain:

```js
{ status: "fulfilled", value: ... }
{ status: "rejected", reason: ... }
```

---

## 14. Promise.race

The first Promise to settle wins.

```js
const result = await Promise.race([
  request1(),
  request2()
]);
```

First fulfilled **or rejected** result wins.

---

## 15. Promise.any

The first fulfilled Promise wins.

```js
const result = await Promise.any([
  request1(),
  request2(),
  request3()
]);
```

If all reject, it rejects with `AggregateError`.

### Quick comparison

```text
all
→ all must fulfill

allSettled
→ wait for all

race
→ first settled

any
→ first fulfilled
```

---

## 16. this ⭐⭐⭐

For regular functions, `this` is determined by how the function is called.

```js
const user = {
  name: "Hareesh",

  greet() {
    console.log(this.name);
  }
};

user.greet(); // Hareesh
```

Don't assume `this` simply means the object where the function was written.

---

## 17. Arrow Functions vs Regular Functions

Arrow functions don't have their own `this`.

```js
const user = {
  name: "Hareesh",

  regular() {
    console.log(this.name);
  },

  arrow: () => {
    console.log(this.name);
  }
};
```

Arrow functions lexically capture `this`.

They also:

- Don't have their own `arguments`
- Cannot be constructors with `new`
- Don't have their own `prototype` property

---

## 18. call(), apply(), bind()

```js
function greet(city) {
  console.log(this.name, city);
}

const user = { name: "Hareesh" };
```

### call

```js
greet.call(user, "Pune");
```

Invoke immediately; arguments individually.

### apply

```js
greet.apply(user, ["Pune"]);
```

Invoke immediately; arguments as array-like.

### bind

```js
const fn = greet.bind(user, "Pune");
fn();
```

Returns a new function.

```text
call  → invoke now
apply → invoke now
bind  → return function
```

---

## 19. Prototype

A prototype is an object from which another object can inherit properties and methods.

```js
const user = {
  name: "Hareesh"
};

console.log(user.toString);
```

`toString` is inherited through the prototype chain.

---

## 20. Prototype Chain

If a property isn't found on an object, JavaScript looks at its prototype, then the prototype's prototype.

```text
user
 ↓
Object.prototype
 ↓
null
```

**Interview answer:** The prototype chain is JavaScript's mechanism for property and method lookup through an object's prototype and its ancestors.

---

## 21. Classes

JavaScript classes provide syntax for creating objects and inheritance.

```js
class User {
  constructor(name) {
    this.name = name;
  }

  greet() {
    return `Hello ${this.name}`;
  }
}

const user = new User("Hareesh");
console.log(user.greet());
```

Important:

> JavaScript classes are built on the prototype-based object model.

---

## 22. == vs ===

```text
==  → loose equality + coercion
=== → strict equality
```

```js
5 == "5";  // true
5 === "5"; // false
```

Prefer `===` for predictable comparisons.

---

## 23. Type Coercion ⭐⭐⭐

JavaScript can automatically convert values between types.

```js
"5" + 2; // "52"
"5" - 2; // 3
```

`+` can perform string concatenation, while `-`, `*`, and `/` commonly coerce operands to numbers.

---

## 24. Primitive vs Reference Types

Primitive values:

```text
string
number
bigint
boolean
undefined
symbol
null
```

Objects are reference values.

```js
const a = { x: 1 };
const b = a;

b.x = 2;

console.log(a.x); // 2
```

Both variables refer to the same object.

---

## 25. Shallow Copy vs Deep Copy

Shallow copy:

```js
const copy = { ...original };
```

Nested references can still be shared.

Deep copy for supported values:

```js
const copy = structuredClone(original);
```

Avoid treating `JSON.parse(JSON.stringify(obj))` as a universal deep-cloning solution because it does not preserve all JavaScript types.

---

## 26. Spread vs Rest

Spread expands:

```js
const a = [1, 2];
const b = [...a, 3];
```

Rest collects:

```js
function sum(...numbers) {
  return numbers.reduce((a, b) => a + b, 0);
}
```

Memory:

```text
Spread → Expand
Rest   → Collect
```

---

## 27. Destructuring

Array:

```js
const [a, b] = [10, 20];
```

Object:

```js
const { name, age } = user;
```

Common in React props, API responses, and state.

---

## 28. map() vs forEach()

`map()` returns a new array:

```js
const result = [1, 2, 3].map(x => x * 2);
```

`forEach()` is for iteration/side effects:

```js
const result = [1, 2, 3].forEach(x => console.log(x));
// undefined
```

---

## 29. filter()

Returns all elements satisfying a condition.

```js
const result = [1, 2, 3, 4].filter(x => x % 2 === 0);
// [2, 4]
```

---

## 30. reduce()

Accumulates an array into one result.

```js
const sum = [1, 2, 3, 4].reduce(
  (total, value) => total + value,
  0
);

// 10
```

Can create numbers, strings, objects, arrays, Maps, etc.

---

## 31. find() vs filter()

```text
find
→ first matching element
→ object | undefined

filter
→ all matching elements
→ array
```

```js
users.find(user => user.id === 10);

users.filter(user => user.active);
```

---

## 32. some() vs every()

```js
[1, 2, 3].some(x => x > 2);  // true
[1, 2, 3].every(x => x > 0); // true
```

```text
some  → at least one
every → all
```

---

## 33. slice() vs splice()

`slice()` does not mutate:

```js
const b = [1, 2, 3, 4].slice(1, 3);
// [2, 3]
```

`splice()` mutates:

```js
const a = [1, 2, 3, 4];
a.splice(1, 2);
// a = [1, 4]
```

---

## 34. sort()

Default sort is string-based:

```js
[10, 2, 5].sort();
// [10, 2, 5]
```

Numeric sort:

```js
[10, 2, 5].sort((a, b) => a - b);
// [2, 5, 10]
```

Remember: `sort()` mutates the array.

---

## 35. for...of vs for...in

`for...of` iterates values:

```js
for (const value of [10, 20, 30]) {
  console.log(value);
}
```

`for...in` iterates enumerable property keys:

```js
for (const key in user) {
  console.log(key);
}
```

```text
for...of → values
for...in → keys
```

---

## 36. Optional Chaining

Safely access nested values:

```js
const city = user?.address?.city;
```

If `address` is `null`/`undefined`, the expression returns `undefined` instead of throwing.

---

## 37. Nullish Coalescing

```js
const value = input ?? "default";
```

Uses the fallback only for:

```text
null
undefined
```

---

## 38. || vs ??

```js
0 || 10; // 10
0 ?? 10; // 0
```

`||` checks falsiness.

`??` checks specifically for `null` and `undefined`.

---

## 39. Default Parameters

```js
function greet(name = "Guest") {
  return `Hello ${name}`;
}

greet(); // Hello Guest
```

The default applies when the argument is `undefined`.

---

## 40. ES Modules vs CommonJS

ES Modules:

```js
export const add = (a, b) => a + b;
```

```js
import { add } from "./math.js";
```

CommonJS:

```js
module.exports = { add };
```

```js
const { add } = require("./math");
```

Modern frontend applications commonly use ES Modules.

---

## 41. Strict Mode

```js
"use strict";
```

Makes certain unsafe behaviors throw errors.

```js
"use strict";

x = 10;
// ReferenceError
```

ES modules are automatically strict mode.

---

## 42. Immutability

Avoid directly changing existing data.

Instead of:

```js
user.name = "John";
```

use:

```js
const updatedUser = {
  ...user,
  name: "John"
};
```

Immutability is especially important in React state management.

---

## 43. Garbage Collection

JavaScript automatically manages memory.

An object can generally be garbage-collected when it is no longer reachable.

```js
let user = { name: "Hareesh" };

user = null;
```

If no other references exist, the original object becomes eligible for garbage collection.

You don't directly control when GC runs.

---

## 44. Debouncing vs Throttling ⭐⭐⭐

### Debounce

Runs after activity stops for a specified delay.

Common use:

```text
Search input
```

```js
function debounce(fn, delay) {
  let timer;

  return (...args) => {
    clearTimeout(timer);

    timer = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}
```

### Throttle

Limits how often a function can execute.

Common use:

```text
Scroll
Resize
Mouse movement
```

Memory:

```text
Debounce → wait until activity stops
Throttle → limit execution frequency
```

---

## 45. Event Delegation

Attach one listener to a parent instead of many child elements.

```js
document.querySelector("#list").addEventListener("click", event => {
  const item = event.target.closest("li");

  if (!item) return;

  console.log(item.textContent);
});
```

Benefits:

- Fewer listeners
- Works with dynamically added children
- Cleaner event handling

---

## 46. Event Bubbling vs Capturing

Propagation:

```text
Capturing
↓
Target
↓
Bubbling
```

Bubbling:

```text
Child → Parent → Ancestor
```

Capturing:

```text
Ancestor → Parent → Child
```

Enable capture:

```js
element.addEventListener("click", handler, {
  capture: true
});
```

---

## 47. preventDefault vs stopPropagation

`preventDefault()`:

```js
event.preventDefault();
```

Stops the browser's default action.

Examples:

```text
Prevent form submission
Prevent link navigation
```

`stopPropagation()`:

```js
event.stopPropagation();
```

Stops event propagation.

Memory:

```text
preventDefault   → browser default
stopPropagation  → event propagation
```

---

## 48. Synchronous vs Asynchronous

Synchronous code executes sequentially.

```js
console.log("1");
console.log("2");
console.log("3");
```

Asynchronous work completes later:

```js
setTimeout(() => {
  console.log("Later");
}, 1000);
```

Important:

> Asynchronous JavaScript does not mean JavaScript executes multiple pieces of JavaScript simultaneously on the same main thread.

---

## 49. Truthy and Falsy

Falsy values:

```text
false
0
-0
0n
""
null
undefined
NaN
```

Important:

```js
Boolean([]); // true
Boolean({}); // true
```

Arrays and objects are truthy.

---

## 50. NaN

```js
typeof NaN;
// "number"
```

Correct check:

```js
Number.isNaN(value);
```

Don't use:

```js
value === NaN;
```

because:

```js
NaN === NaN;
// false
```

---

## 51. Object.freeze() vs Object.seal()

`Object.freeze()` prevents adding, deleting, and changing properties.

`Object.seal()` prevents adding and deleting properties, but existing writable properties can generally still be changed.

```js
const user = Object.seal({
  name: "Hareesh"
});

user.name = "John";
```

---

## 52. Map vs Object

Object:

```js
const user = {
  name: "Hareesh",
  age: 25
};
```

Map:

```js
const map = new Map();

map.set("name", "Hareesh");
map.set("age", 25);
```

Map is useful for key-value collections and supports keys of any type.

---

## 53. Set

A Set stores unique values.

```js
const unique = [...new Set([1, 2, 2, 3])];

console.log(unique);
// [1, 2, 3]
```

---

## 54. WeakMap and WeakSet

Weak collections hold weak references to objects.

Important:

- WeakMap keys must be objects
- Weak collections are not enumerable
- They can allow objects to be garbage-collected when no strong references remain

---

## 55. Memory Leaks

Common causes:

```text
Unremoved event listeners
Timers not cleared
Large caches
Long-lived references
Closures retaining unnecessary data
Detached DOM references
```

Example:

```js
const interval = setInterval(() => {
  console.log("running");
}, 1000);

clearInterval(interval);
```

In React, clean up subscriptions, timers, and listeners.

---

## 56. JavaScript Performance

Important techniques:

- Avoid unnecessary work
- Debounce expensive input operations
- Throttle high-frequency events
- Use efficient data structures
- Avoid unnecessary DOM operations
- Use memoization when appropriate
- Avoid memory leaks
- Lazy-load code when appropriate
- Split large bundles

Useful browser tools:

```text
Chrome DevTools Performance
Chrome DevTools Memory
Lighthouse
Performance APIs
```

---

# 57. Tricky Output Questions

## Question 1

```js
console.log(a);

var a = 10;
```

Output:

```text
undefined
```

---

## Question 2

```js
console.log(a);

let a = 10;
```

Output:

```text
ReferenceError
```

Reason: TDZ.

---

## Question 3

```js
console.log("1");

setTimeout(() => {
  console.log("2");
}, 0);

Promise.resolve().then(() => {
  console.log("3");
});

console.log("4");
```

Output:

```text
1
4
3
2
```

---

## Question 4

```js
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0);
}
```

Output:

```text
3
3
3
```

`var` is function-scoped and the callbacks share the same binding.

---

## Question 5

```js
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0);
}
```

Output:

```text
0
1
2
```

Each iteration has its own lexical binding.

---

## Question 6

```js
console.log([] == false);
console.log([] === false);
```

Output:

```text
true
false
```

Reason: loose equality performs coercion.

---

## Question 7

```js
console.log(typeof null);
```

Output:

```text
"object"
```

Historical JavaScript quirk.

---

## Question 8

```js
const a = { x: 1 };
const b = a;

b.x = 2;

console.log(a.x);
```

Output:

```text
2
```

Both variables reference the same object.

---

## Question 9

```js
const a = [1, 2, 3];
const b = [...a];

console.log(a === b);
```

Output:

```text
false
```

Spread creates a new array.

---

## Question 10

```js
console.log([] + []);
console.log([] + {});
```

Output:

```text
""
"[object Object]"
```

These are classic type-coercion questions.

---

# 58. Top Questions to Master

For a 3.5+ year Frontend Engineer interview:

```text
1.  var vs let vs const
2.  Scope
3.  Hoisting
4.  TDZ
5.  Closures ⭐⭐⭐
6.  Execution Context
7.  Call Stack
8.  Event Loop ⭐⭐⭐
9.  Microtasks vs Tasks ⭐⭐⭐
10. Promises
11. async/await
12. Promise.all
13. Promise.allSettled
14. Promise.race
15. Promise.any
16. this ⭐⭐⭐
17. Arrow functions
18. call/apply/bind
19. Prototype
20. Prototype Chain
21. == vs ===
22. Type coercion
23. Primitive vs reference
24. Shallow vs deep copy
25. map/filter/reduce
26. slice vs splice
27. sort
28. Spread/rest
29. Immutability
30. Debouncing/throttling
31. Event delegation
32. Bubbling/capturing
33. preventDefault/stopPropagation
34. Optional chaining
35. ?? vs ||
36. Map/Set
37. Garbage collection
38. Memory leaks
39. JavaScript performance
```

---

# 59. Final Revision

## Scope

```text
Global
Function
Block
Module
```

## Hoisting

```text
var
→ hoisted + initialized undefined

let/const
→ hoisted + TDZ
```

## Closure

```text
Function
+
Lexical environment
=
Closure
```

## Event Loop

```text
Synchronous
↓
Microtasks
↓
Next task
```

## Promise

```text
Pending
↓
Fulfilled / Rejected
```

## Promise Methods

```text
all
→ all fulfill

allSettled
→ wait for all

race
→ first settled

any
→ first fulfilled
```

## this

```text
Regular function
→ invocation determines this

Arrow function
→ lexical this
```

## call/apply/bind

```text
call  → invoke now
apply → invoke now + array-like args
bind  → returns function
```

## Equality

```text
==  → coercion
=== → strict
```

## Copy

```text
Spread
→ shallow copy

structuredClone
→ deep clone for supported values
```

## Arrays

```text
map      → transform
filter   → select
reduce   → accumulate
find     → first match
some     → at least one
every    → all
slice    → no mutation
splice   → mutation
sort     → mutates by default
```

## Operators

```text
||  → falsy fallback
??  → null/undefined fallback
?.  → safe property access
```

## Events

```text
Capturing
↓
Target
↓
Bubbling
```

```text
preventDefault  → browser default action
stopPropagation → event propagation
```

## Performance

```text
Debounce → wait until activity stops
Throttle → limit execution frequency
```

---

# React/Next.js Interview Priority

For a React/Next.js Frontend Engineer, focus especially on:

```text
⭐⭐⭐ Closures
⭐⭐⭐ Event Loop
⭐⭐⭐ Promises
⭐⭐⭐ async/await
⭐⭐⭐ this
⭐⭐⭐ Reference vs Value
⭐⭐⭐ Immutability
⭐⭐⭐ Array methods
⭐⭐⭐ Debouncing / Throttling
⭐⭐⭐ Event propagation
```

These fundamentals directly influence understanding of:

```text
React state
React hooks
useEffect
useCallback
useMemo
Event handlers
Async API calls
Rendering
Performance
State updates
```

---

# Final Interview Strategy

Don't answer JavaScript questions with only definitions.

Use:

```text
Definition
↓
How it works
↓
Small example
↓
Real-world use case
↓
Common interview trap
```

For example:

> A closure occurs when a function retains access to variables from its lexical scope even after the outer function has finished executing. It is useful for data privacy, function factories, memoization, callbacks, and event handlers.
