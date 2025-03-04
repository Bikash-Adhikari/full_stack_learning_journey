

const student = {
    fullName: "Bikash Adhikari",
    marks: 98.4,
    printMarks: function () {
        console.log(`Marks = ${this.marks}, Name = ${this.fullName}`)
    }
}

student.printMarks()
console.log(student.fullName)














//------------------------setting prototype-------------------------------------------
//------------------------------------------------------------------------------------
const employee = {
    calTax() {
        console.log("Tax is 10%.")
    },

};



const pinnacleTeacher1 = {
    salary: 90000,
}

const pinnacleTeacher2 = {
    salary: 80000,
    calTax() {
        console.log("Tax is 50%")
    },
};

pinnacleTeacher1.__proto__ = employee; // new prototype of bikashIncome is ===>> employee
pinnacleTeacher2.__proto__ = employee;



pinnacleTeacher1.calTax();
pinnacleTeacher2.calTax();

