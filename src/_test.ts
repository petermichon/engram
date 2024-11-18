import { assertEquals } from "jsr:@std/assert";
import { generateJS } from "./engram.ts";

test();

// Some none-exhaustive tests
function test() {
    Deno.test("Test n°1", () => {
        const bytecode = [{ opcode: 0, operand: 0n }];
        const actual = generateJS(bytecode);
        const expected = `0n & 0n;`;
        assertEquals(actual, expected);
    });

    Deno.test("Test n°2", () => {
        const bytecode = [
            { opcode: 1, operand: 0b00000001n },
            { opcode: 3, operand: 0b00011111n },
            { opcode: 2, operand: 0b00011111n },
            { opcode: 0, operand: 0b00111000n },
            { opcode: 8, operand: 3n },
        ];
        const actual = generateJS(bytecode);
        const expected = `((((0n | 1n) + 31n) ^ 31n) & 56n) >> 3n;`;
        assertEquals(actual, expected);
    });

    Deno.test("Test n°3", () => {
        const bytecode = [
            { opcode: 1, operand: 0b00011n }, // input
            { opcode: 0, operand: 0b00011n }, // input mask

            { opcode: 3, operand: 0b00101n },
            { opcode: 2, operand: 0b00100n },
            { opcode: 3, operand: 0b00111n },
            { opcode: 0, operand: 0b10111n },
            { opcode: 2, operand: 0b00010n },
            { opcode: 3, operand: 0b00101n },
            { opcode: 2, operand: 0b00100n },
            { opcode: 4, operand: 0b00001n },
            { opcode: 2, operand: 0b00010n },
            { opcode: 3, operand: 0b00111n },

            { opcode: 8, operand: 3n }, // output shift
            { opcode: 0, operand: 0b00011n }, // output mask
        ];
        const actual = generateJS(bytecode);
        const expected =
            `(((((((((((((0n | 3n) & 3n)` +
            ` + 5n) ^ 4n) + 7n) & 23n)` +
            ` ^ 2n) + 5n) ^ 4n) - 1n)` +
            ` ^ 2n) + 7n) >> 3n) & 3n;`;
        assertEquals(actual, expected);
    });

    Deno.test("Test n°4", () => {
        const bytecode = [
            { opcode: 1, operand: 0b00000_00001_00010_00011n }, // input
            { opcode: 0, operand: 0b00011_00011_0001100011n }, // input mask

            { opcode: 3, operand: 0b00101_00101_00101_00101n },
            { opcode: 2, operand: 0b00100_00100_00100_00100n },
            { opcode: 3, operand: 0b00111_00111_00111_00111n },
            { opcode: 0, operand: 0b10111_10111_10111_10111n },
            { opcode: 2, operand: 0b00010_00010_00010_00010n },
            { opcode: 3, operand: 0b00101_00101_00101_00101n },
            { opcode: 2, operand: 0b00100_00100_00100_00100n },
            { opcode: 4, operand: 0b00001_00001_00001_00001n },
            { opcode: 2, operand: 0b00010_00010_00010_00010n },
            { opcode: 3, operand: 0b00111_00111_00111_00111n },

            { opcode: 8, operand: 3n }, // output shift
            { opcode: 0, operand: 0b00011_00011_00011_00011n }, // output mask
        ];
        const actual = generateJS(bytecode);
        const expected =
            `(((((((((((((0n | 1091n)` +
            ` & 101475n) + 169125n) ^ 135300n)` +
            ` + 236775n) & 777975n) ^ 67650n)` +
            ` + 169125n) ^ 135300n) - 33825n)` +
            ` ^ 67650n) + 236775n) >> 3n) & 101475n;`;
        assertEquals(actual, expected);
    });
}
