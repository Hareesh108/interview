const promise1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Resolved1");
  }, 2000);
});

const promise2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject("Reject");
  }, 2000);
});

const promise3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Resolved2");
  }, 3000);
});

const promise4 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Resolved3");
  }, 3000);
});

Promise.all([promise1, promise2, promise3, promise4])
  .then((res) => {
    console.log(res);
  })
  .catch((error) => {
    console.log("Error:", error);
  });

const fetchAll = async () => {
  try {
    const res = await Promise.all([promise1, promise3, promise4]);
    console.log(res);
  } catch (e) {
    console.log("Error:", e);
  }
};

fetchAll();
