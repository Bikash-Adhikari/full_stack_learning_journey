
// Task 1: Bind the Correct Context

// Create an object person with properties name and a method introduce().Use the bind() method to ensure the method works correctly when passed to another function.



const person = {
    name: "Bikash Adhikari",
    introduce() {
        console.log(`My name is ${this.name}`);
    }
}



// Binding the "introduce" method to the "person" object
const boundIntroduce = person.introduce.bind(person);



boundIntroduce();



// Passing the method to another function
function greet(callback) {
    return callback();
}


// Call the function with the bound method
greet(boundIntroduce);