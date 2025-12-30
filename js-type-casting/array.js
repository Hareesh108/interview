/********************************************************************
 🔥 ALL ARRAY COMPARISONS IN JAVASCRIPT (COMPLETE)

 Arrays are objects in JavaScript.

 CORE RULE:
 ---------------------------------------------------
 - Arrays are compared by REFERENCE when compared
   with arrays or objects.
 - When compared with primitives using `==`,
   arrays are converted to primitives using:
       toString() → valueOf()
 - === NEVER performs coercion.

 ARRAY → PRIMITIVE CONVERSION:
 ---------------------------------------------------
 []        → ""      → 0
 [1]       → "1"     → 1
 [1,2]     → "1,2"   → NaN
********************************************************************/


/* ====================================================
 1️⃣ Array vs Array
 ==================================================== */

console.log([] == []);    // false
console.log([] === []);   // false

// WHY?
// Different array literals → different references


/* ====================================================
 2️⃣ Same Array Reference
 ==================================================== */

const a1 = [];
const a2 = a1;

console.log(a1 == a2);    // true
console.log(a1 === a2);   // true

// WHY?
// Same reference in memory


/* ====================================================
 3️⃣ Array vs Object
 ==================================================== */

console.log([] == {});    // false
console.log([] === {});   // false

// WHY?
// Both are objects → reference comparison
// Different references → false


/* ====================================================
 4️⃣ Array vs String
 ==================================================== */

console.log([] == "");          // true
console.log([1] == "1");        // true
console.log([1,2] == "1,2");    // true
console.log([1,2] == "12");     // false

// WHY?
// Array → toString() → comma-separated string


/* ====================================================
 5️⃣ Array vs Number
 ==================================================== */

console.log([] == 0);       // true
console.log([0] == 0);      // true
console.log([1] == 1);      // true
console.log([2] == 2);      // true
console.log([1,2] == 12);   // false
console.log([1,2] == NaN);  // false

// WHY?
// "" → 0
// "1" → 1
// "1,2" → NaN


/* ====================================================
 6️⃣ Array vs Boolean
 ==================================================== */

console.log([] == false);  // true
console.log([] == true);   // false
console.log([1] == true);  // true
console.log([0] == false); // true

// WHY?
// Boolean → Number
// false → 0
// true  → 1
// Array → primitive → number


/* ====================================================
 7️⃣ Array vs null / undefined
 ==================================================== */

console.log([] == null);       // false
console.log([] == undefined);  // false

// WHY?
// null == undefined is special
// Arrays are objects → excluded


/* ====================================================
 8️⃣ Array vs NaN
 ==================================================== */

console.log([] == NaN);    // false
console.log([1] == NaN);   // false

// WHY?
// NaN is never equal to anything


/* ====================================================
 9️⃣ Nested Arrays
 ==================================================== */

console.log([[1]] == 1);      // true
console.log([[1,2]] == "1,2"); // true
console.log([[1,2]] == 12);    // false

// WHY?
// [[1]] → "1" → 1
// [[1,2]] → "1,2"


/* ====================================================
 🔟 Empty Array Edge Cases (VERY IMPORTANT)
 ==================================================== */

console.log([] == ![]);     // true
console.log([] == 0);       // true
console.log([] == "0");     // false
console.log([] == "");      // true

// WHY?
// ![] → false → 0
// []  → "" → 0


/* ====================================================
 1️⃣1️⃣ Array vs Symbol
 ==================================================== */

const sym = Symbol("x");

console.log([] == sym);   // false
// TypeError avoided because == does not coerce Symbol

// WHY?
// Symbols cannot be coerced to numbers or strings


/* ====================================================
 1️⃣2️⃣ Array vs Wrapper Objects
 ==================================================== */

console.log([] == new Number(0));  // true
console.log([1] == new String("1")); // true

// WHY?
// Wrapper object → primitive
// Array → primitive


/********************************************************************
 ✅ FINAL ARRAY SUMMARY (INTERVIEW GOLD)

 - Arrays are objects → reference-based comparison
 - == triggers array → primitive conversion
 - toString() is key for arrays
 - [] is the MOST dangerous value in coercion
 - === NEVER coerces

 ONE-LINER:
 "Arrays in JavaScript are objects. When compared
 with ==, they are converted to primitives using
 toString(), which leads to many surprising results."
********************************************************************/
