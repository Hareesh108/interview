// infinite currying 
// Use case Accepts unlimited inputs, No arrays needed
// Used in ORMs, Query builders, Configuration APIs
function add(a) {
  return function (b) {
    if (b === undefined) return a;
    return add(a + b);
  };
}

add(1)(2)(3)(4)();
