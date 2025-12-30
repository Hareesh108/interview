/********************************************************************
 🔥 ALL IMPORTANT OBJECT COMPARISONS IN JAVASCRIPT

 Objects include:
 - Plain objects {}
 - Arrays []
 - Functions
 - Dates
 - Wrapper objects (new Number, new String, new Boolean)

 CORE RULE:
 ---------------------------------------------------
 Objects are compared by REFERENCE, not by VALUE.

 When compared with primitives using `==`,
 JavaScript tries to convert the OBJECT → PRIMITIVE
 using:
   1. valueOf()
   2. toString()
********************************************************************/


/* ====================================================
 1️⃣ Object vs Object
 ==================================================== */

console.log({} == {});   // false
console.log({} === {});  // false

// WHY?
// Each {} creates a new object in memory.
// Different references → false


/* ====================================================
 2️⃣ Same Object Reference
 ==================================================== */

const obj1 = {};
const obj2 = obj1;

console.log(obj1 == obj2);   // true
console.log(obj1 === obj2);  // true

// WHY?
// Both variables point to the SAME object reference.


/* ====================================================
 3️⃣ Array vs Array
 ==================================================== */

console.log([] == []);   // false
console.log([] === []);  // false

// WHY?
// Arrays are objects → compared by reference.


/* ====================================================
 4️⃣ Same Array Reference
 ==================================================== */

const arr1 = [];
const arr2 = arr1;

console.log(arr1 == arr2);   // true
console.log(arr1 === arr2);  // true


/* ====================================================
 5️⃣ Object vs Boolean
 ==================================================== */

console.log({} == true);   // false
console.log({} == false);  // false

// WHY?
// Boolean → Number
// true  → 1
// false → 0
// Object → "[object Object]" → NaN
// NaN == 0 or 1 → false


/* ====================================================
 6️⃣ Object vs Number
 ==================================================== */

console.log({} == 0);   // false
console.log({} == 1);   // false

// WHY?
// Object → "[object Object]" → NaN
// NaN never equals a number


/* ====================================================
 7️⃣ Object vs String
 ==================================================== */

console.log({} == "[object Object]"); // true

// WHY?
// {} → toString() → "[object Object]"
// String matches → true


/* ====================================================
 8️⃣ Object vs null / undefined
 ==================================================== */

console.log({} == null);       // false
console.log({} == undefined);  // false

// WHY?
// null == undefined is a SPECIAL CASE
// Objects do NOT participate in that rule


/* ====================================================
 9️⃣ Array vs Number
 ==================================================== */

console.log([] == 0);    // true
console.log([1] == 1);   // true
console.log([2] == 2);   // true
console.log([1,2] == 12); // false

// WHY?
// []      → ""  → 0
// [1]     → "1" → 1
// [1,2]   → "1,2" → NaN


/* ====================================================
 🔟 Array vs String
 ==================================================== */

console.log([] == "");        // true
console.log([1] == "1");      // true
console.log([1,2] == "1,2");  // true

// WHY?
// Array → toString() → comma-separated string


/* ====================================================
 1️⃣1️⃣ Array vs Boolean
 ==================================================== */

console.log([] == false); // true
console.log([] == true);  // false

// WHY?
// false → 0
// [] → "" → 0 → true
// true → 1 → 0 == 1 → false


/* ====================================================
 1️⃣2️⃣ Function vs Function
 ==================================================== */

console.log(
  function () {} == function () {}
); // false

const fn1 = function () {};
const fn2 = fn1;

console.log(fn1 == fn2); // true

// WHY?
// Functions are objects → reference comparison


/* ====================================================
 1️⃣3️⃣ Date Object Comparisons
 ==================================================== */

const d1 = new Date("2024-01-01");
const d2 = new Date("2024-01-01");

console.log(d1 == d2);  // false
console.log(d1 === d2); // false

// WHY?
// Dates are objects → different references


console.log(d1 == d1); // true


/* ====================================================
 1️⃣4️⃣ Wrapper Objects (VERY IMPORTANT)
 ==================================================== */

console.log(new Number(5) == 5);    // true
console.log(new Number(5) === 5);   // false

console.log(new String("a") == "a"); // true
console.log(new String("a") === "a"); // false

// WHY?
// Object → primitive conversion happens with ==
// === does NOT allow coercion


/* ====================================================
 1️⃣5️⃣ Object vs NaN
 ==================================================== */

console.log({} == NaN); // false
console.log([] == NaN); // false

// WHY?
// NaN is never equal to anything


/********************************************************************
 ✅ FINAL INTERVIEW SUMMARY (OBJECTS ONLY)

 - Objects are compared by REFERENCE
 - Different objects → false
 - Same reference → true
 - Object vs Primitive → Object converts to primitive
 - Arrays convert using toString()
 - null == undefined is the ONLY special equality
 - === never coerces, ever

 ONE-LINER:
 "Objects in JavaScript are compared by reference.
 When compared with primitives using `==`,
 objects are first converted to primitives using
 valueOf or toString."
********************************************************************/
