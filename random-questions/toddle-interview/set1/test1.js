// Predict the output

var a = 5;
var b = a;

b++;

let obj1 = { name: "Jerry created it" };
let obj2 = obj1;

obj2.name = "Tom created it";
console.log(obj1 === obj2);

// Predict the output

let x= {};
let y = {name:"Java"};
let z = {name:"Javascript"};

x[y] = {name:"Python"};
x[z] = {name:"C"};


// What is the output of the following code? Are they both same?

const map1 = new Map([
  ["firstname" ,"sumit"],
  ["lastname", "ghosh"],
  ["website", "geeksforgeeks"]
]);

for (const key of map1.keys()) {
  console.log(key);
}

const object1 = {
  "firstName":"sumit",
  "lastName":"ghosh",
  "website":"geeksforgeeks"
};

for (const key of Object.keys(object1)) {
  console.log(key);
}

// What's the output? Explain the solution and how to fix it

for(var i = 1; i <=5; i++){
        setTimeout((function(){
                console.log(i);
        }), 10)
}


let users = [
  {
    id: 1,
    items: [{ id: "1", name: "Item 1" }]
  },
  {
    id: 2,
    items: []
  },
  {
    id: 3,
    items: [
      { id: "4", name: "Item 4" },
      { id: "5", name: "Item 5" }
    ]
  },
  {
    id: 4,
  }
];

//Output - Remove those users who has empty items

let output = [
  {
    id: 1,
    items: [{ id: "1", name: "Item 1" }]
  },

  {
    id: 3,
    items: [
      { id: "4", name: "Item 4" },
      { id: "5", name: "Item 5" }
    ]
  }
];


// Guess what gets printed in console?
typeof(NaN)

typeof(null)

typeof(undefined)

null == undefined

null || undefined

undefined || null

if([]){
  // console.log("Will I get printed?-1");
}

if("0"){
  // console.log("Will I get printed?-2");
}

if([]==false){
	  // console.log("Will I get printed?-3");
}

if(false == "false"){
	// console.log("Will I get printed?-4");
}

// Predict the output

const testObj = {
  foo: console.log,
  bar: function () {
    return this;
  },
  baz: () => this === window,
  self: this
};

testObj.foo("foo  → ",this); 
console.log("bar  → ",testObj.bar()); 
console.log("baz  → ",testObj.baz());
console.log("self → ",testObj.self);