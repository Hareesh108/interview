export const promise1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Resolved1");
  }, 2000);
});

export const promise2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject(new Error("API error"));
  }, 2000);
});

export const promise3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Resolved2");
  }, 3000);
});

export const promise4 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Resolved3");
  }, 3000);
});
