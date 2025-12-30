/***********************************************************************
 🔥 ALL PRIMITIVE COMPARISONS IN JAVASCRIPT (SENIOR FE GUIDE)

 PRIMITIVE TYPES (EXACTLY 7):
 --------------------------------------------------
 1. number
 2. string
 3. boolean
 4. null
 5. undefined
 6. symbol
 7. bigint

 CORE RULES:
 --------------------------------------------------
 - Primitives are compared by VALUE
 - `==` allows coercion
 - `===` does NOT allow coercion
 - NaN is never equal to anything
 - null == undefined is a SPECIAL CASE
***********************************************************************/


/* =====================================================
 1️⃣ NUMBER vs NUMBER
 ===================================================== */

console.log(5 == 5);        // true
console.log(5 === 5);       // true
console.log(5 == 6);        // false

console.log(NaN == NaN);    // false
console.log(NaN === NaN);   // false

console.log(0 == -0);       // true
console.log(0 === -0);      // true

console.log(Infinity == Infinity); // true

// WHY?
// Numbers are compared by value.
// NaN is never equal to anything (IEEE rule).
// +0 and -0 are considered equal in JS equality.


/* =====================================================
 2️⃣ STRING vs STRING
 ===================================================== */

console.log("hi" == "hi");     // true
console.log("hi" === "hi");    // true
console.log("Hi" == "hi");     // false
console.log("" == "");         // true

// WHY?
// Strings are compared character-by-character.
// Case-sensitive, no trimming.


/* =====================================================
 3️⃣ BOOLEAN vs BOOLEAN
 ===================================================== */

console.log(true == true);     // true
console.log(false === false);  // true
console.log(true == false);    // false

// WHY?
// Same type → direct comparison.
// No coercion when both are booleans.


/* =====================================================
 4️⃣ STRING vs NUMBER (🔥 VERY IMPORTANT)
 ===================================================== */

console.log("5" == 5);     // true
console.log("5" === 5);    // false

console.log("" == 0);      // true
console.log(" " == 0);     // true
console.log("0" == 0);     // true
console.log("abc" == 1);   // false

// WHY?
// `==` converts string → number.
// "" and " " become 0.
// "abc" becomes NaN.


/* =====================================================
 5️⃣ BOOLEAN vs NUMBER
 ===================================================== */

console.log(true == 1);     // true
console.log(false == 0);    // true
console.log(true === 1);    // false

// WHY?
// Boolean → Number
// true → 1, false → 0


/* =====================================================
 6️⃣ BOOLEAN vs STRING
 ===================================================== */

console.log(true == "1");     // true
console.log(false == "0");    // true
console.log(false == "");     // true
console.log(true == "true");  // false

// WHY?
// Boolean → Number → String → Number comparison


/* =====================================================
 7️⃣ NULL vs UNDEFINED (🔥 SPECIAL CASE)
 ===================================================== */

console.log(null == undefined);   // true
console.log(null === undefined);  // false

console.log(null == 0);           // false
console.log(undefined == 0);      // false
console.log(null == false);       // false

// WHY?
// null ONLY equals undefined with `==`.
// No other value matches null.


/* =====================================================
 8️⃣ NULL / UNDEFINED vs STRING or NUMBER
 ===================================================== */

console.log(null == "");       // false
console.log(undefined == "");  // false
console.log(null == NaN);      // false

// WHY?
// null and undefined do NOT coerce to numbers in equality.


/* =====================================================
 9️⃣ SYMBOL vs ANYTHING (CRITICAL)
 ===================================================== */

const s1 = Symbol("x");
const s2 = Symbol("x");

console.log(s1 == s2);      // false
console.log(s1 === s2);     // false
console.log(s1 === s1);     // true

// console.log(s1 == "x");  // TypeError
// console.log(s1 == 1);    // TypeError

// WHY?
// Symbols are unique.
// Symbols cannot be coerced to number or string.


/* =====================================================
 🔟 BIGINT vs BIGINT
 ===================================================== */

console.log(10n == 10n);    // true
console.log(10n === 10n);   // true

// WHY?
// BigInt compared by value when same type.


/* =====================================================
 1️⃣1️⃣ BIGINT vs NUMBER (IMPORTANT EDGE CASE)
 ===================================================== */

console.log(10n == 10);     // true
console.log(10n === 10);    // false

console.log(9007199254740993n == 9007199254740993); // false

// WHY?
// `==` allows comparison if value is safe.
// Precision loss makes comparison false.


/* =====================================================
 1️⃣2️⃣ BIGINT vs STRING
 ===================================================== */

console.log(10n == "10");   // true
console.log(10n === "10");  // false

// WHY?
// String → BigInt (only if valid numeric string).


/* =====================================================
 1️⃣3️⃣ NaN with ALL PRIMITIVES
 ===================================================== */

console.log(NaN == 0);       // false
console.log(NaN == "NaN");   // false
console.log(NaN == false);   // false

// WHY?
// NaN is never equal to anything.


/* =====================================================
 1️⃣4️⃣ typeof EDGE CASES (SENIOR MUST KNOW)
 ===================================================== */

console.log(typeof null);       // "object"  ❌ historical bug
console.log(typeof undefined);  // "undefined"
console.log(typeof NaN);        // "number"
console.log(typeof 10n);        // "bigint"

// WHY?
// typeof null is a known JavaScript bug (legacy).


/***********************************************************************
 ✅ SENIOR DEVELOPER SUMMARY (PRIMITIVES)

 - Primitives compare by VALUE
 - `==` performs coercion, `===` does not
 - null == undefined is the ONLY special equality
 - NaN is never equal to anything
 - Symbols never coerce
 - BigInt has strict numeric rules

 GOLD INTERVIEW ONE-LINER:
 --------------------------------------------------
 "JavaScript has seven primitive types. They are
 compared by value, with `==` allowing coercion
 under strict rules. As a senior developer,
 I avoid `==` except when explicitly required
 and always understand null, NaN, Symbol,
 and BigInt edge cases."
***********************************************************************/
