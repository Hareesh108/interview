//Predict the output

let k;
let j = {...k};
let l = [...k];
// console.log(j);
// {}
// console.log(l);

let array = new Array(10);
let count = 0;

array.forEach(()=>{
  count++;
});

// console.log(count);

//Predict the output

const number = 100;
const string = "John";
let obj1 = {
  value: "a"
};
let obj2 = {
  value: "b"
};

function change(number, string, obj1, obj2) {
  number = number * 10;
  string = "Pete";
  obj1 = obj2;
  obj2.value = "c";
}

change(number, string, obj1, obj2);


// console.log(number);
// console.log(string);
// console.log(obj1.value);
// console.log(obj2.value);


function scopeTest() {
	
	for (var i = 0; i <= 5; i++)
	{
	  var inFor = i; 
	}
	
	alert(inFor);  // what happens here?
}
// call the function defined above
scopeTest();
console.log(inFor);  //what happens here?


//Predict the output

function fail() {
  try {
    console.log("try 1");
    throw new Error("Throw");
    console.log("try 2");
  } catch (e) {
    console.log("catch", e);
  } finally {
    console.log("finally");
    return "finally";
  }
  console.log("hurray");
}

fail();


//Predict the output

function runFunc(){
  console.log("1" + 1);

  console.log(("1" + 1)/2);

  console.log([1,2] == "1,2");

  console.log("A" - 1);

  console.log(2 + "-2" + "2");

  console.log("Hello" - "World" + 78);

  console.log("Hello"+ "78");
}
runFunc();



console.log("Start");

setTimeout(function() {
  console.log("Timeout");
}, 0);

Promise.resolve().then(function() {
  console.log("Promise");
});

console.log("End");


let users = [
  {
    id:1,
    items:[{id:"1",name:"Item 1"},{id:"2",name:"Item 2"}]
  },
  {
    id:2,
    items:[{id:"2",name:"Item 2"},{id:"3",name:"Item 3"}]
  },
  {
    id:3,
    items:[{id:"4",name:"Item 4"},{id:"5",name:"Item 5"},{id:"3",name:"Item 3"}]
  }
]


//Output - Merge all items in the single list. List should be a unique by id

let output = [
  {id:"1",name:"Item 1"},
  {id:"2",name:"Item 2"},
  {id:"3",name:"Item 3"},
  {id:"4",name:"Item 4"},
  {id:"5",name:"Item 5"}
]




