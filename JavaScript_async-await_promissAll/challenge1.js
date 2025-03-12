// Task 1: Async - Await with Promise.all

// Create two functions fetchUser() and fetchPosts(), both returning promises that resolve in 1 second.

// Use async - await and Promise.all to fetch both simultaneously and log the results as part of fetchAllData()



//Solution:

function fetchUser() {
    return new Promise(resolve => setTimeout(() => resolve('User data'), 1000));
}

function fetchPosts() {
    return new Promise(resolve => setTimeout(() => resolve('Posts data'), 1000));
}

async function fetchAllData() {
    const [user, posts] = await Promise.all([fetchUser(), fetchPosts()]);
    console.log(user);
    console.log(posts);
}

fetchAllData();

