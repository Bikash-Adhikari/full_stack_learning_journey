
//================================================================================================
//------------Challenge 1-------------------------------------------------------------------------
//================================================================================================

// Task: Prototype Chaining
// Create a constructor function Animal that has a method speak() that return 'Animal speaking'.
// Then create another constructor Dog that inherits from Animal using prototypes.
//The Dog constructor should add a method bark() that returns 'Woof!'.Demonstrate the prototype chain between Dog and Animal.


//================================================================================================
//------------Using ES6 Classes-------------------------------------------------------------------
//================================================================================================

class Pet {
    speak() {
        return "Pet Sepaking!!!"
    };
};

class Cat extends Pet {
    mew() {
        return "Mewooooo!!!"
    };
}



// Demonstrate and test ------------------------------------------------------------
const myCat = new Cat();
console.log(myCat.speak()); // Inherited from Pet -> "Pet speaking"
console.log(myCat.mew());  // Defined in Cat -> "Mewoooo!!!"

// Verify prototype chain
console.log(myCat instanceof Cat);    // true
console.log(myCat instanceof Pet); // true
console.log(Object.getPrototypeOf(myCat) === Cat.prototype);        // true
console.log(Object.getPrototypeOf(Cat.prototype) === Pet.prototype); // true














//================================================================================================
//------------Challenge 2-------------------------------------------------------------------------
//================================================================================================

// Task 1: Create a Functional Constructor

// Create a functional constructor Person that takes name and age as parameters.Add a method greet() to the constructor that returns "Hello, my name is [name]".

// Task 2: Handle Errors

// Modify the Person constructor to throw an error if the age is not a positive number.





// Task 1: Using Class Declaration------------------------------------------------
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    };

    greet() {
        return `Hello, my name is ${this.name}`;
    };
}





// Task 2: Create Errors
class Person1 {
    constructor(name, age) {
        if (typeof age !== "number" || age <= 0) {
            throw new Error("Age must be a Positive Number!!!");
        };

        this.name = name;
        this.age = age;
    };

    greet() {
        return `Hello, my name is ${this.name} and I am ${this.age} years old.`;
    };
}



// Task 3: Handle Errors

try {
    const p1 = new Person1("Bikash Adhikari", -34);
    console.log(p1.greet())
} catch (err) {
    console.log(err)
};








// Creating Function Constructor-------------------------------------------------------

function Human(name, age) {
    if (age <= 0) {
        throw new Error('Age must be a positive number');
    }

    this.name = name;
    this.age = age;

    this.greet = function () {  // "this" is used only in function constructor 
        return `Hello, my name is ${this.name}`;
    };
}



try {
    const h1 = new Human("Nimisha Sapkota", -20);
    console.log(h1.greet())
} catch (err) {
    console.log(err)
};













//================================================================================================
//------------Challenge 3-------------------------------------------------------------------------
//================================================================================================

// Classes, Objects, and Inheritance

// Task 1: Class Inheritance----------------------------------------------------------------------------
// Create a class Vehicle with properties make and model, and a method getDetails() that returns a string "Make: [make], Model: [model]".Create a subclass Car that extends Vehicle and adds a method startEngine() that returns "Engine started".


//Task 2: Method Overriding in Inheritance---------------------------------------------------------------
// Extend the Vehicle class from the previous task to include a method move() that returns "The vehicle is moving".Then, override the move() method in the Car class to return "The car is driving".


//Task 3: Static Methods in Classes-----------------------------------------------------------------------
// Add a static method isVehicle(obj) to the Vehicle class that checks if a given object is an instance of Vehicle.The method should return true if the object is a Vehicle or a subclass of Vehicle, and false otherwise.


class Vehicle {
    constructor(make, model) {
        this.make = make;
        this.model = model;
    }

    getDetails() {
        return `Make: ${this.make}, Model: ${this.model}`;
    }

    move() {
        return "The vehicle is moving";
    }

    static isVehicle(obj) {
        return obj instanceof Vehicle;
    }
}




class Car extends Vehicle {
    startEngine() {
        return "Engine started";
    }

    move() {
        return "The car is driving";
    }

}



let c1 = new Car("hundai", 2018);
console.log(c1.getDetails())
console.log(c1.move())

const myCar = new Car("Toyota", "Corolla");
console.log(myCar.getDetails()); // Make: Toyota, Model: Corolla
console.log(myCar.startEngine()); // Engine started
console.log(myCar.move()); // The car is driving

console.log(Vehicle.isVehicle(myCar)); // true
console.log(Vehicle.isVehicle({})); // false















//================================================================================================
//------------Challenge 4-------------------------------------------------------------------------
//================================================================================================

// Encapsulation, Polymorphism, Abstraction, and Getters / Setters

// Task 1: Encapsulation Using Getters and Setters
// Create a class BankAccount with a private property _balance.Add methods deposit(amount) and withdraw(amount).Use getters and setters to access and modify the _balance while ensuring the balance never goes negative.


//Task 2: Polymorphism with Method Overriding
//Create a class Shape with a method area() that returns 0. Create two subclasses Circle and Rectangle that override the area() method to calculate the area of a circle and a rectangle, respectively.


// Task 1: Encapsulation Using Getters and Setters-----------------------------------------------------

class BankAccount {
    _balance;

    constructor(initialBalance = 0) {
        if (initialBalance < 0) {
            throw new Error("Initial balance cannot be negative.");
        }
        this._balance = initialBalance;
    }

    get balance() {
        return this._balance;
    }

    set balance(amount) {
        if (amount < 0) {
            throw new Error("Balance cannot be negative");
        }
        this._balance = amount;
    }

    deposit(amount) {
        if (amount <= 0) {
            throw new Error("Deposit amount must be greater than zero.");
        }
        this.balance = this.balance + amount; // Use setter
        console.log(`Deposited: $${amount}. New balance: $${this.balance}`);
    }

    withdraw(amount) {
        if (amount <= 0) {
            throw new Error("Withdraw amount must be greater than zero.");
        }
        if (amount > this.balance) {
            throw new Error("Insufficient funds");
        }
        this.balance = this.balance - amount; // Use setter
        console.log(`Withdrew: $${amount}. Remaining balance: $${this.balance}`);
    }
}

const myAccount = new BankAccount(100);
myAccount.deposit(50);
myAccount.withdraw(30);
console.log("Current Balance:", myAccount.balance);







// Task 2: Polymorphism with Method Overriding------------------------------------------------------------
class Shape {
    area() {
        return 0; // Default implementation
    }
}

class Circle extends Shape {
    constructor(radius) {
        super();
        this.radius = radius;
    }

    area() {
        return Math.PI * this.radius * this.radius;
    }
}

class Rectangle extends Shape {
    constructor(width, height) {
        super();
        this.width = width;
        this.height = height;
    }

    area() {
        return this.width * this.height;
    }
}

// Example usage
const circle = new Circle(5);
console.log("Circle Area:", circle.area()); // Circle Area: 78.53981633974483

const rectangle = new Rectangle(4, 6);
console.log("Rectangle Area:", rectangle.area()); // Rectangle Area: 24

