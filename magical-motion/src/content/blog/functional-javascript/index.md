---
title: "FUNCTIONAL JAVASCRIPT"
date: "2021-04-14"
updated: "2021-04-14"
author: Villager Liao
keywords:
  - functional programing
  - javascript
---

# Functional Javascript

- Curried function

A curried function is a function which takes multiple parameters one at a time, by taking the first argument, and returning a series of functions which each take the next argument until all the parameters have been fixed, and the function application can complete, at which point, the resulting value is returned.

Curried functions are great for function composition, because they allow you to easily convert an n-ary function into the unary function form needed for function composition pipelines: Functions in a pipeline must expect exactly one argument.
Data last functions are convenient for function composition, because they can be easily used in point-free style.

```js
// add = a => b => Number
const add = a => b => a + b;
```

- Partial application

A partial application is a function which has been applied to some, but not yet all of its arguments. The arguments which the function has already been applied to are called fixed parameters.

- Point-free

Point-free style is a style of programming where function definitions do not make reference to the function’s arguments. Generally, a point-free function is created by calling a function which returns a function, such as a curried function.

```js
// inc = n => Number
// Adds 1 to any number.
const inc = add(1);
inc(3); // => 4

const inc10 = add(10);
const inc20 = add(20);
inc10(3); // => 13
inc20(3); // => 23
```

- Compose

```js
/* Algebra definition, borrowing the `.` composition operator from Haskell
h: a -> c
h = f . g = f(g(x))
*/
const g = n => n + 1;
const f = n => n * 2;
const h = x => f(g(x));
h(20); //=> 42

const compose = (f, g) => x => f(g(x));

const compose = (...fns) => x => fns.reduceRight((y, f) => f(y), x);
```

- Pipe

There's another composition utility called pipe() that composes in reverse order:

```js
const pipe = (...fns) => x => fns.reduce((y, f) => f(y), x);
```

- Trace

```js
const pipe = (...fns) => x => fns.reduce((y, f) => f(y), x);
const trace = label => value => {
  console.log(`${ label }: ${ value }`);
  return value;
};
const g = n => n + 1;
const f = n => n * 2;
/*
Now the function application order
runs top-to-bottom:
*/
const h = pipe(
  g,
  trace('after g'),
  f,
  trace('after f'),
);
h(20);
/*
after g: 21
after f: 42
*/
```

- Together

```js
const map = fn => mappable => mappable.map(fn);
const pipe = (...fns) => x => fns.reduce((y, f) => f(y), x);
const log = (...args) => console.log(...args);
const arr = [1, 2, 3, 4];
const isEven = n => n % 2 === 0;
const stripe = n => isEven(n) ? 'dark' : 'light';
const stripeAll = map(stripe);
const striped = stripeAll(arr); 
log(striped);
// => ["light", "dark", "light", "dark"]
const double = n => n * 2;
const doubleAll = map(double);
const doubled = doubleAll(arr);
log(doubled);
// => [2, 4, 6, 8]
```

- Flip

```js
const flip = fn => a => b => fn(b)(a);

const pipe = (...fns) => x => fns.reduce((y, f) => f(y), x);
const trace = value => label => {
  console.log(`${ label }: ${ value }`);
  return value;
};
const flippedTrace = flip(trace);
const g = n => n + 1;
const f = n => n * 2;
const h = pipe(
  g,
  flippedTrace('after g'),
  f,
  flippedTrace('after f'),
);
h(20);
```

But a better approach is to write the function correctly in the first place. The style is sometimes called “data last”, which means that you should take the specializing parameters first, and take the data the function will act on last.

Data last functions are convenient for function composition, because they can be easily used in point-free style.

## Ref: [Curry and Function Composition](https://medium.com/javascript-scene/curry-and-function-composition-2c208d774983)
