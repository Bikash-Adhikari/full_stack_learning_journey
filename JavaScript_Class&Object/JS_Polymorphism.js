class Bird {
    fly() {
        return `Flying.....`;
    }
}

class Penguin extends Bird {
    fly() {
        return `Penguins cant fly.`;
    }
}

let bird = new Bird()
let penguin = new Penguin()


//Polymorphism ===> "fly-Method" has multiple form
console.log(bird.fly());
console.log(penguin.fly());







//===========================================================================================================
//----Static Method---------------------------------------------------------------
//===========================================================================================================

class Calculator {
    static add(a, b) {    // 'Static Method' only be called 'class' itself.
        return a + b;
    }
}


// let myCalc = new Calculator()
// console.log(myCalc.add(9, 5));

console.log(Calculator.add(6, 4)); // it does not requred object-creation and can be called Directly







//===========================================================================================================
//----Getter and Setters---------------------------------------------------------------
//===========================================================================================================

class Employee {
    #salary; //made this property private which is not accessible outside the class

    constructor(name, salary) {
        if (salary < 0) {
            throw new Error("Salary can not be negative...")
        }

        this.name = name;
        this.#salary = salary;
    }



    get salary() {   //Getter
        return this.#salary;
    }



    set salary(amount) {  //Setter
        if (amount < 0) {
            console.error("Invalid Salary!!!");
        } else {
            this.#salary = amount;
        }

    }
}




let newStaff = new Employee("Bikash", 100000)
console.log(newStaff.salary)
// console.log(newStaff.#salary)----Since #salary is a class attribute, it cant be accessed outside the class.

