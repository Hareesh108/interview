const testDeep = { name: "Harsh", a: { b: "dh" }, c: ["Hello"] };

const deepCopy = (obj) => {
  if (obj === null || typeof obj !== "object") return obj;

  const copy = Array.isArray(obj) ? [] : {};

  for (let key in obj) {
    copy[key] = deepCopy(obj[key]);
    console.log(key);
    console.log(obj[key]);
    console.log(copy);
    console.log("------------");
  }

  return copy;
};

const test2 = deepCopy(testDeep);

console.log(test2);
