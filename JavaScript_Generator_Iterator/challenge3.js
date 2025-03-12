

// Task 3: Generator Function for Fibonacci Sequence

// Create a generator function fibonacciGenerator() that yields numbers from the Fibonacci sequence indefinitely(1, 1, 2, 3, 5, 8, etc.).

// Use the next() method to get the next Fibonacci number.


function* fibonacciGenerator() {
    let a = 1, b = 1;
    yield a;
    yield b;
    while (true) {
        let next = a + b;
        yield next;
        a = b;
        b = next;
    }
}

// Example usage:
const fib = fibonacciGenerator();
console.log(fib.next().value); // 1
console.log(fib.next().value); // 1
console.log(fib.next().value); // 2
console.log(fib.next().value); // 3
console.log(fib.next().value); // 5
console.log(fib.next().value); // 8
