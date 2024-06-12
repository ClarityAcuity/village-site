---
title: "JS Regex"
date: "2021-04-25"
updated: "2021-04-25"
author: Villager Liao
keywords:
  - regex
  - javascript
---

# JS Regex

- \d  Any digit character
- \w  An alphanumeric character (“word character”)
- \s  Any whitespace character (space, tab, newline, and similar)
- \D  A character that is not a digit
- \W  A nonalphanumeric character
- \S  A nonwhitespace character
- .  Any character except for newline

```js
let dateTime = /\d\d-\d\d-\d\d\d\d \d\d:\d\d/;
console.log(dateTime.test("01-30-2003 15:20")); // → true
console.log(dateTime.test("30-jan-2003 15:20")); // → false
```


comment   \/\*[^*]*\*+([^/*][^*]*\*+)*\/
num   [0-9]+|[0-9]*"."[0-9]+
nonascii  [\200-\377]
nmstart   [_a-z]|{nonascii}|{escape}
nmchar    [_a-z0-9-]|{nonascii}|{escape}
name    {nmchar}+
ident   {nmstart}{nmchar}*

