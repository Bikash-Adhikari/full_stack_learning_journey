
// Task 2: Rate Limiter Function

// Create a function rateLimiter(fn, limit) that returns a new function.The returned function allows calling fn only once within a limit time in milliseconds.If it is called again before the limit is reached, it should return "Rate limit exceeded".




function rateLimiter(fn, limit) {
    let lastCalled = 0;

    return function (...args) {
        const now = Date.now();

        if (now - lastCalled >= limit || lastCalled === 0) {
            lastCalled = now;
            return fn(...args);
        } else {
            return "Rate limit exceeded";
        }
    };
}

// Example usage:
function myFunc(message) {
    return `Function called with: ${message}`;
}

const limitedFunc = rateLimiter(myFunc, 1000); // Limit to 1 call per second

console.log(limitedFunc("First call")); // Output: "Function called with: First call"
console.log(limitedFunc("Second call (too soon)")); // Output: "Rate limit exceeded"

setTimeout(() => {
    console.log(limitedFunc("Third call (after 1 second)")); // Output: "Function called with: Third call (after 1 second)"
}, 1100);

console.log(limitedFunc("Fourth Call (too soon)")); //Output: Rate limit exceeded
