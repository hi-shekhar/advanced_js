/** A higher order function is a function that takes one or more functions as arguments, or returns a function as its result. */

Array.prototype.myMap = function (callback) {
    const result = [];
    for (let i = 0; i < this.length; i++) {
        result.push(callback(this[i], i, this));
    }
    return result;
};

Array.prototype.myFilter = function (callback) {
    const result = [];
    for (let i = 0; i < this.length; i++) {
        if (callback(this[i], i, this)) {
            result.push(this[i]);
        }
    }
    return result;
}

Array.prototype.myReduce = function (callback, initialValue) {
    let accumulator = initialValue !== undefined ? initialValue : this[0];
    let startIndex = initialValue !== undefined ? 0 : 1;

    for(let i= startIndex; i < this.length; i++) {
        accumulator = callback(accumulator, this[i], i , this);
    }

    return accumulator;
}

const arr = [1, 2, 3, 4, 5];
const myMap = arr.myMap((num) => (num) * 2);
const myFilter = arr.myFilter((num) => num % 2 === 0);
const myReduce  = arr.myReduce((acc, cv) => acc + cv, 0);
console.log(myMap);
console.log(myFilter);
console.log(myReduce);