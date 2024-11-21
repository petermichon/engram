import { assertEquals } from "jsr:@std/assert";
import { generateJS } from "./engram.ts";

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

test();

// Some none-exhaustive tests
function test() {
    Deno.test("Test n°1", () => {
        const bytecode = [{ opcode: 0, operand: 0 }];
        const actual = generateJS(bytecode, 1);
        // prettier-ignore
        const expected =
            `const w = new Uint32Array(1);\n` + 
            `w[0] = w[0];\n` + 
            `w;\n`;
        assertEquals(actual, expected);
    });

    Deno.test("Test n°2", () => {
        const bytecode = [
            { opcode: Opcode.or, operand: 0b00000001 }, // |
            { opcode: Opcode.add, operand: 0b00011111 }, // +
            { opcode: Opcode.xor, operand: 0b00011111 }, // ^
            { opcode: Opcode.and, operand: 0b00111000 }, // &
            { opcode: Opcode.rshift, operand: 3 }, // >>
        ];
        const actual = generateJS(bytecode, 1);
        const expected =
            `const w = new Uint32Array(1);\n` +
            `w[0] |= 1;\n` +
            `w[0] += 31;\n` +
            `w[0] ^= 31;\n` +
            `w[0] &= 56;\n` +
            `w[0] >>= 3;\n` +
            `w;\n`;
        assertEquals(actual, expected);
    });

    Deno.test("Test n°3", () => {
        const bytecode = [
            { opcode: Opcode.or, operand: 0b00011 }, // input
            { opcode: Opcode.and, operand: 0b00011 }, // input mask
            { opcode: Opcode.add, operand: 0b00101 },
            { opcode: Opcode.xor, operand: 0b00100 },
            { opcode: Opcode.add, operand: 0b00111 },
            { opcode: Opcode.and, operand: 0b10111 },
            { opcode: Opcode.xor, operand: 0b00010 },
            { opcode: Opcode.add, operand: 0b00101 },
            { opcode: Opcode.xor, operand: 0b00100 },
            { opcode: Opcode.sub, operand: 0b00001 },
            { opcode: Opcode.xor, operand: 0b00010 },
            { opcode: Opcode.add, operand: 0b00111 },
            { opcode: Opcode.rshift, operand: 3 }, // output shift
            { opcode: Opcode.and, operand: 0b00011 }, // output mask
        ];
        const actual = generateJS(bytecode, 1);
        const expected =
            `const w = new Uint32Array(1);\n` +
            `w[0] |= 3;\n` +
            `w[0] &= 3;\n` +
            `w[0] += 5;\n` +
            `w[0] ^= 4;\n` +
            `w[0] += 7;\n` +
            `w[0] &= 23;\n` +
            `w[0] ^= 2;\n` +
            `w[0] += 5;\n` +
            `w[0] ^= 4;\n` +
            `w[0] -= 1;\n` +
            `w[0] ^= 2;\n` +
            `w[0] += 7;\n` +
            `w[0] >>= 3;\n` +
            `w[0] &= 3;\n` +
            `w;\n`;
        assertEquals(actual, expected);
    });

    Deno.test("Test n°4", () => {
        const bytecode = [
            { opcode: Opcode.or, operand: 0b00000_00001_00010_00011 },
            { opcode: Opcode.and, operand: 0b00011_00011_00011_00011 },
            { opcode: Opcode.add, operand: 0b00101_00101_00101_00101 },
            { opcode: Opcode.xor, operand: 0b00100_00100_00100_00100 },
            { opcode: Opcode.add, operand: 0b00111_00111_00111_00111 },
            { opcode: Opcode.and, operand: 0b10111_10111_10111_10111 },
            { opcode: Opcode.xor, operand: 0b00010_00010_00010_00010 },
            { opcode: Opcode.add, operand: 0b00101_00101_00101_00101 },
            { opcode: Opcode.xor, operand: 0b00100_00100_00100_00100 },
            { opcode: Opcode.sub, operand: 0b00001_00001_00001_00001 },
            { opcode: Opcode.xor, operand: 0b00010_00010_00010_00010 },
            { opcode: Opcode.add, operand: 0b00111_00111_00111_00111 },
            { opcode: Opcode.rshift, operand: 3 },
            { opcode: Opcode.and, operand: 0b00011_00011_00011_00011 },
        ];
        const actual = generateJS(bytecode, 1);
        const expected =
            `const w = new Uint32Array(1);\n` +
            `w[0] |= 1091;\n` +
            `w[0] &= 101475;\n` +
            `w[0] += 169125;\n` +
            `w[0] ^= 135300;\n` +
            `w[0] += 236775;\n` +
            `w[0] &= 777975;\n` +
            `w[0] ^= 67650;\n` +
            `w[0] += 169125;\n` +
            `w[0] ^= 135300;\n` +
            `w[0] -= 33825;\n` +
            `w[0] ^= 67650;\n` +
            `w[0] += 236775;\n` +
            `w[0] >>= 3;\n` +
            `w[0] &= 101475;\n` +
            `w;\n`;
        assertEquals(actual, expected);
    });

    Deno.test("Test n°5", () => {
        const bytecode = [
            { opcode: Opcode.move_reg, operand: 1 }, // [0] = [1]
            { opcode: Opcode.add, operand: 1 }, // [0] += 1
            { opcode: Opcode.move_mem, operand: 1 }, // [1] = [0]
        ];
        const actual = generateJS(bytecode, 4);
        const expected =
            `const w = new Uint32Array(4);\n` +
            `w[0] = w[1];\n` +
            `w[0] += 1;\n` +
            `w[1] = w[0];\n` +
            `w;\n`;
        assertEquals(actual, expected);
    });
}
