const res = (n) => {
  if (n) {
    return true;
  } else {
    return false;
  }
};

console.log(res(10));

const res1 = async (n) => {
  return await new Promise((res, rej) => {
    setTimeout(() => {
      res("true");
    }, 2000);

    setTimeout(() => {
      rej("false");
    }, 3000);
  });
};

await res1().then((v) => console.log(v));
