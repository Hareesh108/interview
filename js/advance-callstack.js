// ============================================================
// 1. SYNCHRONOUS CODE
// ============================================================

console.log('1: sync start'); // SYNC #1 → executes immediately

// ============================================================
// 2. MACROTASK: setTimeout A
// ============================================================

setTimeout(() => {
  console.log('2: timeout A'); // MACRO #1 → runs after ALL initial microtasks

  Promise.resolve().then(() => {
    console.log('3: micro A1'); // MICRO → created inside timeout A

    queueMicrotask(() => {
      console.log('4: micro A2'); // MICRO → created inside micro A1
    });
  });

  Promise.resolve().then(() => {
    console.log('5: micro A3'); // MICRO → created inside timeout A
  });
}, 0); // MACRO #1 → added to macrotask queue

// ============================================================
// 3. MICROTASK: Promise.then
// ============================================================

Promise.resolve().then(() => {
  console.log('6: micro B1'); // MICRO #1 → runs after synchronous code

  setTimeout(() => {
    console.log('7: timeout B'); // MACRO → created inside micro B1

    Promise.resolve().then(() => {
      console.log('8: micro B2'); // MICRO → created inside timeout B
    });
  }, 0);

  queueMicrotask(() => {
    console.log('9: micro B3'); // MICRO → created inside micro B1
  });
});

// ============================================================
// 4. ASYNC / AWAIT
// ============================================================

async function test() {
  console.log('10: async start');
  // SYNC #2 → async function starts executing synchronously

  await Promise.resolve();
  // Promise is ALREADY fulfilled.
  // No real waiting/time delay.
  // BUT execution of this function pauses here.
  // Code after await becomes a MICROTASK.

  console.log('11: after await');
  // MICRO → continuation after first await

  await null;
  // null is converted to an already-fulfilled Promise.
  // Again, no real time waiting.
  // Function pauses AGAIN.
  // Code after this await becomes another MICROTASK.

  console.log('12: after second await');
  // MICRO → continuation after second await
}

test();
// Calls test()
// "async start" executes synchronously.
// Function pauses at first await.

// ============================================================
// 5. PROMISE CONSTRUCTOR
// ============================================================

new Promise((resolve) => {
  console.log('13: promise executor');
  // SYNC #3 → Promise executor runs synchronously

  resolve();
  // Promise becomes fulfilled immediately.
}).then(() => {
  console.log('14: promise then');
  // MICRO → .then() callback is always asynchronous

  queueMicrotask(() => {
    console.log('15: nested microtask');
    // MICRO → created inside another microtask
    // Goes to the END of the microtask queue.
  });
});

// ============================================================
// 6. queueMicrotask
// ============================================================

queueMicrotask(() => {
  console.log('16: queueMicrotask');
  // MICRO → added to microtask queue

  Promise.resolve().then(() => {
    console.log('17: promise inside microtask');
    // MICRO → created inside microtask #16
    // Added to the END of the microtask queue.
  });
});

// ============================================================
// 7. MACROTASK: setTimeout C
// ============================================================

setTimeout(() => {
  console.log('18: timeout C');
  // MACRO → added to macrotask queue
}, 0);

// ============================================================
// 8. SYNCHRONOUS END
// ============================================================

console.log('19: sync end');
// SYNC #4 → last synchronous statement

// ============================================================
// EXECUTION MODEL
// ============================================================

// FIRST:
// Run ALL synchronous code
//
// 1: sync start
// 10: async start
// 13: promise executor
// 19: sync end
//
//
// THEN:
// Drain ALL microtasks
//
// Microtasks initially:
//
// M1 → 6: micro B1
// M2 → 11: after await
// M3 → 14: promise then
// M4 → 16: queueMicrotask
//
//
// M1 runs:
// 6: micro B1
// → creates 9: micro B3
// → creates timeout B
//
//
// M2 runs:
// 11: after await
// → await null
// → creates another microtask for 12
//
//
// M3 runs:
// 14: promise then
// → creates 15: nested microtask
//
//
// M4 runs:
// 16: queueMicrotask
// → creates 17: promise inside microtask
//
//
// Newly-created microtasks continue:
//
// 9: micro B3
// 12: after second await
// 15: nested microtask
// 17: promise inside microtask
//
//
// ONLY AFTER THE MICROtask QUEUE IS EMPTY:
//
// Run ONE macrotask:
//
// 2: timeout A
//
// This creates:
//
// 3: micro A1
// 5: micro A3
//
// Drain microtasks:
//
// 3: micro A1
// → creates 4: micro A2
//
// 5: micro A3
//
// 4: micro A2
//
//
// Then next macrotask:
//
// 7: timeout B
//
// It creates:
//
// 8: micro B2
//
// So immediately after timeout B:
//
// 8: micro B2
//
//
// Then:
//
// 18: timeout C
