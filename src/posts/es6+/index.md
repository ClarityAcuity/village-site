---
title: "ES6+"
date: "2021-05-02"
updated: "2021-05-02"
author: Villager Liao
keywords:
  - javascript
  - es6
---

# ES6+

## Arrow Function

diffence

Differences & Limitations:

- Does not have its own bindings to `this` or `super`, and should not be used as `methods`.

```js
'use strict';

var obj = { // does not create a new scope
  i: 10,
  b: () => console.log(this.i, this),
  c: function() {
    console.log(this.i, this);
  }
}

obj.b(); // prints undefined, Window {...} (or the global object)
obj.c(); // prints 10, Object {...}
```

```js
'use strict';

var obj = {
  a: 10
};

Object.defineProperty(obj, 'b', {
  get: () => {
    console.log(this.a, typeof this.a, this); // undefined 'undefined' Window {...} (or the global object)
    return this.a + 10; // represents global object 'Window', therefore 'this.a' returns 'undefined'
  }
});
```

- Does not have `arguments`, or `new.target` keywords. They have access to the arguments object of the closest non-arrow parent function.

```js
var arguments = [1, 2, 3];
var arr = () => arguments[0];

arr(); // 1

function foo(n) {
  var f = () => arguments[0] + n; // foo's implicit arguments binding. arguments[0] is n
  return f();
}

foo(3); // 3 + 3 = 6
```

- The value of this inside an arrow function remains the same throughout the lifecycle of the function and is always bound to the value of this in the closest non-arrow parent function.
- Not suitable for call, apply and bind methods, which generally rely on establishing a scope.

```js
// A simplistic object with its very own "this".
var obj = {
    num: 100
}

// Setting "num" on window to show how it is NOT used.
window.num = 2020; // yikes!

// A simple traditional function to operate on "this"
var add = function (a, b, c) {
  return this.num + a + b + c;
}

// Arrow Function
var arrowAdd = (a, b, c) => this.num + a + b + c;

// call
var result = add.call(obj, 1, 2, 3) // establishing the scope as "obj"
console.log(result) // result 106
console.log(arrowAdd.call(obj, 1, 2, 3)) // result 2026


// apply
const arr = [1, 2, 3]
var result = add.apply(obj, arr) // establishing the scope as "obj"
console.log(result) // result 106
console.log(arrowAdd.apply(obj, arr)) // result 2026


// bind
var result = add.bind(obj) // establishing the scope as "obj"
const bound = arrowAdd.bind(obj)
console.log(result(1, 2, 3)) // result 106
console.log(bound(1, 2, 3)) // result 2026
```

- Can not be used as constructors.

```js
var Foo = () => {};
var foo = new Foo(); // TypeError: Foo is not a constructor
```

- Does not have a prototype property.

```js
var Foo = () => {};
console.log(Foo.prototype); // undefined
```

- Can not use yield, within its body. As a consequence, arrow functions cannot be used as generators.

- Arrow functions can never have duplicate named parameters.

## Promise

- Promise callbacks are handled as a Microtask
- `.resolve(value)`, `.reject(reason)`
- `.then()`, `.catch()`, `.finally()`

```js
let isLoading = true;

fetch(myRequest).then(function(response) {
    var contentType = response.headers.get("content-type");
    if(contentType && contentType.includes("application/json")) {
      return response.json();
    }
    throw new TypeError("Oops, we haven't got JSON!");
  })
  .then(function(json) { /* process your JSON further */ })
  .catch(function(error) { console.error(error); /* this line can also throw, e.g. when console = {} */ })
  .finally(function() { isLoading = false; });
```

- `.all(iterable)`

```js
// from mdn
const applyAsync = (acc,val) => acc.then(val);
const composeAsync = (...funcs) => x => funcs.reduce(applyAsync, Promise.resolve(x));
const transformData = composeAsync(func1, func2, func3);
const result3 = transformData(data);

// or
let result;
for (const f of [func1, func2, func3]) {
  result = await f(result);
}
/* use last result (i.e. result3) */
```

- `.allSettled(iterable)`, `.any(iterable)`, `.race()`

## Async Function

```js
async function foo() {
   return 1
}
// it will be implicitly wrapped in a promise
function foo() {
   return Promise.resolve(1)
}
```

```js
function resolveAfter2Seconds() {
  console.log("starting slow promise")
  return new Promise(resolve => {
    setTimeout(function() {
      resolve("slow")
      console.log("slow promise is done")
    }, 2000)
  })
}

function resolveAfter1Second() {
  console.log("starting fast promise")
  return new Promise(resolve => {
    setTimeout(function() {
      resolve("fast")
      console.log("fast promise is done")
    }, 1000)
  })
}

async function sequentialStart() {
  console.log('==SEQUENTIAL START==')

  // 1. Execution gets here almost instantly
  const slow = await resolveAfter2Seconds()
  console.log(slow) // 2. this runs 2 seconds after 1.

  const fast = await resolveAfter1Second()
  console.log(fast) // 3. this runs 3 seconds after 1.
}

async function concurrentStart() {
  console.log('==CONCURRENT START with await==');
  const slow = resolveAfter2Seconds() // starts timer immediately
  const fast = resolveAfter1Second() // starts timer immediately

  // 1. Execution gets here almost instantly
  console.log(await slow) // 2. this runs 2 seconds after 1.
  console.log(await fast) // 3. this runs 2 seconds after 1., immediately after 2., since fast is already resolved
}

function concurrentPromise() {
  console.log('==CONCURRENT START with Promise.all==')
  return Promise.all([resolveAfter2Seconds(), resolveAfter1Second()]).then((messages) => {
    console.log(messages[0]) // slow
    console.log(messages[1]) // fast
  })
}

async function parallel() {
  console.log('==PARALLEL with await Promise.all==')

  // Start 2 "jobs" in parallel and wait for both of them to complete
  await Promise.all([
      (async()=>console.log(await resolveAfter2Seconds()))(),
      (async()=>console.log(await resolveAfter1Second()))()
  ])
}

sequentialStart() // after 2 seconds, logs "slow", then after 1 more second, "fast"

// wait above to finish
setTimeout(concurrentStart, 4000) // after 2 seconds, logs "slow" and then "fast"

// wait again
setTimeout(concurrentPromise, 7000) // same as concurrentStart

// wait again
setTimeout(parallel, 10000) // truly parallel: after 1 second, logs "fast", then after 1 more second, "slow"
```

## Generator

The `Generator` object is returned by a generator function and it conforms to both the iterable protocol and the iterator protocol.

```js
function* generator() {
  yield 1;
  yield 2;
  yield 3;
}

const gen = generator(); // "Generator { }"

console.log(gen.next().value); // 1
console.log(generator().next().value); // 1
```

- `.next()`, `.return()`, `.throw()`

- Calling a generator function does not execute its body immediately; an `iterator` object for the function is returned instead.
- When the iterator's `next()` method is called, the generator function's body is executed until the first `yield` expression.
- The `next()` method returns an object with a `value` property containing the yielded value and a `done` property which indicates whether the generator has yielded its last value, as a boolean.
- A `return` statement in a generator, when executed, will make the generator finish.

```js
function* yieldAndReturn() {
  yield "Y";
  return "R";
  yield "unreachable";
}

var gen = yieldAndReturn()
console.log(gen.next()); // { value: "Y", done: false }
console.log(gen.next()); // { value: "R", done: true }
console.log(gen.next()); // { value: undefined, done: true }
```

- An `error` thrown inside the generator will make the generator finished -- unless caught within the generator's body.
- When a generator is finished, subsequent `next()` calls will not execute any of that generator's code, they will just return an object of this form: `{ value: undefined, done: true }`.

## Reflect

[Reflect is a built-in object that provides methods for interceptable JavaScript operations.](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect)

