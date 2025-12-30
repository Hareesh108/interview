/***********************************************************************
 🏆 JAVASCRIPT TYPE COERCION — GOLDEN RULES (SENIOR FE)

 PURPOSE:
 --------------------------------------------------
 This file gives you a PREDICTABLE mental model to
 understand how JavaScript converts types when using `==`.

 If you understand these rules, you will NEVER guess
 JS behavior again.

 IMPORTANT:
 --------------------------------------------------
 - `===` NEVER coerces
 - `==` follows a FIXED ORDER (not left vs right)
***********************************************************************/


/* =====================================================
 🥇 RULE 1: === NEVER DOES TYPE CONVERSION
 ===================================================== */

console.log(5 === "5");     // false
console.log(null === undefined); // false
console.log([] === []);     // false

// WHY?
// Strict equality checks both TYPE and VALUE.
// Different types → immediately false.


/* =====================================================
 🥈 RULE 2: == FOLLOWS A FIXED PRIORITY ORDER
 (NOT LEFT-TO-RIGHT)
 ===================================================== */

/*
 ORDER:
 1. Same Type        → direct comparison
 2. null/undefined  → special case
 3. Boolean         → Number
 4. Object          → Primitive
 5. String ↔ Number → Number
 6. NaN / Symbol    → always false
*/


/* =====================================================
 🥉 RULE 3: SAME TYPE → DIRECT COMPARISON
 ===================================================== */

console.log(5 == 5);          // true
console.log("hi" == "hi");    // true
console.log(true == true);    // true
console.log(NaN == NaN);      // false

// WHY?
// Same type → no coercion.
// NaN is never equal to anything.


/* =====================================================
 🔥 RULE 4: null AND undefined (PRIVATE CLUB)
 ===================================================== */

console.log(null == undefined); // true

console.log(null == 0);         // false
console.log(undefined == 0);    // false
console.log(null == false);     // false

// WHY?
// null ONLY equals undefined with ==.
// No other value is allowed.


/* =====================================================
 🔥 RULE 5: BOOLEAN ALWAYS CONVERTS TO NUMBER
 ===================================================== */

console.log(true == 1);     // true
console.log(false == 0);    // true
console.log(false == "");   // true
console.log(true == "1");   // true

// CONVERSION:
// true  → 1
// false → 0


/* =====================================================
 🔥 RULE 6: OBJECT → PRIMITIVE (MOST IMPORTANT)
 ===================================================== */

/*
 Object → ToPrimitive(object)
 Order:
 1. valueOf()
 2. toString()
*/

// ARRAY CASES
console.log([] == 0);          // true
console.log([] == "");         // true
console.log([1] == 1);         // true
console.log([1,2] == "1,2");   // true

// OBJECT CASES
console.log({} == "[object Object]"); // true
console.log({} == 0);                 // false

// DATE CASE
const d = new Date(0);
console.log(d == 0); // true

// WHY?
// []        → "" → 0
// [1]       → "1" → 1
// {}        → "[object Object]" → NaN
// Date      → valueOf() → timestamp


/* =====================================================
 🔥 RULE 7: STRING vs NUMBER → STRING BECOMES NUMBER
 ===================================================== */

console.log("5" == 5);     // true
console.log("" == 0);      // true
console.log(" " == 0);     // true
console.log("abc" == 1);   // false

// WHY?
// "5"  → 5
// ""   → 0
// " "  → 0
// "abc" → NaN


/* =====================================================
 🔥 RULE 8: BOOLEAN vs OBJECT (COMMON TRAP)
 ===================================================== */

console.log([] == false);  // true
console.log([] == true);   // false
console.log([1] == true);  // true

// FLOW:
// false → 0
// [] → "" → 0
// 0 == 0 → true


/* =====================================================
 🔥 RULE 9: NaN IS A BLACK HOLE
 ===================================================== */

console.log(NaN == 0);        // false
console.log(NaN == "NaN");    // false
console.log(NaN == false);    // false

// WHY?
// NaN is never equal to anything (even itself).


/* =====================================================
 🔥 RULE 10: SYMBOL NEVER COERCES
 ===================================================== */

const s1 = Symbol("x");
const s2 = Symbol("x");

console.log(s1 === s1); // true
console.log(s1 == s2);  // false

// console.log(s1 == "x"); // ❌ TypeError

// WHY?
// Symbols cannot be converted to string or number.


/* =====================================================
 🔥 RULE 11: BIGINT SPECIAL CASES
 ===================================================== */

console.log(10n == 10);     // true
console.log(10n === 10);    // false
console.log(10n == "10");   // true

console.log(9007199254740993n == 9007199254740993); // false

// WHY?
// BigInt can compare with Number only if value is safe.
// Precision loss causes false.


/* =====================================================
 🧠 MASTER MENTAL ALGORITHM (MEMORIZE THIS)
 ===================================================== */

/*
 When you see: A == B

 Ask in order:
 1. Same type? → compare directly
 2. null & undefined? → true
 3. Any Boolean? → convert to Number
 4. Any Object? → convert to Primitive
 5. String vs Number? → convert String
 6. NaN or Symbol? → false
*/


/***********************************************************************
 ✅ SENIOR DEVELOPER GOLDEN STATEMENT

 "JavaScript equality coercion follows a strict,
 deterministic order. Booleans convert to numbers,
 objects convert to primitives, strings convert to
 numbers, and null only equals undefined. Once you
 know the order, JS behavior is fully predictable."

***********************************************************************/
