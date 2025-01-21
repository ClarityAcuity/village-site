---
title: "JS Module"
date: "2021-04-25"
updated: "2021-04-25"
author: Villager Liao
keywords:
  - module
  - javascript
---

# JS Module

## CommonJS

CommonJS 模塊加載過程是同步阻塞性地加載，在模塊代碼被運行前就已經寫入了 cache，同一個模塊被多次 `require` 時隻會執行一次，重複的 `require` 得到的是相同的 `exports` 引用。

CommonJS modules allow a limited form of cyclic dependencies. As long as the modules do not replace their default exports object and don’t access each other’s interface until after they finish loading, cyclic dependencies are okay.

## ES Module

ESM效率要比 CommonJS 模塊的加載方式高，動態綁定關係
import: 靜態執行，會提升，不可修改/隻讀
`export default`: 指定模塊的輸出，輸出一個叫做default的方法/變量，係統允許修改名稱
`import（）`: 動態加載模塊，當需要按需加載時使用

ES module imports happen before a module’s script starts running

ES6 模塊的加載過程分為三步：

1. 查找，下載，解析，構建所有模塊實例。
ES6 模塊會在程序開始前先根據模塊關係查找到所有模塊，生成一個無環關係圖，並將所有模塊實例都創建好，這種方式天然地避免了循環引用的問題，當然也有模塊加載緩存，重複 `import` 同一個模塊，隻會執行一次代碼。

2. 在內存中騰出空間給即將 `export` 的內容（此時尚未寫入 export value）。然後使 `import` 和 `export` 指嚮內存中的這些空間，這個過程也叫連接。

```js
// counter.mjs
export let count = 1;

export function increment () {
  count++;
}

// main.mjs
import { increment, count } from './counter.mjs'

increment();
console.log(count); // 2
```

3. 運行模塊代碼將變量的實際值填寫在第二步生成的空間中。

## Diffence

ESM: import, import(), export, export default

CommonJS: require(), module.exports

1. CommonJS輸出的是值的拷貝，ES Module輸出的是值的引用

2. CommonJS是運行時加載（module.exports），ES Module是編譯時輸出接口

3. CommonJS的require（）是同步加載模塊，ESModule的import是異步加載模塊，靜態編譯時加載，有獨立的模塊依賴解析

4. require 會將完整的 exports 對象引入，import 可以隻 import 部分必要的內容，這也是為什麼使用 Tree Shaking 時必須使用 ES6 模塊 的寫法。

5. CommonJS模塊的頂層this指嚮當前模塊，ES6模塊中，頂層this指嚮undefined
