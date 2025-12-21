// for (var i = 0; i < 4; i++) {
//   ((g) => {
//     setTimeout(() => {
//       console.log(g);
//     }, 1000);
//   })(i);
// }

// console.log(i);


const callme = h1 => h2 => h3 => h1 + h2 + h3

const new1 = callme(2)(3)(1)
console.log(new1);
