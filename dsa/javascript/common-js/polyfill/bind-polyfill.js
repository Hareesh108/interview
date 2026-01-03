const object = {
  name: "Hareesh",
};

function greet(a, b) {
  console.log(`${this.name}, Hi How ${a} ${b}.`);
}

Function.prototype.testBindPolyfill = function (context, ...arg1) {
  let objFun = this;

  return function (...arg2) {
    return objFun.apply(context, [...arg1, ...arg2]);
  };
};


const res = greet.testBindPolyfill(object, "are", "you");
res()