const mainOuter = (n) => {
  const age = 16;

  return (m) => {
    console.log(n + m);
  };
};

const res = mainOuter(20);
const res1 = mainOuter(30);

res(5);
res1(10);
console.log(res1.age);

// function setupButton(message) {
//   document.querySelector('button').addEventListener('click', () => {
//     console.log(message);
//   });
// }

setupButton('Button clicked!');

// function setFunction(m) {
//   document.querySelector('button').addEventListener('click', () => {
//     console.log(m);
//   });
// }

// setFunction('Clicked');
