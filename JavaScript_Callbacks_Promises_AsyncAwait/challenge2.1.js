
// Task 1: Creating a Counter Using Closures

// Create a function createCounter() that returns a function which increments and returns a counter value each time it is called.



function createCounter() {
    let count = 0;

    return function () {
        count++;
        return count;
    };
}

// Example usage:
const counter1 = createCounter();
console.log(counter1()); // Output: 1
console.log(counter1()); // Output: 2
console.log(counter1()); // Output: 3

const counter2 = createCounter(); //another counter
console.log(counter2()); //output: 1
console.log(counter1()); //output: 4, counter1 is not impacted by counter2
