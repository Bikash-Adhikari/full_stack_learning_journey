

// Task 2: Error Handling in Async / Await with Promise.all

// Write two functions fetchSuccess() and fetchFailure(), where fetchSuccess() returns a promise that resolves successfully after 1 second, and fetchFailure() returns a promise that rejects with an error after 1 second.

// Create a function handlePromises() that calls both functions using Promise.all and handles success and failure cases.

function fetchSuccess() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Success: Data fetched successfully");
        }, 1000);
    });
}

function fetchFailure() {
    return new Promise((_, reject) => {
        setTimeout(() => {
            reject(new Error("Failure: Data fetch failed"));
        }, 1000);
    });
}

async function handlePromises() {
    try {
        const results = await Promise.all([fetchSuccess(), fetchFailure()]);
        console.log("All promises resolved:", results);
    } catch (error) {
        console.error("One or more promises failed:", error.message);
    }
}

handlePromises();

