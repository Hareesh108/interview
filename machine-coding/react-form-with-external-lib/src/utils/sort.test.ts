import { sortMe } from "./sort";

test("Check the first number", () => {
  const res = sortMe();
  expect(res).toEqual([1, 4, 6, 23, 99, 234]);
});
