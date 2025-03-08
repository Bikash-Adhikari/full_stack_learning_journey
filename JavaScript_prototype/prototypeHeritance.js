//=============================================================================
// Using Function--------------------------------------------------------------
//=============================================================================

// Create a function 
function Person(name) {
    this.name = name;

}


// introducing prototype 
Person.prototype.greet = function () {
    console.log(`Hello, my name is ${this.name}.`);
}


let bikash = new Person("Mr. Bikash Adhikari");
bikash.greet();







//=============================================================================
// Using Class ----------------------------------------------------------------
//=============================================================================

class Person1 {
    constructor(name) {
        this.name = name;
    }

    greet() {
        console.log(`Hello Class, my name is ${this.name}`)
    }
}

let bks = new Person1("Mr. Bikash Adhikari");
bks.greet();