# Main Questions and Ans

## Call, Apply, Bind → Difference + Polyfill implementation

- call, apply, and bind are used to explicitly control the this context of a function. One common use case is method borrowing — for example, we can borrow Array.prototype.map and use it on array-like objects using map.call(). We can also create our own reusable functions and invoke them with different contexts.

- The key difference is: call invokes the function immediately and accepts arguments individually, apply does the same but takes arguments as an array, and bind returns a new function with this permanently bound, which can be executed later.
