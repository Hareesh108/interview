/*******************************************************
 🔷 STEP 0: Same Type Comparison (==)

 Rule:
 If Type(x) === Type(y), JavaScript performs
 a DIRECT comparison — NO type coercion happens.

 Comparison behavior depends on the data type:
 ------------------------------------------------
 1. Number   → compared by numeric value (NaN is special)
 2. String   → compared character-by-character
 3. Boolean  → compared by true/false
 4. Object   → compared by reference (memory address)
 5. Array    → same as object (reference-based)
 6. Function → same as object (reference-based)
 7. Symbol   → only equal if it is the SAME symbol

 Key Exception:
 - NaN is NEVER equal to anything, even itself.
*******************************************************/


/* ===============================
   1️⃣ Number vs Number
   =============================== */

console.log(5 == 5);        // true
console.log(10 == 20);      // false
console.log(NaN == NaN);    // false

// WHY?
// Numbers are compared by value.
// NaN is a special value meaning "Not a Number"
// Spec rule: NaN is never equal to anything.


/* ===============================
   2️⃣ String vs String
   =============================== */

console.log("hi" == "hi");   // true
console.log("Hi" == "hi");   // false
console.log("5" == "05");    // false

// WHY?
// Strings are compared character-by-character.
// Case-sensitive.
// No trimming or numeric conversion.


/* ===============================
   3️⃣ Boolean vs Boolean
   =============================== */

console.log(true == true);    // true
console.log(false == false);  // true
console.log(true == false);   // false

// WHY?
// Same type → direct comparison.
// No coercion happens here.


/* ===============================
   4️⃣ Object vs Object
   =============================== */

console.log({} == {}); // false

const obj1 = {};
const obj2 = {};

console.log(obj1 == obj2); // false

// WHY?
// Objects are compared by REFERENCE, not structure.
// Each object literal creates a new memory location.


/* ===============================
   5️⃣ Array vs Array
   =============================== */

console.log([] == []); // false

const arr1 = [];
const arr2 = arr1;

console.log(arr1 == arr2); // true

// WHY?
// Arrays are objects.
// Same reference → true
// Different reference → false


/* ===============================
   6️⃣ Function vs Function
   =============================== */

console.log(
  function () {} == function () {}
); // false

const fn1 = function () {};
const fn2 = fn1;

console.log(fn1 == fn2); // true

// WHY?
// Functions are objects.
// Compared by reference.


/* ===============================
   7️⃣ Symbol vs Symbol
   =============================== */

const sym1 = Symbol("x");
const sym2 = Symbol("x");

console.log(sym1 == sym2); // false

const sym3 = Symbol("y");
console.log(sym3 == sym3); // true

// WHY?
// Every Symbol() call creates a unique symbol.
// Only the SAME symbol reference is equal.


/*******************************************************
 ✅ SUMMARY (STEP 0)

 - Same types → NO coercion
 - Primitives → compared by value
 - Objects    → compared by reference
 - NaN        → never equal
 - Symbols    → equal only by identity

 Interview One-liner:
 "When both operands are of the same type, JavaScript
 performs a direct comparison without coercion.
 Primitives are compared by value, objects by reference,
 and NaN is never equal to anything."
*******************************************************/
