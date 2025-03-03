//Synchronous--------[one, tow, three, four, ___, six, seven, eight,]
//Asynchronous--------[one, tow, three, four,_____, six, seven, eight, five]

console.log("one");
console.log("Two");
console.log("Three");
console.log("Fout");

setTimeout(() => {
    console.log("Five");  //after four second===> "Five" prints
}, 2000)

console.log("Six");
console.log("Seven");
console.log("Eight");
