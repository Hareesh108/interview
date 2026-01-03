const testCurrying = (a) => {
  return (b) => {
    if (!b) return a;

    return testCurrying(a + b);
  };
};

const res = testCurrying(10)(20)();

console.log(res);
