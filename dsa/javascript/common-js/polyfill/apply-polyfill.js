const object = {
  name: "Hareesh",
};

function greet(a, b) {
  console.log(`${this.name}, Hi How ${a} ${b}.`);
}
Function.prototype.myApply = function (context, arg = []) {
  context = context || globalThis;

  if (typeof this !== "function") {
    throw new TypeError("No valid function");
  }

  if (!Array.isArray(arg)) {
    throw new TypeError("CreateListFromArrayLike called on non-object");
  }

  context.fn = this;
  context.fn(...arg);
};

greet.apply(object, ["are", "you"]);
greet.myApply(object, ["are", "you"]);

try {
  greet.myApply(object, "are", "you");
} catch (e) {
  console.log(e);
}
