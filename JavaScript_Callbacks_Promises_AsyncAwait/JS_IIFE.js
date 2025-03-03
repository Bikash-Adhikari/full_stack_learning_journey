

// IIFE: Immediately Invoked Function Expression
// IIFE is a function that is called immediately as soon as it is defined.

function getData(dataID) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("data =", dataID);
            resolve("Success");
        }, 2000);
    });
}


//IIFE -one time used function---> [function varuable removed, all block enclosed with(), added () at the end]
(async function () {
    await getData(111);
    await getData(222);
    await getData(333);
    await getData(444);
    await getData(555);
    await getData(666);
})();

