const testDeepCopy = {
  username: "Hareesh",
  age: 20,
  test: { id: "harsh", hey: 99 },
  test1: ["Hey"],
};

const testDeepCopy1 = structuredClone(testDeepCopy);

function deepClone(obj) {
  if (obj === null || typeof obj !== "object") return obj;

  const result = Array.isArray(obj) ? [] : {};

  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      result[key] = deepClone(obj[key]);
    }
  }

  return result;
}

const testDeepCopy2 = deepCopy(testDeepCopy);

testDeepCopy.username = "Prince";
testDeepCopy.test.id = "Hey";

console.log(testDeepCopy);
console.log(testDeepCopy1);
console.log(testDeepCopy2);
