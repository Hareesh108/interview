// infinite currying 
// Use case Accepts unlimited inputs, No arrays needed
// Used in ORMs, Query builders, Configuration APIs

function add(a) {
  return function (b) {
    if (b === undefined) return a;
    return add(a + b);
  };
}

console.log(add(1)(2)(3)(4)());

console.log(add(10)(20)(30)(40)(50)(60)());