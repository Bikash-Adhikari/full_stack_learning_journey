
// Task 3: Memoization Function

// Write a function memoize(fn) that returns a memoized version of fn.The memoized function should cache the results of function calls, and return the cached result if the same inputs are provided again.




function memoize(fn) {
    const cache = {};

    return function (...args) {
        const key = JSON.stringify(args); // Create a unique key for the arguments

        if (cache[key] !== undefined) {
            return cache[key]; // Return cached result if available
        } else {
            const result = fn(...args); // Call the original function
            cache[key] = result; // Store the result in the cache
            return result;
        }
    };
}

// Example usage:
function expensiveCalculation(a, b) {
    console.log("Calculating..."); // To see when the function is actually called
    return a + b;
}

const memoizedCalculation = memoize(expensiveCalculation);

console.log(memoizedCalculation(2, 3)); // Output: Calculating... 5
console.log(memoizedCalculation(2, 3)); // Output: 5 (cached)
console.log(memoizedCalculation(4, 5)); // Output: Calculating... 9
console.log(memoizedCalculation(4, 5)); // Output: 9 (cached)

function complexObjectCalculation(obj) {
    console.log("Calculating with object");
    return obj.a + obj.b;
}

const memoizedComplexObject = memoize(complexObjectCalculation);

console.log(memoizedComplexObject({ a: 1, b: 2 })); //calculating with object, 3
console.log(memoizedComplexObject({ a: 1, b: 2 })); //3 (cached)
console.log(memoizedComplexObject({ a: 2, b: 2 })); //calculating with object, 4
