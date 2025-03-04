
class CoffeeMachine {
    start() {
        return `Starting the machine...`
    }


    brewCoffee() {
        return `Brewing coffee....`
    }


    pressStartButton() {
        let msg1 = this.start();
        let msg2 = this.brewCoffee();
        return `${msg1} + ${msg2}`;
    }
}



let machine = new CoffeeMachine();
console.log(machine.pressStartButton());