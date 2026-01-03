const testShallowCopyObj = {
  username: "Hareesh",
  age: 20,
  test: { id: "harsh", hey: 99 },
};

const testShallowCopyObj1 = { ...testShallowCopyObj };

testShallowCopyObj1.username = "Prince"
testShallowCopyObj1.test.id = "Name"

console.log(testShallowCopyObj);
console.log(testShallowCopyObj1);

