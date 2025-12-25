function square(n) {
  for (let i = 0; i < n; i++) {
    let row = "";
    for (let j = 0; j < n; j++) {
      row += "*";
    }
    console.log(row);
  }
}
square(5);

console.log();

function rightTriangle(n) {
  for (let i = 1; i <= n; i++) {
    console.log("*".repeat(i));
  }
}
rightTriangle(5);

console.log();

function invertedTriangle(n) {
  for (let i = n; i >= 1; i--) {
    console.log("*".repeat(i));
  }
}
invertedTriangle(5);

console.log();

function rightAligned(n) {
  for (let i = 1; i <= n; i++) {
    console.log("-".repeat(n - i) + "*".repeat(i));
  }
}
rightAligned(5);

console.log();

function pyramid(n) {
  for (let i = 1; i <= n; i++) {
    console.log(" ".repeat(n - i) + "*".repeat(2 * i - 1));
  }
}
pyramid(5);


function invertedPyramid(n) {
  for (let i = 1; i <= n; i++) {
    console.log(" ".repeat(i - 1) + "*".repeat(2 * (n - i) + 1));
  }
}
invertedPyramid(5);


console.log();

function diamond(n) {
  pyramid(n);
  invertedPyramid(n - 1);
}
diamond(5);


console.log();

function leftTriangle(n) {
  for (let i = 1; i <= n; i++) {
    console.log("*".repeat(i));
  }
  for (let i = n - 1; i >= 1; i--) {
    console.log("*".repeat(i));
  }
}
leftTriangle(5);

console.log();

function hollowSquare(n) {
  for (let i = 1; i <= n; i++) {
    if (i === 1 || i === n) {
      console.log("*".repeat(n));
    } else {
      console.log("*" + " ".repeat(n - 2) + "*");
    }
  }
}
hollowSquare(5);


console.log();

function numberPyramid(n) {
  for (let i = 1; i <= n; i++) {
    let inc = "";
    let dec = "";

    for (let j = 1; j <= i; j++) inc += j;
    for (let j = i - 1; j >= 1; j--) dec += j;

    console.log(" ".repeat(n - i) + inc + dec);
  }
}
numberPyramid(5);




