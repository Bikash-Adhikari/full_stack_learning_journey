
// Task 3: Timeout with Async / Await and Promise.race

// Create a function fetchWithTimeout(promise, timeout) that takes a promise and a timeout value in milliseconds.Use Promise.race() to return the result of the promise if it resolves within the timeout, otherwise return "Timeout exceeded".

function fetchWithTimeout(promise, timeout) {
    return Promise.race([
        promise,
        new Promise((_, reject) =>
            setTimeout(() => reject(new Error("Timeout exceeded")), timeout)
        )
    ]);
}

// Example usage:
const examplePromise = new Promise(resolve => setTimeout(() => resolve("Data received"), 2000));

fetchWithTimeout(examplePromise, 1000)
    .then(result => console.log(result))
    .catch(error => console.error(error.message));

fetchWithTimeout(examplePromise, 3000)
    .then(result => console.log(result))
    .catch(error => console.error(error.message));


