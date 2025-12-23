# JavaScript: `prototype` vs `__proto__`

## Problem

JavaScript must:

- Define what newly created objects should inherit.
- Resolve properties dynamically at runtime.

To solve this, JavaScript uses **two different mechanisms**.

## Why Both Exist

- **`prototype`** → defines inheritance **at object creation time**
- **`__proto__`** → resolves inheritance **at property access time**

They operate at **different phases** of execution.

## `prototype`

- Exists only on **constructor functions**
- Used by the `new` keyword
- Defines shared properties for instances

### Example

```js
function Person(name) {
  this.name = name;
}

Person.prototype.sayHi = function () {
  console.log("Hi, I am " + this.name);
};

const p1 = new Person("Hareesh");
````

---

## `__proto__`

- Exists on **all JavaScript objects**
- Points to the object used for property lookup
- Traversed on every property access

### Example

```js
p1.__proto__ === Person.prototype; // true
p1.sayHi(); // resolved via __proto__
```

---

## How They Work Together

```js
const p1 = new Person("Hareesh");

// internal behavior
p1.__proto__ = Person.prototype;
```

Property lookup order:

```txt
p1 → Person.prototype → Object.prototype → null
```

---

## Differences

| Feature    | `prototype`        | `__proto__`        |
| ---------- | ------------------ | ------------------ |
| Belongs to | Functions          | Objects            |
| Purpose    | Define inheritance | Resolve properties |
| Used when  | `new` is called    | Property access    |
| Execution  | Once               | Every access       |

---

## Rule

```js
object.__proto__ === Constructor.prototype
```

---

## Notes

- `__proto__` is deprecated for direct use
- Use instead:

```js
Object.getPrototypeOf(obj)
Object.setPrototypeOf(obj, proto)
```
