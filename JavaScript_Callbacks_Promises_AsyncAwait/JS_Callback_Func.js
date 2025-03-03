//==================================================================================
//-------------------------------- Callback ------------------------------------
//===================================================================================




// A callback is a function passed as an argument to another function.

function sum(a, b) {
    console.log(a + b);
}

function calculator(a, b, sumCallback) {
    sumCallback(a, b);
}

calculator(5, 8, sum)






calculator(3, 5, (a, b) => {
    console.log(a + b);
})









//==================================================================================
//-------------------------------- Callback Hell------------------------------------
//===================================================================================

// Callback hell : Nested callbacks stacked below one another forming a pyramid structure. (Pyramid of DOOM)


// This Style of programming becomes difficult to understand & manage 


function getData(dataID) {
    //2s
    setTimeout(() => {
        console.log("data", dataID)
    }, 2000);
}

getData("569%lfoXSD")


// get below data simultaneously(at same the time)
getData(1)
getData(2)
getData(3)







// get below data one-after-another waiting 2sec

// data1 -----------get data1
// data2------------ get data2 after receiving data1
// data3------------get data3 after receiving data2

// [use callback function]---------------------->>>>>>>>>>>>>>>>>>>>>>>

function recvData(dataID, recvNextData) {
    //2s
    setTimeout(() => {
        console.log("data =", dataID);
        if (recvNextData) {
            recvNextData();
        }
    }, 2000)
}


//now call back =========>>> It is called "Callback Hell" "Nested Callback"
recvData(11111, () => {
    recvData(22222, () => {
        recvData(33333, () => {
            recvData(44444);
        });
    });
});


//Note: This challenge of "Callback Hell" can be replaced by "Promises"
// go to Promises file




