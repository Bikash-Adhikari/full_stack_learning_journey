
//==================================================================================
//-------------------------------- Callback + Promise-------------------------------
//===================================================================================

function recvData(dataID) {
    return new Promise((resolve, reject) => {
        //2s
        setTimeout(() => {
            console.log("data =", dataID);
            resolve("Resolve vayo!!!")
        }, 3000)
    })
}



// Promise Chain (replaced to callback hell)---------simpler way
// recvData(11111).then((res) => {
//     console.log(res);
//     recvData(22222).then((res) => {
//         console.log(res);
//         recvData(33333).then((res) => {
//             console.log(res);

//         });
//     });
// });



// Promise Chain (replaced to callback hell)--------Even more-simpler and efficient way

recvData(44444)
    .then((res) => {
        return recvData(55555);
    })
    .then((res) => {
        return recvData(66666);
    })
    .then((res) => {
        console.log(res)
    })



// To make even simpler than above(promise chain)======>> go to Async-Await file. And solve this problem even more simpler.