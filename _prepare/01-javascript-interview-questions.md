# JavaScript Interview Questions

## Core Language Fundamentals
1. `var` vs `let` vs `const` — hoisting, block scope, TDZ
2. Function hoisting vs variable hoisting
3. `null` vs `undefined` vs `undeclared` variables
4. Primitive vs non-primitive (reference) data types
5. Pass by value vs pass by reference
6. `==` vs `===` — type coercion and implicit conversion
7. What is the output of `3 + 2 + "7"`? (type coercion trace)
8. Truthy/falsy values, `NaN` and how to check for it
9. `typeof` operator behavior across types
10. Strict mode — what it changes and why it exists
11. Dynamically typed vs statically typed language — where JS fits
12. TypeScript vs JavaScript — key differences

## Scope, Closures & `this`
13. Closures — definition, lexical scope, real-world use cases (not just theory)
14. IIFE (Immediately Invoked Function Expression) — purpose and use cases
15. `this` keyword — behavior in regular functions, arrow functions, methods, constructors
16. `call()`, `apply()`, `bind()` — differences and polyfill implementations
17. Currying — normal currying, partial application vs currying, infinite currying
   (e.g. `sum(10)(20)(30)() → 60`, `sum(10)(20)(30)(40)(50)(60)() → 210`)

## Prototypes & OOP
18. Prototype and the prototype chain — how inheritance works with a real example
19. Classes, constructors, `super`
20. Core OOP concepts implemented in JS
21. SOLID principles explained in JS terms
22. Common design patterns (Factory, Singleton, etc.) in JS
23. Functional programming vs OOP in JS

## Async JavaScript & the Event Loop
24. Event loop — call stack, Web APIs, microtasks vs macrotasks, execution priority
25. Event-loop starvation
26. `setTimeout` / `setInterval` — how they work, how to stop them
27. Callbacks and callback hell
28. Promises — `.then/.catch/.finally`, chaining, error handling
29. `Promise.all` vs `allSettled` vs `any` vs `race`
30. Writing a custom `Promise.allSettled()` polyfill
31. `async`/`await` vs raw Promises — parallel vs sequential execution
32. Predicting output: `setTimeout` + Promises + `async/await` interleaving
33. Converting callback-based code to Promise-based code
34. Web Workers and off-main-thread execution
35. Async race conditions — stale responses, cancellation with `AbortController`

## Objects, Arrays & Functional Methods
36. `map()` vs `filter()` vs `forEach()` vs `reduce()`
37. Pure vs impure functions
38. `for...in` vs `for...of`
39. Higher-order functions
40. Spread operator vs rest parameter
41. Object.freeze() vs Object.seal()
42. `Object.keys()` vs `Object.values()` vs `Object.entries()`
43. Different ways to create an object in JS
44. Shallow copy vs deep copy — behavior and how to achieve each
45. Mutation, nested references, and cloning pitfalls
46. Can mutable objects be used as `Map`/object keys? What issues arise?
47. `slice()` vs `splice()`
48. Destructuring (array & object)
49. Template literals and their advantages
50. `arguments` object vs rest parameters
51. `find()` vs `findIndex()`
52. Generator functions
53. Immutability — why it matters in JS apps
54. Memory leaks and garbage collection — common causes (listeners, timers, closures)

## Browser, DOM & Web APIs
55. DOM vs BOM
56. Event bubbling vs event capturing vs event delegation (with example)
57. `event.target` vs `event.currentTarget`
58. `preventDefault()` vs `stopPropagation()`
59. `innerHTML` vs `textContent` vs `innerText`
60. Script loading: normal `<script>` vs `async` vs `defer` vs ES modules
61. Debouncing vs throttling — differences, use cases, implementation
62. `localStorage` vs `sessionStorage` vs cookies vs `IndexedDB` — trade-offs and security
63. Authentication vs authorization
64. Sessions vs tokens; `HttpOnly`, `Secure`, `SameSite` cookie attributes
65. CORS and Same-Origin Policy — preflight requests, allowed origins
66. XSS, CSRF, sanitization, CSP, and safe token storage (frontend security basics)
67. HTTP fundamentals — methods, status codes, headers, caching
68. DNS/TCP/TLS — what happens after you type a URL and hit Enter
69. Browser rendering pipeline — DOM, CSSOM, render tree, layout, paint, compositing
70. Reflow vs repaint; Critical Rendering Path
71. Caching — browser cache, `Cache-Control`, ETags, CDN caching
72. Web APIs — `fetch`, timers, Intersection Observer, Resize Observer, Web Storage
73. `eval()` — what it does and why it's discouraged
74. Interceptors (e.g. Axios) — purpose and use cases
75. Tree shaking — how unused code is eliminated at build time
76. `fetch` vs `axios`
77. REST vs GraphQL — when to choose which

## Tooling & Package Management
78. `package.json` vs `package-lock.json`
79. `^` vs `~` in semantic versioning

## Coding / Polyfill Challenges
80. Implement `debounce()` from scratch
81. Implement `throttle()` from scratch
82. Flatten a deeply nested array without `Array.flat()`
83. Polyfill for `Array.prototype.map`, `filter`, `reduce`
84. Polyfill for `Function.prototype.bind`, `call`, `apply`
85. Implement `once(fn)` — a function that runs only once
86. Deep clone an object, including nested objects and arrays
87. Write a deep-equal function tolerant of order-insensitive primitive arrays
88. Implement a memoization function
89. Remove duplicates from an array without using `Set`
90. Find the maximum number in an array without `Math.max()`
91. Group an array of objects by a property, in a single iteration
92. Flatten a deeply nested object to dot-path keys and unflatten it back
93. Implement `set(obj, path, value)` to create nested paths
94. Convert `snake_case` to `camelCase` recursively (including arrays)
95. Build a custom `localStorage` wrapper with expiry and fallback logic
96. Implement a cancellable `fetch` wrapper using `AbortController`
97. Generate all valid parentheses combinations for `n` pairs
98. Reverse a string without built-in methods
99. Check if a string is a palindrome
100. Check if two strings are anagrams
101. Find the first non-repeating character in a string
102. Count occurrences of each character in a string
103. Find the most frequent character in a string
104. Longest substring without repeating characters
105. Longest palindromic substring
106. Longest common prefix among strings
107. Convert a string to an integer (`atoi` implementation)
108. Compress a string (run-length encoding)
109. Convert a sentence to Title Case / to an acronym
110. Check if a string is a rotation of another string
111. Check if a string is a valid shuffle of two other strings
112. Replace spaces with `%20` (URL encoding)
113. Remove all whitespace / a given character from a string
114. Move all zeros in an array to the end (e.g. `[1,0,1,0,0,1,0,1]`)
115. Find the middle node of a linked list
116. Two Sum (optimized approach)
117. Sliding window and two-pointer style problems
118. Implement a basic LRU cache
119. Given a stream of integers, return the running median (two-heaps approach)
