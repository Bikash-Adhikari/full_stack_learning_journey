


const context2 = { multiplier: 2 };
const context3 = { multiplier: 3 };

function sum(a, b) {
    return (a + b) * this.multiplier;
};



// Using apply() to invoke sum() with different contexts
console.log(sum.apply(context2, [4, 6]));
console.log(sum.apply(context3, [8, 3]));