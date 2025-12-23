import { promise1, promise2, promise3, promise4 } from "./promises.js";

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
