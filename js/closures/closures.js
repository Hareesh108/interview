function add(a) {
  return function (b) {
    return function (c) {
      return a + b + c;
    };
  };
}

add(2)(3)(4);

function add1(a) {
  return function (b) {
    return a + b;
  };
}

add1(2)(3);