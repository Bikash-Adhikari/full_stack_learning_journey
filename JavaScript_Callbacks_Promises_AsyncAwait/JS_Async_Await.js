

// async function always returns a promise.
// await puases the execution of its surrounding async function until the promise is settled.

// async-await > promise chain > callback hell
// <------------------------------------------



// function api() {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             console.log("Wearther data");
//             resolve(200);
//         }, 2000);
//     });
// }

// async function getWeatherData() {
//     await api(); //1st and wait 2sec 
//     await api(); //2nd
// }








//-------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------

function getData(dataID) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("data =", dataID);
            resolve("Success");
        }, 2000);
    });
}


//Async-await [Where '.then' and '.catch' is not required] [async-await replaced the .then and .catch]
async function getAllData() {
    await getData(111);
    await getData(222);
    await getData(333);
    await getData(444);
    await getData(555);
    await getData(666);
};

getAllData();


