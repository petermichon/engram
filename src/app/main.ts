import { generateJS } from "./engram.ts";

export default function main() {
    {
        console.log("Test n°1");
        const bytecode = [
            { opcode: 1, operand: 0b00000001n },
            { opcode: 3, operand: 0b00011111n },
            { opcode: 2, operand: 0b00011111n },
            { opcode: 0, operand: 0b00111000n },
            { opcode: 8, operand: 3n },
        ];
        const program = generateJS(bytecode);
        // console.log(program);
        const result = eval(program);
        // console.log(toBinary(result, 8));
        // console.log("     ^^^");
    }
    {
        console.log("Test n°2");
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
        const program = generateJS(bytecode);
        // console.log(program);
        const result = eval(program);
        // console.log(toBinary(result, 5)); // memory &= 0b00011n;
        // console.log("   ^^");
    }
    {
        console.log("Test n°3");
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
        const program = generateJS(bytecode);
        // console.log(program);
        const result = eval(program);
        // console.log(toBinary(result, 20)); // memory &= 0b00011n;
        // console.log("   ^^   ^^   ^^   ^^");
    }
    {
        console.log("Test n°4");
        const bytecode = [{ opcode: 0, operand: 0n }];
        const program = generateJS(bytecode);
        const result = eval(program);
        // console.log(toBinary(result, 8));
        // console.log("        ");
    }
}

function toBinary(n: bigint, padding = 0): string {
    return n.toString(2).replace("-", "").padStart(padding, "0");
}
