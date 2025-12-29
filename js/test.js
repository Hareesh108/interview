const arr = [1, 2, 3, 2, 4, 1];

const visited = {}
let unique = []

for (let i = 0; i < arr.length; i++) {
  if(!visited[arr[i]]){
    visited[arr[i]] =true
    unique.push(i)
  }
}

console.log(unique);
