function createCounterBind() {
    const counterObject = {
        value: 0,
        increment: function () {
            // 'this' here refers to 'counterObject' when called via bind()
            this.value++;
        },
        getValue: function () {
            // 'this' here refers to 'counterObject' when called via bind()
            return this.value;
        }
    };

    // Explicitly bind 'this' for both methods to the counterObject itself.
    // This creates *new* functions that will always have 'counterObject' as their 'this'.
    return {
        increment: counterObject.increment.bind(counterObject),
        getValue: counterObject.getValue.bind(counterObject)
    };
}

// --- Test Cases for Bind Solution ---
console.log("--- Testing createCounterBind ---");
const counterA = createCounterBind();
console.log("Initial value (counterA):", counterA.getValue()); // Expected: 0

counterA.increment();
counterA.increment();
console.log("Value after increments (counterA):", counterA.getValue()); // Expected: 2

// Test detachment:
const detachedIncA = counterA.increment;
const detachedGetValA = counterA.getValue;

detachedIncA();
detachedIncA();
console.log("Value after detached increments (counterA):", detachedGetValA()); // Expected: 4

// Create another counter to show independence
const counterB = createCounterBind();
counterB.increment();
console.log("Value for counterB:", counterB.getValue()); // Expected: 1
console.log("Value for counterA (still independent):", counterA.getValue()); // Expected: 4\

/**
 * Why this works: When counterObject.increment.bind(counterObject) is called, it returns a new function.
 * This new function's this context is permanently fixed to counterObject. 
 * So, no matter how or where counterA.increment (which is this new bound function) is called,
 * its this will always refer to counterObject, allowing it to correctly access counterObject.value.
 */
