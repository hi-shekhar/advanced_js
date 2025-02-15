const MyPromise = require('./my_promise');


function assert(condition, message) {
    if (condition) {
        console.log(`PASSED: ${message}`);
    } else {
        console.log(`FAILED: ${message}`);
    }
}

const t1 = 'Should resolve with static value'
let promise_1 = MyPromise.resolve(t1);
promise_1.then(res => assert(res === t1, t1));

const t2 = 'Should reject with static value';
let promise_2 = MyPromise.reject(t2);
promise_2.catch(err => assert(err === t2, t2));

const t3 = 'Should resolve and then';
let promise_3 = new MyPromise((resolve, __) => resolve(t3));
promise_3.then(res => assert(res === t3, t3));

const t4 = 'Should reject and catch';
let promise_4 = new MyPromise((__, reject) => reject(t4));
promise_4.catch(err => assert(err === t4, t4));

const t5 = 'Should handle then chaining';
let promise_5 = new MyPromise((resolve, __) => resolve(t5));
promise_5.then(res => res + 'next').then(res => assert(res === t5 + 'next', t5));

const t6 = 'Should handle no onFulfilled handler';
let promise_6 = new MyPromise((resolve, __) => resolve(t6));
promise_6.then().then(res => assert(res === t6, t6));

// const t7= 'should handle finally (reject)';
// let promise_7 = MyPromise.reject(t7);
// let finally_resolve = false;
// promise_7.finally(() => {
//     console.log('3');
//     finally_resolve = true;
//     return MyPromise.resolve(2);
// }).then((res) => {
//     console.log('res' , res);
//     assert(res === t7, `${t7} - rejected`);
//     assert(finally_resolve === true, t7);
// });

// const t8= 'should handle finally (reject)';
// let promise_8 = MyPromise.reject(t8);
// let finally_rejected = false;
// promise_8.finally(() => finally_rejected = true).catch((err) => {
//     assert(err === t7, `${t8} - rejected`);
//     assert(finally_rejected === true, t8);
// });

const t9 = 'should handle the promise all (resolved)';
let promises_resolved = [MyPromise.resolve(1), MyPromise.resolve(2)];
MyPromise.all(promises_resolved).then((responses) => {
    assert(responses[0] === 1, `${t9} - p1`)
    assert(responses[1] === 2, `${t9} - p2`)
});

const t10 = 'should handle the promise all (rejected)';
let promises_rejected = [MyPromise.resolve(1), MyPromise.reject('rejected promise')];
MyPromise.all(promises_rejected).catch((errors) => {
    assert(errors === 'rejected promise', `${t10}`);
});