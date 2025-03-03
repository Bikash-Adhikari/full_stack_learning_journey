

// Promise is for "eventual" completion of task. It is an object in JS.
// It is a solution to "Callback Hell".

//   *'resolve' & 'reject' are callbacks provided by JS.

//Study "JS_Callback_Func.js" file before exploring here..........

let promise1 = new Promise((resolve, reject) => {
    console.log("I am a promise1.");
    resolve("Success! Promise is resolved. Hurray!!!")
})
console.log(promise1)




let promise2 = new Promise((resolve, reject) => {
    console.log("I am a promise2.");
    reject("This promise is rejected vai. Sorry!!!")
})
console.log(promise2)





//====================================================================================
//------- Promises Creation------------------------------------------------------
//=====================================================================================
// A JavaScript Promise objec can be:
// 1. Pending: the result is unidentified
// 2. Resolve: the result is a value(fulfilled)  ----> resolve(result)
// 3. Rejected: the result is an error object    ----> reject(error)



function recvData(dataID, recvNextData) {
    return new Promise((resolve, reject) => {
        //2s
        setTimeout(() => {
            console.log("data =", dataID);
            resolve("Resolve vayo!!!")
            if (recvNextData) {
                recvNextData();
            }
        }, 5000)
    })
}

let result = recvData("123DKdk9485SG99")

// got to console and print "result" before and after printing data "123DKdk9485SG99"





//====================================================================================
//------- Promises Utilization--------------------------------------------------------
//=====================================================================================

// promise1.then(  (res)=>{}  )
// promise1.catch(  (err)=>{}  )

const getPromise1 = () => {  //-------------------------What-if promise resolved ?
    return new Promise((resolve, reject) => {
        console.log("I am a promise.");
        resolve("Promise success vayo");
    });

};

let promise3 = getPromise1();

promise3.then((result) => {
    console.log("The resolved promise has been utilized.(Fulfilled)", result)
});


//------------------------------------------------------------------------------------------------------
const getPromise2 = () => { //-----------------------What-if promise rejected?
    x = new Promise((resolve, reject) => {
        console.log("I am a promise.")
        reject("Promise rejected vayo!")
    });

    return x;
};

let promise4 = getPromise2();

promise4.catch((err) => {
    console.log(`"The rejected promise has been catched." rejected error is (${err})`);
});

//------------------------------------------------------------------------------------------------------







