# Engram

[![Deno](https://github.com/petermichon/engram/actions/workflows/deno.yml/badge.svg)](https://github.com/petermichon/engram/actions/workflows/deno.yml)

Engram is a simple code generator for creating in‑place algorithms in JavaScript.

## Usage

Here is a basic example written in TypeScript

```ts
import * as engram from "@petermichon/engram";

function main() {
  const bytecode: [string, number][] = [
    ["+", 1],
    // ...
  ];

  const script = engram.generateJS(bytecode);
  const fn = new Function("n", script);

  console.log(script);
  console.log(fn(0));
}
```

This is the generated JavaScript script

```js
return n + 1;
```

Using the `FunctionConstructor`, the generated script can be turned into a JavaScript function. This is how the function looks like

```js
function anonymous(n) {
  return n + 1;
}
```

The function can then be called at runtime

```ts
const fn = new Function("n", script);
console.log(fn(0));
```

This will print `1`

## Operations Table

Here is the list of supported JavaScript operations

| Opcode | Description          |
| ------ | -------------------- |
| &      | Bitwise AND          |
| \|     | Bitwise OR           |
| ^      | Bitwise XOR          |
| <<     | Left shift           |
| >>     | Right shift          |
| >>>    | Unsigned right shift |
| +      | Addition             |
| -      | Subtraction          |
| \*     | Multiplication       |
| /      | Division             |
| %      | Modulo               |
| \*\*   | Exponentiation       |

## Limitations

The current implementation only supports the generation of JavaScript code.
