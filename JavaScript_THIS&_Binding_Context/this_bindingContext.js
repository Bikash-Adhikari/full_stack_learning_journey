
// .bind


const person = {
    name: "Bikash Adhikari",
    greet() {
        console.log(`Hi I am ${this.name}`)
    }
}

person.greet();  //output: Hi I am Bikash Adhikari

// lets save this in new variable ==> then call [name will be lost]
const greetFunction = person.greet;
greetFunction(); //output : Hi I am


// now, lets bounding the context
const boundGreet = person.greet.bind({ name: "Mr. BIKASH ADHIKARI" });
boundGreet(); // output: Hi I am Mr. BIKASH ADHIKARI






// bind, call and apply --- study pdf notes


