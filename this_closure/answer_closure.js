function createCounterClosure() {
    // This is now a "private" variable due to the closure
    let count = 0;

    return {
        increment: function () {
            // 'increment' closes over the 'count' variable from its outer scope.
            count++;
        },
        getValue: function () {
            // 'getValue' closes over the 'count' variable from its outer scope.
            return count;
        }
    };
}

// --- Test Cases for Closure Solution ---
console.log("\n--- Testing createCounterClosure ---");
const counterX = createCounterClosure();
console.log("Initial value (counterX):", counterX.getValue()); // Expected: 0

counterX.increment();
counterX.increment();
console.log("Value after increments (counterX):", counterX.getValue()); // Expected: 2

// Test detachment:
const detachedIncX = counterX.increment;
const detachedGetValX = counterX.getValue;

detachedIncX(); // This works because 'increment' operates directly on 'count'
detachedIncX();
console.log("Value after detached increments (counterX):", detachedGetValX()); // Expected: 4

// Create another counter to show independence
const counterY = createCounterClosure();
counterY.increment();
console.log("Value for counterY:", counterY.getValue()); // Expected: 1
console.log("Value for counterX (still independent):", counterX.getValue()); // Expected: 4