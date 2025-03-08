
//Iterator ============================================================
function createIterator(array) {
    let index = 0;
    return {
        next: function () {
            if (index < array.length) {
                return { value: array[index++], done: false };
            } else {
                return { value: undefined, done: true };
            }
        }
    };
}

const myArray = [1, 2, 3];
const myIterator = createIterator(myArray);

console.log(myIterator.next()); // { value: 1, done: false }
console.log(myIterator.next()); // { value: 2, done: false }
console.log(myIterator.next()); // { value: 3, done: false }
console.log(myIterator.next()); // { value: undefined, done: true }











//Generator============================================================

function* numGenerator() {
    yield 1;
    yield 2;
    yield 3;
    yield 4;
}

let gen = numGenerator();
let gen2 = numGenerator();

console.log(gen.next());       // {value: 1, done: false}
console.log(gen.next().value); //2
console.log(gen.next().value); //3
console.log(gen.next().value); //4
console.log(gen.next().value); //undefined
console.log(gen.next().value); //undefined


console.log(gen2.next().value); //1
console.log(gen2.next().value); //2






