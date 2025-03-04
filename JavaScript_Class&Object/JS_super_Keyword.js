

class Human {              //Parent
    constructor(name) {
        this.name = name;
        this.species = "homo sapiens";

    }


    eat() {
        console.log("I must eat.");
    }

}



class Doct extends Human {     //Child
    constructor(name) {
        super(name); // to invoke parent class constructure
    }

    work() {
        super.eat();
        console.log("I should see the patients.");
    }
}


let doctor1 = new Doct("Prabesh Regmi");          //Object by Child







//============= Assignment 1============================ Assignment 1===============================
//==================================================================================================

class User {
    constructor(name, email) {
        this.name = name;
        this.email = email;
    }

    viewData() {
        console.log(`The website data is, Name = ${this.name} and email = ${this.email}.`);
    }
}


let user1 = new User("Bikash Adhikari", "bikash@gmail.com")
user1.viewData()
console.log(user1.name)
console.log(user1.country)




//============= Assignment 2============================ Assignment 2==================================
//=====================================================================================================

class Admin extends User {
    constructor(name, email, city) {
        super(name, email);
        this.city = city;
    }

    editData() {
        console.log(`The emial, ${this.email} of ${this.name} has been changed. And updated ${this.city}`)
    };

}


let admin1 = new Admin("Bhabish Luitel", "bhabish@gmail.com", "Kathmandu")
admin1.viewData();
admin1.editData();