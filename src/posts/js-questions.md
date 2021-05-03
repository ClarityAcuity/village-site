---
title: "JS Questions"
date: "2021-02-01"
author: Villager Liao
---

## Promise

use Promise to print array [11, 3, 5, 7, 25, 4, 6] item at every 100ms

```js
function x(v) {
  return v.reduce((chain, n) => {
    return chain.then(
      (_) =>
        new Promise((resolve, reject) => {
          setTimeout(() => {
            console.log(n);
            resolve(n);
          }, 1000);
        }),
      (e) => console.log(e)
    );
  }, Promise.resolve());
}

x([11, 3, 5, 7, 25, 4, 6]);
```

```js
function print(n) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(n);
      resolve(n);
    }, 1000);
  });
}

async function y(v) {
  for (let i = 0; i < v.length; i++) {
    await print(v[i]);
  }
}

y([11, 3, 5, 7, 25, 4, 6]);
```

## Generator

make a function, each time call it, the value will increase 1, start from 0

```js
function* gen() {
  let count = 0;
  while (true) {
    yield count++;
  }
}

let foo = gen();
console.log(foo.next().value);
console.log(foo.next().value);
console.log(foo.next().value);
```

```js
function closure() {
  let count = 0;
  return {
    next: () => count++,
  };
}

let bar = closure();
console.log(bar.next());
console.log(bar.next());
console.log(bar.next());
```

## Curry

make function add, add(1, 2, 3) = 6, curryAdd(1)(2)(3) = 6

```js
function add(a, b, c) {
  return a + b + c;
}

function curry(func, ARITY = func.length) {
  return function curried(...args) {
    if (args.length >= ARITY) {
      return func.apply(this, args);
    } else {
      return function (...args2) {
        return curried.apply(this, args.concat(args2));
      };
    }
  };
}

const curryAdd = curry(add);

console.log(add(1, 2, 3));
console.log(curryAdd(1)(2)(3));
```

```js
// Note, those add() need specific ARITY
function add(...a) {
  return a.length >= 1
    ? a.reduce((sum, current) => sum + current, 0)
    : undefined;
}
const curryAdd = curry(add, a.length);

function add(a, ...b) {
  const [next, ...rest] = b
  if (b.length > 1) {
    return a + add(next, rest)
  }
  return a + Number(b[0])
}
const curryAdd = curry(add, 1 + b.length);
```

## Promise.All

impl `promiseAll` same as native `Promise.all`

```js
const promiseAll = (promises) => {
  let result = promises.map(() => 0);

  return new Promise((resolve, reject) => {
    promises.forEach((task, i) => {
      task
        .then((finish) => {
          result[i] = finish;
          if (result.every((value) => !!value)) {
            resolve(result);
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  });
};

function task1() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(10);
    }, 1000);
  });
}
const task2 = Promise.resolve(1000);
Promise.all([task1(), task2])
  .then((results) => {
    console.log(results);
  })
  .catch((error) => console.log(error));
```
