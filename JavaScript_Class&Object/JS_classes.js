
// Creating a "Class" -----------------------------------------------------------

class ToyotaCar {
    start() {
        console.log("Started.");
    }

    stop() {
        console.log("Stopped");
    }

    setBrand(brand) {
        this.brandName = brand;
    }
}


//Creating an "Object" with the "Class" -------------------------

let fortuner = new ToyotaCar();
fortuner.setBrand("Texas");







//---------Constructor------------------------------------------------------------
//=================================================================================

//               Constructor()



class HundaiCar {
    constructor(brand, milage) {
        this.brand = brand;
        this.milage = milage;
    }

    start() {
        console.log("Started.");
    }

    stop() {
        console.log("Stopped");
    }

}


//Creating an "Object" with the "Class" -------------------------

let myCar = new HundaiCar("i20", 150);
console.log(myCar);