import { promise1, promise2, promise3, promise4 } from "./promises.js";

Promise.any([promise2, promise1, promise3, promise4])
  .then((res) => {
    console.log(res);
  })
  .catch((error) => {
    console.log("Error:", error);
  });

const fetchAny = async () => {
  try {
    const res = await Promise.any([promise1, promise3, promise4]);
    console.log(res);
  } catch (e) {
    console.log("Error:", e);
  }
};

fetchAny();
