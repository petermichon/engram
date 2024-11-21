/**
 * This module contains functions to generate in-place algorithms from an
 * intermediate representation bytecode. Currently, only JavaScript is
 * supported as a target code.
 * @module
 */

type Bytecode = { opcode: number; operand: number }[];

const Operators = [
    "", // [0] = [n]
    "", // [n] = [0]
    "&", // [0] &= n
    "|", // [0] |= n
    "^", // [0] ^= n
    "<<", // [0] <<= n
    ">>", // [0] >>= n
    "+", // [0] += n
    "-", // [0] -= n
    "*", // [0] *= n
    "/", // [0] /= n
    "%", // [0] %= n
    "**", // [0] **= n
];

/**
 * Generates a JavaScript script from a bytecode.
 * @param bytecode The bytecode used for generating the JavaScript script.
 * It is of type `{ opcode: number, operand: number }[]`.
 * @param size The amount of 32 bits memory words allocated by the script.
 * @returns The JavaScript script generated from the bytecode
 */
export function generateJS(bytecode: Bytecode, size: number): string {
    const lines = new Array<Array<string>>();
    {
        const first = 0;
        let current = 1;

        lines[first] = [`const w = new Uint32Array(${size});\n`];

        for (const instruction of bytecode) {
            let word = `w[0]`;
            const operator = Operators[instruction.opcode];
            let operand = instruction.operand.toString();

            if (instruction.opcode === 0) {
                operand = `w[${operand}]`;
            }

            if (instruction.opcode == 1) {
                word = `w[${operand}]`;
                operand = `w[0]`;
            }

            lines[current] = [`${word} ${operator}= ${operand};\n`];

            current += 1;
        }

        const last = bytecode.length + 1;
        lines[last] = ["w;\n"];
    }

    const script = lines.flat().join("");

    return script;
}
