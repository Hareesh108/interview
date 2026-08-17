# JavaScript Interview Questions — With Answers

## Core Language Fundamentals

**1. `var` vs `let` vs `const`**
`var` is function-scoped, hoisted and initialized to `undefined`. `let`/`const` are block-scoped, hoisted but not initialized (Temporal Dead Zone — accessing them before declaration throws `ReferenceError`). `const` can't be reassigned (but objects/arrays it holds are still mutable).

**2. Function hoisting vs variable hoisting**
Function *declarations* are hoisted with their full body, so they can be called before their line in the code. Function *expressions* (`const f = function(){}`) are hoisted only as a variable (per `var`/`let` rules) — the assignment happens at runtime, so calling them earlier throws.

**3. `null` vs `undefined` vs undeclared**
`undefined` = a variable exists but has no assigned value. `null` = an intentional "no value" assignment. An undeclared variable was never declared at all — reading it throws `ReferenceError`.

**4. Primitive vs reference types**
Primitives (`string`, `number`, `boolean`, `null`, `undefined`, `symbol`, `bigint`) are copied by value. Objects/arrays/functions are reference types — copying the variable copies the reference, so mutations are visible through any reference.

**5. Pass by value vs pass by reference**
JS is always pass-by-value — but for objects, the "value" passed is a reference (a pointer to the object). Reassigning the parameter doesn't affect the caller's variable; mutating the object's properties does.

**6. `==` vs `===`**
`===` compares value and type with no conversion. `==` coerces operands to a common type first (e.g. `"5" == 5` → `true`), which is why `===` is preferred to avoid surprising coercions.

**7. `3 + 2 + "7"`**
`3 + 2` evaluates first (both numbers) → `5`, then `5 + "7"` triggers string coercion → `"57"`.

**8. Truthy/falsy & `NaN`**
Falsy values: `false, 0, -0, 0n, "", null, undefined, NaN`. Everything else is truthy (including `"0"`, `[]`, `{}`). Check `NaN` with `Number.isNaN(x)` (not `x === NaN`, which is always false since `NaN !== NaN`).

**9. `typeof`**
Returns a string: `"number"`, `"string"`, `"boolean"`, `"undefined"`, `"object"` (including for `null` — a long-standing bug), `"function"`, `"symbol"`, `"bigint"`. Use `Array.isArray()` to detect arrays since `typeof []` is `"object"`.

**10. Strict mode**
`"use strict"` disables silent errors (turns them into thrown exceptions), disallows implicit globals, makes `this` `undefined` instead of the global object in plain function calls, and disallows duplicate parameter names, among other restrictions. ES modules and classes are strict by default.

**11. Dynamic vs static typing**
JS is dynamically typed — variable types are determined and can change at runtime, not checked at compile time.

**12. TypeScript vs JavaScript**
TypeScript is a superset of JS that adds static typing, interfaces, generics, and compile-time checks; it compiles down to plain JS and catches type errors before runtime.

## Scope, Closures & `this`

**13. Closures**
A closure is a function that retains access to variables from its enclosing lexical scope even after that outer function has returned. Real use case: creating private state (e.g. a counter factory) or memoization caches.
```js
function counter() {
  let count = 0;
  return () => ++count; // closes over `count`
}
```

**14. IIFE**
`(function(){ ... })()` runs immediately and creates its own scope, historically used to avoid polluting the global namespace before ES modules/block scope existed. Still used for one-off setup or to avoid leaking loop variables into closures.

**15. `this`**
In a regular function, `this` is determined by how it's *called* (implicit binding on the object, or global/`undefined` in strict mode). Arrow functions don't have their own `this` — they inherit it lexically from the enclosing scope at definition time.

**16. `call` / `apply` / `bind`**
All three set `this` explicitly. `call(thisArg, a, b)` invokes immediately with args listed individually; `apply(thisArg, [a, b])` invokes immediately with args as an array; `bind(thisArg, a)` returns a new function with `this`/args pre-set, without invoking it.
```js
Function.prototype.myBind = function (ctx, ...boundArgs) {
  const fn = this;
  return function (...args) {
    return fn.apply(ctx, [...boundArgs, ...args]);
  };
};
```

**17. Currying**
Currying transforms `f(a, b, c)` into `f(a)(b)(c)` — each call returns a function until all arguments are supplied. Partial application fixes *some* args and returns a function for the rest, without necessarily going one-at-a-time.
```js
// Infinite currying: sum(10)(20)(30)() -> 60
function sum(a) {
  let total = a;
  function inner(b) {
    if (b === undefined) return total;
    total += b;
    return inner;
  }
  return inner;
}
```

## Prototypes & OOP

**18. Prototype chain**
Every object has an internal `[[Prototype]]` link (accessible via `Object.getPrototypeOf` or the deprecated `__proto__`). Property lookups walk up this chain until found or the chain ends at `null`. `Object.create(proto)` creates an object with a chosen prototype directly.

**19. Classes / `super`**
`class` syntax is sugar over prototypal inheritance. `super(...)` in a subclass constructor calls the parent constructor and must run before `this` is used; `super.method()` calls the parent's method implementation.

**20–21. OOP concepts & SOLID in JS**
Encapsulation (closures/private fields `#x`), inheritance (prototype chain/`extends`), polymorphism (method overriding), abstraction. SOLID maps directly: Single Responsibility per module/class, Open/Closed via composition over modification, Liskov Substitution for subclasses, Interface Segregation via small focused APIs, Dependency Inversion via injecting dependencies rather than hardcoding them.

**22. Design patterns**
Singleton (one shared instance, e.g. a module-level object), Factory (a function that returns different object shapes based on input), Observer (pub/sub, e.g. event emitters), Module pattern (IIFE-based encapsulation).

**23. FP vs OOP**
FP favors pure functions, immutability, and composition; OOP favors objects bundling state and behavior with inheritance/polymorphism. JS supports both — array methods (`map`/`filter`/`reduce`) are FP-flavored, classes are OOP-flavored.

## Async JavaScript & the Event Loop

**24–25. Event loop**
The call stack runs synchronous code. Async work (timers, I/O, fetch) is handled by the browser/Node APIs, and completion callbacks are queued. **Microtasks** (Promise callbacks, `queueMicrotask`) run before **macrotasks** (`setTimeout`, `setInterval`, I/O) — the event loop drains the *entire* microtask queue after each macrotask/synchronous block finishes. Starvation happens if microtasks keep queuing more microtasks, blocking macrotasks (and rendering) indefinitely.

**26. `setTimeout`/`setInterval`**
`setTimeout(fn, ms)` schedules `fn` once after at least `ms`; `setInterval(fn, ms)` repeats it. Both return an ID used to cancel via `clearTimeout(id)`/`clearInterval(id)`. The delay is a *minimum*, not guaranteed, since the callback waits for the call stack to be empty.

**27. Callback hell**
Deeply nested callbacks for sequential async steps, making code hard to read/error-handle. Solved with Promises/`async-await` (flattened, linear control flow) or splitting into named functions.

**28–29. Promises & combinators**
A Promise represents an eventual value with states `pending → fulfilled/rejected`. `.then` chains, `.catch` handles rejection, `.finally` always runs. `Promise.all` rejects fast if any reject and resolves with all results; `allSettled` always resolves with per-promise status; `race` settles with the first to settle (fulfilled or rejected); `any` resolves with the first *fulfillment*, rejecting only if all reject.

**30. Custom `Promise.allSettled`**
```js
function allSettled(promises) {
  return Promise.all(promises.map(p =>
    Promise.resolve(p).then(
      value => ({ status: 'fulfilled', value }),
      reason => ({ status: 'rejected', reason })
    )
  ));
}
```

**31. async/await vs Promises**
`async/await` is syntactic sugar over Promises for more readable, synchronous-looking code. Sequential `await`s run one after another (slower if independent); use `Promise.all([...])` with `await` to run independent async calls in parallel.

**32. Output prediction (setTimeout + Promise + async/await)**
Order: synchronous code first → microtasks (Promise `.then`, `await` continuations) → macrotasks (`setTimeout`), because the microtask queue fully drains before the next macrotask runs.
```js
console.log(1);
setTimeout(() => console.log(2), 0);
Promise.resolve().then(() => console.log(3));
console.log(4);
// Output: 1, 4, 3, 2
```

**33. Callback → Promise**
```js
function toPromise(fn) {
  return (...args) => new Promise((resolve, reject) => {
    fn(...args, (err, result) => err ? reject(err) : resolve(result));
  });
}
```

**34. Web Workers**
Run JS on a separate thread, communicating via `postMessage`/`onmessage`. Used to offload CPU-heavy work (parsing, image processing) without blocking the main/UI thread. They don't share memory and can't access the DOM directly.

**35. Race conditions & `AbortController`**
When multiple async calls can resolve out of order (e.g. a fast search-as-you-type triggers overlapping requests), a stale response can overwrite a newer one. Fix: cancel the previous request via `AbortController.abort()` before firing a new one, or ignore responses that don't match the latest request ID.

## Objects, Arrays & Functional Methods

**36. `map`/`filter`/`forEach`/`reduce`**
`map` transforms each element into a new array (same length). `filter` keeps elements matching a predicate (new, possibly shorter array). `forEach` iterates for side effects only, returns `undefined`. `reduce` accumulates all elements into a single value via a reducer function.

**37. Pure vs impure functions**
A pure function's output depends only on its inputs and it has no observable side effects (no mutating outside state, no I/O). Impure functions may mutate external state, do I/O, or return different results for the same input.

**38. `for...in` vs `for...of`**
`for...in` iterates enumerable *property keys* (including inherited ones) — meant for objects. `for...of` iterates *values* of any iterable (arrays, strings, Maps, Sets) — meant for iterables, not plain objects.

**39. Higher-order functions**
Functions that take other functions as arguments and/or return a function (e.g. `map`, `filter`, `debounce`, `compose`).

**40. Spread vs rest**
Spread (`...arr`) expands an iterable into individual elements (e.g. in a function call or array literal). Rest (`function f(...args)`) collects multiple arguments into a single array. Same syntax, opposite direction.

**41. `Object.freeze` vs `Object.seal`**
`freeze` prevents adding, removing, *and* modifying properties (fully immutable, shallow). `seal` prevents adding/removing properties but still allows modifying existing ones.

**42. `Object.keys/values/entries`**
`keys` returns an array of own enumerable property names; `values` returns their values; `entries` returns `[key, value]` pairs — useful with `for...of` or converting to a `Map`.

**43. Creating objects**
Object literal `{}`, `new Object()`, `Object.create(proto)`, constructor functions with `new`, ES6 `class`, and factory functions.

**44–45. Shallow vs deep copy**
Shallow copy (`{...obj}`, `Object.assign`, `Array.slice`) copies only the top level — nested objects are still shared references. Deep copy duplicates nested structures too, via `structuredClone(obj)` (modern, handles cycles) or `JSON.parse(JSON.stringify(obj))` (loses functions, `undefined`, dates become strings, and fails on cycles).
```js
function deepClone(value, seen = new WeakMap()) {
  if (value === null || typeof value !== 'object') return value;
  if (seen.has(value)) return seen.get(value);
  const clone = Array.isArray(value) ? [] : {};
  seen.set(value, clone);
  for (const key in value) clone[key] = deepClone(value[key], seen);
  return clone;
}
```

**46. Mutable objects as keys**
Using an object as a plain-object key coerces it to the string `"[object Object]"`, so distinct objects collide. `Map` correctly supports object keys by reference identity, but if you rely on an object's *content* rather than identity for equality, mutating it after insertion can cause confusing lookup bugs.

**47. `slice` vs `splice`**
`slice(start, end)` returns a shallow copy of a portion, non-mutating. `splice(start, deleteCount, ...items)` mutates the original array in place, removing/inserting elements, and returns the removed elements.

**48. Destructuring**
Extracts values from arrays/objects into variables: `const { a, b = 1 } = obj;` / `const [x, , y] = arr;` — supports defaults, renaming, and nested patterns.

**49. Template literals**
Backtick strings supporting `${expr}` interpolation and multi-line strings without `\n` concatenation; also enable tagged templates for custom string processing.

**50. `arguments` vs rest params**
`arguments` is an array-*like* object available in regular functions (not arrow functions) with all passed args, but lacks array methods directly. Rest params (`...args`) give a real array and can be named descriptively.

**51. `find` vs `findIndex`**
`find` returns the first matching *element* (or `undefined`); `findIndex` returns its *index* (or `-1`).

**52. Generator functions**
`function*` functions that can pause/resume execution via `yield`, returning an iterator. Useful for lazy sequences, custom iteration protocols, and (historically) async flow control.

**53. Immutability**
Treating data as unchangeable — instead of mutating, produce new copies with changes. Reduces bugs from shared references and enables cheap change detection (e.g. React re-render checks via reference equality).

**54. Memory leaks & GC**
JS garbage-collects objects with no remaining references. Leaks happen when references linger unintentionally: forgotten `setInterval`/event listeners holding closures, detached DOM nodes still referenced in JS, or growing caches/arrays never cleared.

## Browser, DOM & Web APIs

**55. DOM vs BOM**
DOM (Document Object Model) represents the page's HTML structure as objects you can query/manipulate. BOM (Browser Object Model) represents the browser itself — `window`, `navigator`, `location`, `history`.

**56. Event bubbling/capturing/delegation**
Capturing: event travels from `window` down to the target. Bubbling: it then travels back up from target to `window` (default phase for most listeners). Delegation exploits bubbling — attach one listener on a parent and use `event.target` to handle events from many children, avoiding per-child listeners.
```js
list.addEventListener('click', (e) => {
  if (e.target.matches('li')) handleItemClick(e.target);
});
```

**57. `target` vs `currentTarget`**
`event.target` is the actual element the event originated from; `event.currentTarget` is the element the listener is attached to (relevant when using delegation, since they can differ).

**58. `preventDefault` vs `stopPropagation`**
`preventDefault()` stops the browser's default action (e.g. form submit, link navigation) but lets the event keep bubbling. `stopPropagation()` stops the event from continuing to bubble/capture but doesn't cancel the default action. `stopImmediatePropagation()` also stops other listeners on the same element.

**59. `innerHTML` vs `textContent` vs `innerText`**
`innerHTML` parses/renders HTML markup (risk of XSS if given untrusted input). `textContent` sets/gets raw text including hidden elements, no HTML parsing (fast, safe). `innerText` is layout-aware (respects CSS visibility, triggers reflow) and is slower.

**60. Script loading**
Plain `<script>` blocks parsing until downloaded and executed. `async` downloads in parallel and executes as soon as ready (order not guaranteed). `defer` downloads in parallel but executes in order, after parsing completes, before `DOMContentLoaded`. ES modules (`type="module"`) are deferred by default.

**61. Debounce vs throttle**
Debounce delays execution until a pause in events (e.g. wait 300ms after the user stops typing) — good for search-as-you-type. Throttle guarantees execution at most once per interval regardless of event frequency — good for scroll/resize handlers.
```js
function debounce(fn, wait) {
  let t;
  return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), wait); };
}
function throttle(fn, wait) {
  let last = 0;
  return (...args) => {
    const now = Date.now();
    if (now - last >= wait) { last = now; fn(...args); }
  };
}
```

**62. Storage options**
`localStorage` persists until explicitly cleared, ~5–10MB, synchronous, accessible to any script on the origin (XSS risk). `sessionStorage` shares the same API but is cleared when the tab closes. Cookies are small (~4KB), sent with every HTTP request, support `HttpOnly` (inaccessible to JS, safer for auth tokens) and expiry. `IndexedDB` is an async, larger-capacity structured database for complex client-side data.

**63. AuthN vs AuthZ**
Authentication verifies *who you are* (login). Authorization determines *what you're allowed to do* (permissions/roles) once authenticated.

**64. Sessions/tokens & cookie flags**
Session-based auth stores state server-side with a session ID cookie; token-based (JWT) is stateless, the token itself carries claims. `HttpOnly` blocks JS access to a cookie (mitigates XSS token theft); `Secure` sends it only over HTTPS; `SameSite` restricts cross-site sending (mitigates CSRF).

**65. CORS & Same-Origin Policy**
Same-Origin Policy blocks scripts from reading responses from a different origin (scheme+host+port) by default. CORS is the server opt-in mechanism (`Access-Control-Allow-Origin` etc.) that relaxes this. "Preflight" `OPTIONS` requests are sent automatically by the browser before non-simple cross-origin requests to check permission.

**66. Frontend security (XSS/CSRF/CSP)**
XSS: attacker-injected script runs in your page — mitigate by escaping/sanitizing untrusted output and avoiding `innerHTML` with raw user input. CSRF: a malicious site tricks a logged-in user's browser into making an unwanted request — mitigate with `SameSite` cookies and CSRF tokens. CSP is a response header restricting which script/resource sources the browser will execute/load.

**67. HTTP fundamentals**
Methods (GET/POST/PUT/PATCH/DELETE) express intent; status codes signal outcome (2xx success, 3xx redirect, 4xx client error, 5xx server error); headers carry metadata (content type, auth, caching directives).

**68. URL to render**
DNS resolves the hostname to an IP → TCP handshake (+ TLS handshake for HTTPS) → HTTP request sent → server responds → browser parses HTML, builds DOM, fetches/parses CSS (CSSOM) and JS, computes layout, then paints and composites pixels to the screen.

**69–70. Rendering pipeline & reflow/repaint**
DOM + CSSOM combine into a render tree → layout (reflow) computes geometry/position → paint fills in pixels → compositing layers to the screen. Reflow (layout) is triggered by geometry changes (size, position) and is expensive since it can cascade; repaint (visual-only changes like color) is cheaper since it skips layout.

**71. Caching**
The browser cache stores responses per `Cache-Control` directives (`max-age`, `no-cache`, etc.). ETags let the server validate whether a cached copy is still fresh (conditional requests, 304 Not Modified). CDNs cache static assets geographically closer to users to reduce latency.

**72. Web APIs**
`fetch` for network requests; timers for scheduling; `IntersectionObserver` for efficiently detecting when an element enters/leaves the viewport (lazy loading, infinite scroll); `ResizeObserver` for reacting to element size changes without polling; Web Storage (`localStorage`/`sessionStorage`).

**73. `eval()`**
Executes a string as JS code at runtime. Discouraged: major security risk (arbitrary code execution if the string is user-controlled), hurts performance (defeats JS engine optimizations), and hard to debug.

**74. Interceptors**
Middleware-like hooks (e.g. Axios request/response interceptors) that run on every outgoing request or incoming response — commonly used to attach auth headers, log, or centrally handle errors/token refresh.

**75. Tree shaking**
A build-time optimization (Webpack/Rollup/esbuild) that statically analyzes ES module imports/exports and removes code that's never actually used, shrinking the final bundle. Requires ES modules (static `import`/`export`) since CommonJS's dynamic `require` can't be analyzed the same way.

**76. `fetch` vs `axios`**
`fetch` is a native browser API; doesn't reject on HTTP error status (only on network failure — you must check `response.ok`), no automatic JSON parsing/timeout/interceptors. `axios` is a library adding automatic JSON handling, request/response interceptors, timeout support, and rejects on non-2xx by default.

**77. REST vs GraphQL**
REST exposes fixed endpoints/resources — simple, cacheable, but can over-/under-fetch data. GraphQL exposes a single endpoint where the client specifies exactly the fields it needs — flexible, avoids over-fetching, but adds complexity (caching, query cost control) on both ends.

## Tooling & Package Management

**78. `package.json` vs `package-lock.json`**
`package.json` declares direct dependencies (often with version *ranges*), scripts, and metadata. `package-lock.json` records the exact resolved version of every package in the dependency tree, ensuring identical installs across machines/CI.

**79. `^` vs `~`**
`^1.2.3` allows updates that don't change the leftmost non-zero digit (so up to but not including `2.0.0` — minor and patch updates). `~1.2.3` allows only patch updates (up to but not including `1.3.0`).

## Coding / Polyfill Challenges

**80–81. `debounce`/`throttle`** — see #61 above.

**82. Flatten a nested array**
```js
function flatten(arr) {
  return arr.reduce((flat, item) =>
    flat.concat(Array.isArray(item) ? flatten(item) : item), []);
}
```

**83. Polyfills for `map`/`filter`/`reduce`**
```js
Array.prototype.myMap = function (cb) {
  const out = [];
  for (let i = 0; i < this.length; i++) out.push(cb(this[i], i, this));
  return out;
};
Array.prototype.myFilter = function (cb) {
  const out = [];
  for (let i = 0; i < this.length; i++) if (cb(this[i], i, this)) out.push(this[i]);
  return out;
};
Array.prototype.myReduce = function (cb, initial) {
  let acc = initial, start = 0;
  if (acc === undefined) { acc = this[0]; start = 1; }
  for (let i = start; i < this.length; i++) acc = cb(acc, this[i], i, this);
  return acc;
};
```

**84. Polyfill for `bind`/`call`/`apply`** — bind shown at #16.
```js
Function.prototype.myCall = function (ctx, ...args) {
  ctx = ctx || globalThis;
  const key = Symbol('fn');
  ctx[key] = this;
  const result = ctx[key](...args);
  delete ctx[key];
  return result;
};
```

**85. `once(fn)`**
```js
function once(fn) {
  let called = false, result;
  return (...args) => {
    if (!called) { called = true; result = fn(...args); }
    return result;
  };
}
```

**86–87. Deep clone / deep-equal** — clone shown at #44–45.
```js
function deepEqual(a, b) {
  if (a === b) return true;
  if (typeof a !== 'object' || typeof b !== 'object' || !a || !b) return false;
  if (Array.isArray(a) && Array.isArray(b)) {
    const sa = [...a].sort(), sb = [...b].sort(); // order-insensitive for primitives
    return sa.length === sb.length && sa.every((v, i) => deepEqual(v, sb[i]));
  }
  const ka = Object.keys(a), kb = Object.keys(b);
  return ka.length === kb.length && ka.every(k => deepEqual(a[k], b[k]));
}
```

**88. Memoization**
```js
function memoize(fn) {
  const cache = new Map();
  return (...args) => {
    const key = JSON.stringify(args);
    if (!cache.has(key)) cache.set(key, fn(...args));
    return cache.get(key);
  };
}
```

**89. Remove duplicates without `Set`**
```js
function unique(arr) {
  return arr.filter((item, index) => arr.indexOf(item) === index);
}
```

**90. Max without `Math.max`**
```js
function max(arr) {
  return arr.reduce((m, n) => (n > m ? n : m), -Infinity);
}
```

**91. Group by property, single pass**
```js
function groupBy(arr, key) {
  return arr.reduce((acc, item) => {
    (acc[item[key]] ??= []).push(item);
    return acc;
  }, {});
}
```

**92. Flatten object to dot paths / unflatten**
```js
function flattenObj(obj, prefix = '', out = {}) {
  for (const k in obj) {
    const path = prefix ? `${prefix}.${k}` : k;
    if (typeof obj[k] === 'object' && obj[k] !== null && !Array.isArray(obj[k])) {
      flattenObj(obj[k], path, out);
    } else out[path] = obj[k];
  }
  return out;
}
function unflatten(obj) {
  const out = {};
  for (const path in obj) {
    path.split('.').reduce((acc, key, i, arr) => {
      if (i === arr.length - 1) { acc[key] = obj[path]; return acc; }
      return acc[key] ??= {};
    }, out);
  }
  return out;
}
```

**93. `set(obj, path, value)`**
```js
function set(obj, path, value) {
  const keys = Array.isArray(path) ? path : path.split('.');
  keys.reduce((acc, key, i) => {
    if (i === keys.length - 1) { acc[key] = value; return acc; }
    return acc[key] ??= {};
  }, obj);
  return obj;
}
```

**94. `snake_case` → `camelCase` recursively**
```js
function toCamel(input) {
  if (Array.isArray(input)) return input.map(toCamel);
  if (input !== null && typeof input === 'object') {
    return Object.fromEntries(
      Object.entries(input).map(([k, v]) => [
        k.replace(/_([a-z])/g, (_, c) => c.toUpperCase()),
        toCamel(v),
      ])
    );
  }
  return input;
}
```

**95. `localStorage` wrapper with expiry**
```js
const storage = {
  set(key, value, ttlMs) {
    try {
      localStorage.setItem(key, JSON.stringify({ value, expires: ttlMs ? Date.now() + ttlMs : null }));
    } catch { /* storage unavailable/full — fail silently */ }
  },
  get(key) {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return null;
      const { value, expires } = JSON.parse(raw);
      if (expires && Date.now() > expires) { localStorage.removeItem(key); return null; }
      return value;
    } catch { return null; }
  },
};
```

**96. Cancellable fetch with `AbortController`**
```js
function cancellableFetch(url, options = {}) {
  const controller = new AbortController();
  const promise = fetch(url, { ...options, signal: controller.signal });
  return { promise, cancel: () => controller.abort() };
}
```

**97. Generate valid parentheses for `n` pairs**
```js
function generateParens(n) {
  const result = [];
  function backtrack(current, open, close) {
    if (current.length === n * 2) { result.push(current); return; }
    if (open < n) backtrack(current + '(', open + 1, close);
    if (close < open) backtrack(current + ')', open, close + 1);
  }
  backtrack('', 0, 0);
  return result;
}
```

**98. Reverse a string without built-ins**
```js
function reverse(str) {
  let out = '';
  for (let i = str.length - 1; i >= 0; i--) out += str[i];
  return out;
}
```

**99–103, 106–108, 110–113. String problems** — standard approaches:
- **Palindrome**: compare string to its reverse (or two-pointer from both ends).
- **Anagram**: sort both strings and compare, or compare character-frequency maps — O(n) with a frequency map.
- **First non-repeating char**: build a frequency map in one pass, then scan again for the first with count 1.
- **Character counts**: reduce into a `{char: count}` map.
- **Longest common prefix**: compare character-by-character across all strings, or sort and compare only the first/last.
- **`atoi`**: skip leading whitespace, handle optional sign, consume digits while accumulating, clamp to 32-bit int range.
- **Run-length encoding**: walk the string counting consecutive repeats, emit `char+count`.
- **Rotation check**: `s2` is a rotation of `s1` iff `s1.length === s2.length && (s1+s1).includes(s2)`.
- **Valid shuffle**: two strings are a valid shuffle (interleaving) of a third if lengths match and, at every position, characters can be matched via a two-pointer/DP check.
- **URL encode spaces**: replace `" "` with `"%20"` — `str.split(' ').join('%20')` or a manual character scan for the in-place/array version.

**104. Longest substring without repeating characters (sliding window)**
```js
function longestUnique(str) {
  const seen = new Map();
  let start = 0, max = 0;
  for (let end = 0; end < str.length; end++) {
    const c = str[end];
    if (seen.has(c) && seen.get(c) >= start) start = seen.get(c) + 1;
    seen.set(c, end);
    max = Math.max(max, end - start + 1);
  }
  return max;
}
```

**105. Longest palindromic substring (expand around center)**
```js
function longestPalindrome(s) {
  let start = 0, maxLen = 0;
  const expand = (l, r) => {
    while (l >= 0 && r < s.length && s[l] === s[r]) { l--; r++; }
    if (r - l - 1 > maxLen) { maxLen = r - l - 1; start = l + 1; }
  };
  for (let i = 0; i < s.length; i++) { expand(i, i); expand(i, i + 1); }
  return s.slice(start, start + maxLen);
}
```

**109. Title Case / acronym**
```js
const toTitleCase = s => s.replace(/\b\w/g, c => c.toUpperCase());
const toAcronym = s => s.split(' ').map(w => w[0].toUpperCase()).join('');
```

**114. Move zeros to end**
```js
function moveZeros(arr) {
  let insertPos = 0;
  for (const n of arr) if (n !== 0) arr[insertPos++] = n;
  while (insertPos < arr.length) arr[insertPos++] = 0;
  return arr;
}
// [1,0,1,0,0,1,0,1] -> [1,1,1,1,0,0,0,0]
```

**115. Middle of a linked list (fast/slow pointers)**
```js
function findMiddle(head) {
  let slow = head, fast = head;
  while (fast && fast.next) { slow = slow.next; fast = fast.next.next; }
  return slow;
}
```

**116. Two Sum (optimized, O(n))**
```js
function twoSum(nums, target) {
  const seen = new Map();
  for (let i = 0; i < nums.length; i++) {
    const need = target - nums[i];
    if (seen.has(need)) return [seen.get(need), i];
    seen.set(nums[i], i);
  }
  return [];
}
```

**117. Sliding window / two pointers**
General pattern: maintain a window `[start, end]` (or two pointers moving toward each other) over an array/string, expanding/shrinking based on a condition, to avoid an O(n²) brute force — used in problems like longest substring, max subarray sum of size k, and container-with-most-water.

**118. LRU Cache**
```js
class LRUCache {
  constructor(capacity) { this.capacity = capacity; this.map = new Map(); }
  get(key) {
    if (!this.map.has(key)) return -1;
    const val = this.map.get(key);
    this.map.delete(key);
    this.map.set(key, val); // move to most-recently-used
    return val;
  }
  put(key, value) {
    if (this.map.has(key)) this.map.delete(key);
    else if (this.map.size >= this.capacity) this.map.delete(this.map.keys().next().value);
    this.map.set(key, value);
  }
}
```

**119. Running median from a stream (two heaps)**
Maintain a max-heap for the lower half and a min-heap for the upper half, keeping their sizes balanced (differ by at most 1). The median is the top of the larger heap, or the average of both tops if equal in size. JS has no built-in heap, so implement a binary heap array or use a sorted-insert array for interview purposes (O(n) insert, acceptable if not optimizing for large streams).
