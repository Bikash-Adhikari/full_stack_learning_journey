

//====================================================================================
//------- Promises Chain -------------------------------------------------------------
//=====================================================================================

// function asyncFunc1() {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             console.log("Some data1");
//             resolve("Promise Success!!!");
//         }, 4000);
//     });
// };


// console.log("Fetching data 1..................")

// let p1 = asyncFunc1();

// p1.then((res) => {
//     console.log(res)
// });


//-------------------- Fetch-Data1 and  Fetch-Data2 happening Simultaneously-----------------------------


// function asyncFunc2() {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             console.log("Some data2");
//             resolve("Promise Success!!!");
//         }, 4000);
//     });
// };


// console.log("Fetching data 2..................")

// let p2 = asyncFunc2();

// p2.then((res) => {
//     console.log(res)
// });









//--------------We Want----- [Complete Fetch-Data1] then [Proceed Fetch-Data2] ------------------------------

// function asyncFunc1() {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             console.log("Some data1");
//             resolve("Promise Success!!!");
//         }, 4000);
//     });
// };




// function asyncFunc2() {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             console.log("Some data2");
//             resolve("Promise Success!!!");
//         }, 4000);
//     });
// };




// console.log("Fetching data1...................");

// let p1 = asyncFunc1();
// p1.then((res) => {
//     console.log("Fetching data2....................");
//     let p2 = asyncFunc2();
//     p2.then((res) => {

//     });
// });









//---{Simpler Way}--We Want----- [Complete Fetch-Data1] then [Proceed Fetch-Data2] --------------------------

function asyncFunc1() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("Some data1");
            resolve("Promise Success!!!");
        }, 4000);
    });
};




function asyncFunc2() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("Some data2");
            resolve("Promise Success!!!");
        }, 4000);
    });
};




console.log("Fetching data1...................");

asyncFunc1().then((res) => {
    console.log("Fetching data2....................");
    asyncFunc2().then((res) => {

    });
});
