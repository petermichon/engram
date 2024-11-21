import { generateJS } from "./engram.ts";

function main() {
    {
        const bytecode = [
            { opcode: 0, operand: 1 }, // [0] = [1]
            { opcode: 7, operand: 1 }, // [0] += 1
            { opcode: 1, operand: 1 }, // [1] = [0]
        ];
        const script = generateJS(bytecode, 4);
        console.log(script);
        console.log(eval(script).toString());
    }
}

main();
