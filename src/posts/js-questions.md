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
