

function outerFunc(outerVar) {
    return function innerFunc(innerVar) {
        return function centerFunc(centerVar) {
            console.log(`Outer: ${outerVar} , Inner: ${innerVar} , Center: ${centerVar}`)
        }
    }
}


const x = outerFunc("Hello");  //call "outerFunc" ans saved in "x"
const y = x("World");   // called "x" and saved in "y"
y("I am Center function.")  // called "y"