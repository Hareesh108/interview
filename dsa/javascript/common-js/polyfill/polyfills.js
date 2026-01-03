/**********************************************************
 * 1️⃣ Array.prototype.map() — POLYFILL
 * Use case: Transform array values
 **********************************************************/
Array.prototype.myMap = function (callback, thisArg) {
  const result = [];

  for (let i = 0; i < this.length; i++) {
    if (i in this) {
      result.push(callback.call(thisArg, this[i], i, this));
    }
  }

  return result;
};

// use case
// [1,2,3].myMap(x => x * 2) → [2,4,6]

/**********************************************************
 * 2️⃣ Array.prototype.filter() — POLYFILL
 * Use case: Select subset of data
 **********************************************************/
Array.prototype.myFilter = function (callback, thisArg) {
  const result = [];

  for (let i = 0; i < this.length; i++) {
    if (i in this && callback.call(thisArg, this[i], i, this)) {
      result.push(this[i]);
    }
  }

  return result;
};

// use case
// [1,2,3,4].myFilter(x => x % 2 === 0) → [2,4]

/**********************************************************
 * 3️⃣ Array.prototype.reduce() — POLYFILL
 * Use case: Aggregate values (sum, flatten, group)
 **********************************************************/
Array.prototype.myReduce = function (callback, initialValue) {
  let acc = initialValue;
  let startIndex = 0;

  if (acc === undefined) {
    acc = this[0];
    startIndex = 1;
  }

  for (let i = startIndex; i < this.length; i++) {
    acc = callback(acc, this[i], i, this);
  }

  return acc;
};

// use case
// [1,2,3].myReduce((a,b) => a + b, 0) → 6

/**********************************************************
 * 4️⃣ call() — POLYFILL
 * Use case: Method borrowing, explicit `this`
 **********************************************************/
Function.prototype.myCall = function (context, ...args) {
  context = context || globalThis;
  const key = Symbol();
  context[key] = this;

  const result = context[key](...args);
  delete context[key];

  return result;
};

/**********************************************************
 * 5️⃣ apply() — POLYFILL
 * Use case: Same as call, args as array
 **********************************************************/
Function.prototype.myApply = function (context, args = []) {
  context = context || globalThis;
  const key = Symbol();
  context[key] = this;

  const result = context[key](...args);
  delete context[key];

  return result;
};

/**********************************************************
 * 6️⃣ bind() — POLYFILL
 * Use case: Fix `this` for callbacks/events
 **********************************************************/
Function.prototype.myBind = function (context, ...bindArgs) {
  const fn = this;
  return function (...callArgs) {
    return fn.apply(context, [...bindArgs, ...callArgs]);
  };
};

/**********************************************************
 * 7️⃣ Promise.all() — POLYFILL
 * Use case: Run async tasks in parallel
 **********************************************************/
Promise.myAll = function (promises) {
  return new Promise((resolve, reject) => {
    const result = [];
    let completed = 0;

    promises.forEach((p, i) => {
      Promise.resolve(p)
        .then(res => {
          result[i] = res;
          completed++;
          if (completed === promises.length) {
            resolve(result);
          }
        })
        .catch(reject);
    });
  });
};

// use case
// Promise.myAll([p1, p2, p3]).then(res => {})

/**********************************************************
 * 8️⃣ debounce() — POLYFILL
 * Use case: Search input, resize event
 **********************************************************/
function debounce(fn, delay) {
  let timer;

  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

// use case
// input.onkeyup = debounce(searchApi, 500)

/**********************************************************
 * 9️⃣ throttle() — POLYFILL
 * Use case: Scroll, mouse move
 **********************************************************/
function throttle(fn, limit) {
  let lastRun = 0;

  return function (...args) {
    const now = Date.now();
    if (now - lastRun >= limit) {
      fn.apply(this, args);
      lastRun = now;
    }
  };
}

/**********************************************************
 * 🔟 once() — POLYFILL
 * Use case: Run init logic once
 **********************************************************/
function once(fn) {
  let called = false;
  let result;

  return function (...args) {
    if (!called) {
      called = true;
      result = fn.apply(this, args);
    }
    return result;
  };
}

// use case
// const init = once(setupApp)

/**********************************************************
 * 1️⃣1️⃣ memoize() — POLYFILL
 * Use case: Cache expensive calculations
 **********************************************************/
function memoize(fn) {
  const cache = {};

  return function (...args) {
    const key = JSON.stringify(args);
    if (cache[key]) return cache[key];

    cache[key] = fn.apply(this, args);
    return cache[key];
  };
}

// use case
// const fastFib = memoize(fib)

/**********************************************************
 * 1️⃣2️⃣ Promise (basic implementation idea)
 * Use case: Async control flow
 **********************************************************/
function MyPromise(executor) {
  let state = "pending";
  let value;
  let handlers = [];

  function resolve(val) {
    if (state !== "pending") return;
    state = "fulfilled";
    value = val;
    handlers.forEach(h => h(value));
  }

  executor(resolve);
}

MyPromise.prototype.then = function (onFulfilled) {
  return new MyPromise(resolve => {
    if (this.state === "fulfilled") {
      resolve(onFulfilled(this.value));
    } else {
      this.handlers.push(val => resolve(onFulfilled(val)));
    }
  });
};
