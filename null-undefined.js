/**
 * Write a function that takes a value and returns "null" if the value is null, "undefined" 
 * if the value is undefined, and "other" otherwise. You should use strict equality checks.
 */

function checkValueType(value) {
    if (value === undefined) {
        return undefined;
    } else if (value == null) {
        return null
    }
    return 'other';
}


// Test cases:
console.log(checkValueType(null));         // Expected: "null"
console.log(checkValueType(undefined));    // Expected: "undefined"
let x;
console.log(checkValueType(x));            // Expected: "undefined"
console.log(checkValueType(123));          // Expected: "other"
console.log(checkValueType("hello"));      // Expected: "other"
console.log(checkValueType({}));           // Expected: "other"
console.log(checkValueType([]));           // Expected: "other"
console.log(checkValueType(0));            // Expected: "other"
console.log(checkValueType(''));           // Expected: "other"
console.log(checkValueType(false));        // Expected: "other"