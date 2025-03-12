
// Task 1: Creating a Simple Generator

// Create a generator function numberGenerator() that yields numbers from 1 to 3.

function* numberGenerator() {
    yield 1;
    yield 2;
    yield 3;
}

// Example usage
const gen = numberGenerator();

console.log(gen.next().value); // 1
console.log(gen.next().value); // 2
console.log(gen.next().value); // 3
console.log(gen.next().done);  // true (no more values)
