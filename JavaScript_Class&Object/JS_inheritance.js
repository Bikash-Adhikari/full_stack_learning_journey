
//Creating a Parent "Class"

class Father {
    hello() {
        console.log("hello man !!!");
    }
}

class Son extends Father {

}



//Creating a object with "Child" and accessing the parent property
let obj = new Son();
obj.hello()




//===================================================================================
//====================================================================================

class Person {              //Parent
    constructor() {
        this.species = "homo sapiens";
    }


    eat() {
        console.log("I can eat.");
    }

    sleep() {
        console.log("I must sleep.");
    }
}

class Doctor extends Person {     //Child
    work() {
        console.log("I should see the patients.");
    }

    sleep() {
        console.log("I must sleep in the Morning.")
    }
}


let docVanja = new Doctor();          //Object by Child
docVanja.work();
docVanja.eat();
docVanja.sleep();






