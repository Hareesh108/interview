const s = ["h","e","l","l","o"]

// IMP
const reverseString = function (s) {

    const size = s.length

    for (let i = 0; i < size / 2; i++) {
        let temp = s[size - 1 - i]
        s[size - 1 - i] = s[i]
        s[i] = temp
    }

    return s
};

console.log(reverseString(s));

const s1 = ["h","e","l","l","o"]
console.log(s1.toReversed());

