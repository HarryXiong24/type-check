<h1 align="center">Welcome to type-check 👋</h1>
<p>
  <a href="#" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  </a>
</p>

> A type check library

### 🏠 [Homepage](https://github.com/HarryXiong24/type-check)

## Install

```sh
yarn add
```

## Run tests

```sh
yarn test
```

## Usage

### checkType

```ts
interface TypeOption<T = unknown> {
    type: string | string[];
    enum?: T[];
    additional?: T[];
}

checkType<T = unknown>(variable: T, type: string[] | string | TypeOption, variableName?: string) => boolean;
```

<details>

<summary>案例</summary>

```js
const a = 1;
const b = true;
const c = 'abc';
const d = undefined;
const e = [];
const f = {};
const g = [1, 2, 3];
const h = ['a', 'b', 'c'];
const i = [1, 'b', 'c'];
const j = { a: 1, b: 2 };
const k = { a: 'a', b: 'b' };
const l = null;

checkType(a, 'boolean'); // false
checkType(b, 'boolean'); // true
checkType(b, 'string'); // false
checkType(b, { type: 'boolean', enum: [true] }); // true
checkType(c, 'string'); // true
checkType(c, 'undefined'); // false
checkType(d, 'undefined'); // true
checkType(d, 'number'); // false
checkType(a, 'number'); // true
checkType(l, 'null'); // true
checkType(l, 'object'); // false
checkType(l, 'number'); // false

checkType(e, 'object'); // false
checkType(e, 'array'); // true
checkType(f, 'array'); // false
checkType(f, 'object'); // true
checkType(g, 'array'); // true
checkType(h, 'array'); // true
checkType(i, 'array'); // true
checkType(j, 'object'); // true
checkType(k, 'object'); // true

checkType(g, 'string[]'); // false
checkType(g, 'number[]'); // true
checkType(h, 'number[]'); // false
checkType(h, 'string[]'); // true
checkType(i, 'number[]'); // false
checkType(i, 'string[]'); // false
checkType(j, 'Record<string,string>'); // false
checkType(j, 'Record<string, string>'); // false
checkType(j, 'Record<string,number>'); // true
checkType(j, 'Record<string, number>'); // true
checkType(k, 'Record<string,number>'); // false
checkType(k, 'Record<string, number>'); // false
checkType(k, 'Record<string,string>'); // true
checkType(k, 'Record<string, string>'); // true
```

</details>

### checkKeys

```ts
checkKeys<T = unknown>(obj: T, config: Record<string, string[] | string | TypeOption>, objName?: string) => boolean;
```

<details>

<summary>案例</summary>

```js
checkKeys({ title: 'a', desc: 'b' }, { title: 'string', desc: 'string' }); // true

checkKeys(
  { title: 'a', desc: 'b' },
  { title: ['boolean', 'string'], desc: ['string', 'number'] }
); // true

checkKeys({ title: 'a', desc: 'b', a: 1 }, { title: 'string', desc: 'string' }); // false

checkKeys({ title: 'a' }, { title: 'string', desc: 'string' }); // false

checkKeys({ title: 'a', desc: 3 }, { title: 'string', desc: 'string' }); // false

checkKeys(
  { title: 'a', desc: 'b' },
  { title: 'string', desc: 'string', content: 'array' }
); // false
```

</details>

## Author

👤 **Harry Xiong**

- Website: <https://www.harryxiong24.com>
- Github: [@harryxiong24](https://github.com/harryxiong24)

## Show your support

Give a ⭐️ if this project helped you!
