---
title: "DOM API"
date: "2021-04-25"
updated: "2021-04-25"
author: Villager Liao
keywords:
  - dom
  - web api
---

# DOM Api

## DOM

- `Document`
- `Window`
- `Node`
- `HTMLElement`, `HTMLInputElement`, `HTMLImageElement`, etc

## getElement(s)

- getElementById

```js
var btn = document.getElementById("btn")
```

- getElementsByClassName

```js
const [date] = document.getElementsByClassName("date")
```

- getElementsByTagName

```js
var tbody = document.getElementById("content")
var botInpArr = tbody.getElementsByTagName("input")
```

- querySelector

```js
var el = document.querySelector("#main, #basic, #exclamation")
```

- querySelectorAll

```js
var special = document.querySelectorAll("p.warning, p.note")
```

- children

```js
var date = td.children[0].innerHTML
```

## innerHTML

```js
btn.innerHTML === "隱藏"
```

## insertBefore

```js
let paragraphs = document.body.getElementsByTagName("p")
document.body.insertBefore(paragraphs[2], paragraphs[0])
```

## createElement

```js
const para = document.createElement("p")
para.textContent = "We hope you enjoyed the ride."
```

## createTextNode

```js
const text = document.createTextNode(
  " — the premier source for web development knowledge."
)
const linkPara = document.querySelector("p")
linkPara.appendChild(text)
```

## appendChild

```js
// newRows
const tableBody = document.getElementById("body")

for (let i = 0; i < newRows.length; i++) {
  tableBody.appendChild(newRows[i])
}
```

## removeChild

```js
sect.removeChild(linkPara)

// or
linkPara.remove()
// or
linkPara.parentNode.removeChild(linkPara)
```

## removeAttribute

```js
var inp = document.getElementsByTagName("input")[0]

inp.removeAttribute("disabled")
```

## Event

- onload

- onclick
- onmouseover
- onmouseout
- onscroll

- onfocus
- onblur
- oninput
- onresize

```js
window.onresize = function () {
  winWidth = window.innerWidth
  winHeight = window.innerHeight
  div.style.width = winWidth + "px"
  div.style.height = winHeight + "px"
}
```

## Attribute

- setAttribute

```js
para.setAttribute("class", "highlight")
```

- className

```js
div1.className = "hide"
```

- style

```js
para.style.color = "white"
para.style.backgroundColor = "black"
para.style.padding = "10px"
para.style.width = "250px"
para.style.textAlign = "center"
```

- value
- checked
- textContent
- href

## Ref

- [eloquentjavascript](https://eloquentjavascript.net/14_dom.html)
