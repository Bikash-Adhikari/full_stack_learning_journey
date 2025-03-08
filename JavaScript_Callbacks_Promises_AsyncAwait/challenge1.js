
// Task 1: Simulating Asynchronous Behavior

// Create a function simulateAsyncTask() that logs “Task started”, then after 2 seconds logs “Task finished”.

// Use setTimeout to simulate this behaviour.



function simulateAsyncTask() {
    console.log("Task Started")

    setTimeout(() => {
        console.log("Task finished")
    }, 3000);
}

simulateAsyncTask();








// Task 2: Simulate Multiple Async Tasks with Different Delays

// Create a function simulateMultipleTasks() that starts three asynchronous tasks with different delays(1 second, 2 seconds, and 3 seconds).

// Each task should log "Task [n] finished" where[n] is the task number.Ensure the tasks run asynchronously.




async function simulateMultipleTasks() {
    const task1 = new Promise((resolve) => {
        setTimeout(() => {
            console.log("Task 1 finished")
            resolve();
        }, 1000);
    });


    const task2 = new Promise((resolve) => {
        setTimeout(() => {
            console.log("Task 2 finished")
            resolve();
        }, 2000);
    });


    const task3 = new Promise((resolve) => {
        setTimeout(() => {
            console.log("Task 3 finished")
            resolve();
        }, 3000);
    });


    // Start all tasks concurrently
    await Promise.all([task1, task2, task3])

}


simulateMultipleTasks();








// Task 3: Async Task with Callback Function

// Create a function fetchDataWithCallback(callback) that simulates fetching data asynchronously using setTimeout (after 2 seconds).

// Once the data is “fetched”, it should invoke the provided callback function with "Fetched data" as an argument.



function fetchDataWithCallback(callback) {
    setTimeout(() => {
        const data = "Fetched data";
        callback(data);
    }, 2000);

};

//Example usage
function processData(data) {
    console.log("Data received:", data);
};


console.log("Fetching data...");
fetchDataWithCallback(processData);
console.log("Fetch initiated")
