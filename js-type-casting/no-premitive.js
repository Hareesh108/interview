/***********************************************************************
 🔥 NON-PRIMITIVE COMPARISONS IN JAVASCRIPT (SENIOR-LEVEL GUIDE)

 NON-PRIMITIVES (Objects):
 --------------------------------------------------
 1. Object
 2. Array
 3. Function
 4. Date
 5. RegExp
 6. Map
 7. Set
 8. WeakMap
 9. WeakSet
 10. TypedArray
 11. ArrayBuffer
 12. DataView
 13. Error
 14. Promise
 15. Class Instance
 16. Wrapper Objects (Number, String, Boolean)

 CORE RULE (NEVER BREAKS):
 --------------------------------------------------
 - All non-primitives are OBJECTS
 - Objects are compared by REFERENCE
 - `==` may coerce OBJECT → PRIMITIVE
 - `===` NEVER coerces
 - Different references → false
***********************************************************************/


/* =====================================================
 1️⃣ Object vs Object
 ===================================================== */

console.log({} == {});    // false
console.log({} === {});   // false

// WHY?
// Each object literal creates a new memory reference.


/* =====================================================
 2️⃣ Same Object Reference
 ===================================================== */

const objA = {};
const objB = objA;

console.log(objA == objB);    // true
console.log(objA === objB);   // true

// WHY?
// Both variables point to the same object.


/* =====================================================
 3️⃣ Array vs Array
 ===================================================== */

console.log([] == []);     // false
console.log([] === []);    // false

// WHY?
// Arrays are objects → reference comparison.


/* =====================================================
 4️⃣ Array vs Primitive (🔥 VERY IMPORTANT)
 ===================================================== */

console.log([] == 0);        // true
console.log([1] == 1);       // true
console.log([1,2] == "1,2"); // true
console.log([] == false);    // true

// WHY?
// Array → toString() → "" or "1,2"
// Then coerced to number if needed.


/* =====================================================
 5️⃣ Function vs Function
 ===================================================== */

console.log(function(){} == function(){}); // false

const fnA = () => {};
const fnB = fnA;

console.log(fnA === fnB); // true

// WHY?
// Functions are objects → reference based.


/* =====================================================
 6️⃣ Date vs Date
 ===================================================== */

const d1 = new Date("2024-01-01");
const d2 = new Date("2024-01-01");

console.log(d1 == d2);   // false
console.log(d1 === d2);  // false

// WHY?
// Same date value, different object references.


/* =====================================================
 7️⃣ Date vs Number / String
 ===================================================== */

console.log(d1 == d1.getTime()); // true
console.log(d1 == d1.toString()); // false

// WHY?
// Date.valueOf() returns timestamp (number).


/* =====================================================
 8️⃣ RegExp vs RegExp
 ===================================================== */

console.log(/abc/ == /abc/);   // false

const r = /abc/;
console.log(r == r);           // true

// WHY?
// RegExp objects are compared by reference.


/* =====================================================
 9️⃣ Map vs Map
 ===================================================== */

console.log(new Map() == new Map()); // false

const map = new Map();
console.log(map === map); // true

// WHY?
// Map is an object. No deep equality by default.


/* =====================================================
 🔟 Set vs Set
 ===================================================== */

console.log(new Set() == new Set()); // false

const set = new Set();
console.log(set === set); // true


/* =====================================================
 1️⃣1️⃣ WeakMap / WeakSet
 ===================================================== */

console.log(new WeakMap() == new WeakMap()); // false
console.log(new WeakSet() == new WeakSet()); // false

// WHY?
// Weak collections are still objects.


/* =====================================================
 1️⃣2️⃣ TypedArray Comparisons
 ===================================================== */

const t1 = new Int8Array([1,2]);
const t2 = new Int8Array([1,2]);

console.log(t1 == t2);   // false
console.log(t1 === t2);  // false

// WHY?
// TypedArrays are objects → reference comparison.


/* =====================================================
 1️⃣3️⃣ ArrayBuffer & DataView
 ===================================================== */

const buf1 = new ArrayBuffer(8);
const buf2 = new ArrayBuffer(8);

console.log(buf1 == buf2); // false

const view = new DataView(buf1);
console.log(view == view); // true

// WHY?
// Binary data structures are objects.


/* =====================================================
 1️⃣4️⃣ Error Objects
 ===================================================== */

console.log(new Error("x") == new Error("x")); // false

const err = new Error("boom");
console.log(err === err); // true


/* =====================================================
 1️⃣5️⃣ Promise Comparisons
 ===================================================== */

console.log(Promise.resolve(1) == Promise.resolve(1)); // false

const p = Promise.resolve(1);
console.log(p === p); // true

// WHY?
// Promises represent async state → object identity only.


/* =====================================================
 1️⃣6️⃣ Class Instances
 ===================================================== */

class User {
  constructor(name) {
    this.name = name;
  }
}

const u1 = new User("A");
const u2 = new User("A");

console.log(u1 == u2);  // false

// WHY?
// Same class, same data, different instances.


/* =====================================================
 🔥 Wrapper Objects (EXTREMELY IMPORTANT)
 ===================================================== */

console.log(new Number(5) == 5);     // true
console.log(new Number(5) === 5);    // false

console.log(new String("a") == "a"); // true
console.log(new Boolean(false) == false); // true

// WHY?
// Wrapper object → primitive coercion happens with ==
// === does not allow coercion.


/***********************************************************************
 ✅ SENIOR-LEVEL SUMMARY

 - All non-primitives are objects
 - Objects are compared by reference only
 - `==` may coerce object → primitive
 - Arrays use toString()
 - Date uses valueOf()
 - Promises, Maps, Sets have NO value equality
 - `===` is predictable and safe

 GOLD INTERVIEW LINE:
 --------------------------------------------------
 "JavaScript does not provide structural equality
 for objects. All non-primitives are compared by
 reference, and `==` may introduce coercion bugs.
 In production, `===` or explicit deep comparison
 is mandatory."
***********************************************************************/
