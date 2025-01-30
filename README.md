# Engram

Engram is a simple code generator for in-place computation.

## Usage

Here is a basic example

```ts
import * as engram from "@petermichon/engram";

function main() {
    const bytecode = [
        { opcode: 0, operand: 1 }, // [0] = [1]
        { opcode: 7, operand: 1 }, // [0] += 1
        { opcode: 1, operand: 1 }, // [1] = [0]
    ];
    const size = 2;
    const script = engram.generateJS(bytecode, size);
    
    console.log(script);
}
```

You can then run the generated JavaScript code

```ts
const w = new Uint32Array(2);
w[0] = w[1];
w[0] += 1;
w[1] = w[0];
w;
```

You can also run the script at runtime using `eval`

```ts
console.log(eval(script).toString());
```

The current implementation only supports the generation of JavaScript code.

## Opcode Table

The bytecode is an intermediate representation of the instructions.

Here is the list of opcodes and their JavaScript equivalent operation

| Opcode | JS Equivalent     |
| ------ | ----------------- |
| 0      | `[0] = [operand]` |
| 1      | `[operand] = [0]` |
| 2      | `[0] &= operand`  |
| 3      | `[0] \|= operand` |
| 4      | `[0] ^= operand`  |
| 5      | `[0] <<= operand` |
| 6      | `[0] >>= operand` |
| 7      | `[0] += operand`  |
| 8      | `[0] -= operand`  |
| 9      | `[0] *= operand`  |
| 10     | `[0] /= operand`  |
| 11     | `[0] %= operand`  |
| 12     | `[0] **= operand` |

For code clarity, you can use the following `Opcode` object

```ts
const Opcode = {
    move_reg: 0,
    move_mem: 1,
    and: 2,
    or: 3,
    xor: 4,
    lshift: 5,
    rshift: 6,
    add: 7,
    sub: 8,
    mul: 9,
    div: 10,
    mod: 11,
    pow: 12,
};
```
