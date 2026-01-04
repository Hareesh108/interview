const sDuplicates = "Hareesh";

const removeDuplicates = (s) => {
  let result = "";
  let visited = {};

  for (let i = 0; i < s.length; i++) {
    if (!visited[s[i]]) {
      visited[s[i]] = true;
      result += s[i];
    }
  }

  console.log(result);

  result = "";
  let visited1;

  for (let item of s) {
    if (visited1 !== item) {
      visited1 = item;
      result += item;
    }
  }
  console.log(result);
};

removeDuplicates(sDuplicates);
