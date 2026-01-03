const object = {
  name: "Hareesh",
};

function greet(a, b) {
  console.log(`${this.name}, Hi How ${a} ${b}.`);
}
Function.prototype.myCall = function (context, ...arg) {
  context = context || globalThis;

  if (typeof this !== "function") {
    throw new TypeError("No valid function");
  }

  context.fn = this;
  context.fn(...arg);
};

Function.prototype.myCall1 = function (context, ...args) {
  context = context || globalThis;

  const uniqueKey = Symbol();
  context[uniqueKey] = this;

  const result = context[uniqueKey](...args);
  delete context[uniqueKey];

  return result;
};

greet.myCall(object, "are", "you");
greet.myCall1(object, "are", "you");
greet.call(object, "are", "you");
