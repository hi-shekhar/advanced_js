/**
 * A custom Promise implementation.
 */
class MyPromise {
    /**
     * Promise states:
     * - PENDING: Initial state, neither fulfilled nor rejected.
     * - FULFILLED: Operation completed successfully.
     * - REJECTED: Operation failed.
     */
    static #STATE = {
        PENDING: 'PENDING',
        FULFILLED: 'FULFILLED',
        REJECTED: 'REJECTED'
    };

    /**
     * Returns the current Promise state.
     * @returns {object} The current Promise state object.
     */
    get promiseState() {
        return MyPromise.#STATE;
    }

    /**
     * Current state of the promise (initially pending).
     * @type {string}
     */
    state = MyPromise.#STATE.PENDING;

    /**
     * Value resolved with the promise.
     * @type {*}
     */
    resolvedValue = undefined;

    /**
     * Reason for promise rejection.
     * @type {*}
     */
    rejectedReason = undefined;

    /**
     * Array of callbacks to be executed when the promise is fulfilled.
     * @type {Array<function>}
     */
    onFulfilledCallbacks = [];

    /**
     * Array of callbacks to be executed when the promise is rejected.
     * @type {Array<function>}
     */
    onRejectedCallbacks = [];

    /**
     * Checks if a value is a function.
     * @param {*} value The value to check.
     * @returns {boolean} True if the value is a function, false otherwise.
     */
    isFunction = (value) => typeof value === 'function';

    /**
     * Constructs a new MyPromise.
     * @param {function} executor The executor function that takes resolve and reject callbacks.
     * @throws {TypeError} If the executor is not a function.
     */
    constructor(executor) {
        if (!this.isFunction(executor)) {
            throw new TypeError('callback is not a function');
        }

        /**
         * The resolve function used to fulfill the promise.
         * @param {*} resolvedValue The value to resolve the promise with.
         */
        const resolve = (resolvedValue) => {
            if (this.state === this.promiseState.PENDING) {
                this.state = this.promiseState.FULFILLED;
                this.resolvedValue = resolvedValue;
                this.onFulfilledCallbacks.forEach((callback) => callback(resolvedValue));
            }
        };

        /**
         * The reject function used to reject the promise.
         * @param {*} rejectedReason The reason to reject the promise with.
         */
        const reject = (rejectedReason) => {
            if (this.state === this.promiseState.PENDING) {
                this.state = this.promiseState.REJECTED;
                this.rejectedReason = rejectedReason;
                this.onRejectedCallbacks.forEach((callback) => callback(rejectedReason));
            }
        };

        try {
            executor(resolve, reject);
        } catch (err) {
            reject(err);
        }
    }

    /**
     * Attaches handlers for fulfillment and/or rejection of the promise.
     * @param {function} [onFulfilled] Callback to be executed when the promise is fulfilled.
     * @param {function} [onRejected] Callback to be executed when the promise is rejected.
     * @returns {MyPromise} A new Promise which will be resolved or rejected based on the result of the handlers.
     */
    then(onFulfilled, onRejected) {
        return new MyPromise((resolve, reject) => {

            const handleFulfilled = (value) => {
                try {
                    const result = onFulfilled ? onFulfilled(value) : value;
                    resolve(result);
                } catch (error) {
                    reject(error);
                }
            };

            const handleRejected = (reason) => {
                try {
                    const result = onRejected ? onRejected(reason) : reason;
                    reject(result);
                } catch (error) {
                    reject(error);
                }
            };

            if (this.state === this.promiseState.FULFILLED) {
                setTimeout(() => handleFulfilled(this.resolvedValue), 0);
            } else if (this.state == this.promiseState.REJECTED) {
                setTimeout(() => handleRejected(this.rejectedReason), 0);
            } else {
                this.onFulfilledCallbacks.push(handleFulfilled);
                this.onRejectedCallbacks.push(handleRejected);
            }
        });
    }

    /**
     * Attaches a handler for rejection of the promise.
     * @param {function} callback Callback to be executed when the promise is rejected.
     * @returns {MyPromise} A new Promise.
     */
    catch(callback) {
        return this.then(null, callback);
    }

    /**
     * Attaches a handler to be executed regardless of the promise's outcome.
     * @param {function} callback Callback to be executed.
     * @returns {MyPromise} A new Promise.
     */
    finally(callback) {
        return this.then(
            value => MyPromise.resolve(callback()).then(() => value),
            reason => MyPromise.resolve(callback()).then(() => { throw reason; })
        );
    }

    /**
     * Creates a new Promise that is resolved with the given value.
     * @param {*} value The value to resolve the promise with.
     * @returns {MyPromise} A new resolved Promise.
     */
    static resolve(value) {
        return new MyPromise(resolve => resolve(value));
    }

    /**
     * Creates a new Promise that is rejected with the given reason.
     * @param {*} reason The reason to reject the promise with.
     * @returns {MyPromise} A new rejected Promise.
     */
    static reject(reason) {
        return new MyPromise((resolve, reject) => reject(reason));
    }

    /**
     * Returns a promise that resolves or rejects as soon as one of the promises in the array resolves or rejects.
     * @param {Array<MyPromise>} promises An array of promises.
     * @returns {MyPromise} A new Promise.
     */
    static race(promises) {
        return new Promise((resolve, reject) => {
            promises.forEach(promise => {
                MyPromise.resolve(promise).then(resolve, reject);
            });
        });
    }

    /**
     * Returns a promise that resolves when all of the promises in the array have resolved.
     * @param {Array<MyPromise>} promises An array of promises.
     * @returns {MyPromise} A new Promise.
     */
    static all(promises) {
        return new MyPromise((resolve, reject) => {

            const results = [];
            let resolvedCount = 0;

            if (promises.length === 0) {
                resolve(results);
                return;
            }

            for (let i = 0; i < promises.length; i++) {
                Promise.resolve(promises[i]).then(
                    value => {
                        results[i] = value;
                        resolvedCount++;
                        if (resolvedCount === promises.length) {
                            resolve(results);
                        }
                    },
                    reason => reject(reason)
                );
            }
        });

    }
}

module.exports = MyPromise;