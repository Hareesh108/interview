import { promise1, promise2, promise3, promise4 } from "./promises.js";

Promise.race([promise2, promise1, promise3, promise4])
  .then((res) => {
    console.log("hey");

    console.log(res);
  })
  .catch((error) => {
    console.log("Error:", error);
  });

const fetchRace = async () => {
  try {
    const res = await Promise.race([promise2, promise3, promise4]);

    console.log(res);
  } catch (e) {
    console.log("hmm");
    console.log("Error:", e);
  }
};

fetchRace();
