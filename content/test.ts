// 1. Closure + Private State
function createCounter() {
    let count = 0;

    return {
        increment() {
            count++;
        },

        getCount() {
            return count;
        }
    };
}
const counter = createCounter();

counter.increment();
counter.increment();

console.log(counter.getCount()); // 2
console.log(counter.count);      // undefined

// 2. Function Factory
function makeMultiplier(x) {
    return function (y) {
        return x * y;
    };
}

const double = makeMultiplier(2);
const triple = makeMultiplier(3);

console.log(double(5)); // 10
console.log(triple(5)); // 15


// 3. Closure + Callback
function setupButton(message) {
    document.querySelector("button").addEventListener("click", () => {
        console.log(message);
    });
}
setupButton("Button clicked!");

// → Button clicked! when the button is clicked

// 4. var vs let in Loops
for (var i = 0; i < 3; i++) {
    setTimeout(() => console.log(i), 100);
}
// → 3
// → 3
// → 3

for (let i = 0; i < 3; i++) {
    setTimeout(() => console.log(i), 100);
}
// → 0
// → 1
// → 2