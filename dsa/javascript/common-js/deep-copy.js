const original = { name: "Hareesh", skills: { js: true } };

const deepCopy = structuredClone(original);

deepCopy.skills.js = false;

console.log(original.skills.js);
