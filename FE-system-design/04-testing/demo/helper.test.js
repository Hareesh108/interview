test("sortMe function", () => {
  const { sortMe } = require("./helper");
  const sorted = sortMe();

//   expect(sorted).toEqual([
//     { name: "Keshav", age: 16 },
//     { name: "Harsh", age: 20 },
//     { name: "John", age: 25 },
//     { name: "Rahul", age: 28 },
//     { name: "Jane", age: 30 },
//   ]);

//   expect(sorted[0]).not.toEqual(30);
  expect(sorted[1]).toEqual(20);
});
