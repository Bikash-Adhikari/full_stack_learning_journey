
// Task 2: Create a Custom Iterator

// Create a custom iterator called rangeIterator(start, end) that returns an object that iterates over numbers from start to end.

// Each call to.next() should return the next number in the range until it reaches end.


function rangeIterator(start, end) {
    return {
        current: start,
        last: end,
        next() {
            if (this.current <= this.last) {
                return { value: this.current++, done: false };
            } else {
                return { done: true };
            }
        }
    };
}

// Example usage:
const iterator = rangeIterator(1, 5);
console.log(iterator.next()); // { value: 1, done: false }
console.log(iterator.next()); // { value: 2, done: false }
console.log(iterator.next()); // { value: 3, done: false }
console.log(iterator.next()); // { value: 4, done: false }
console.log(iterator.next()); // { value: 5, done: false }
console.log(iterator.next()); // { done: true }
