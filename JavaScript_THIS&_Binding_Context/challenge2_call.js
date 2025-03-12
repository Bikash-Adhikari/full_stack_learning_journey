

// Task 2: Using call() to Invoke a Function with Different Contexts

// Write a function introduce() that uses the this keyword to introduce a person by name.Then, invoke introduce() using call() to introduce different people with the same function.



function introduce() {
    console.log(`Hi, my name is ${this.name}`);
}


//Creating different objects with a name property.
const person1 = { name: "Bikash Adhikari" };
const person2 = { name: "Kopila Adhikari" };


// Using call() to invoke introduce() with different contexts
introduce.call(person1);
introduce.call(person2);

