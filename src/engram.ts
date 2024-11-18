type Bytecode = { opcode: number; operand: bigint }[];

const OperatorsJS = ["&", "|", "^", "+", "-", "*", "/", "<<", ">>", "%", "**"];

/**
 * Generates a JavaScript script from a bytecode.
 * @param bytecode The bytecode used for generating the JavaScript script.
 * It must be of type `{ opcode: number, operand: bigint }[]`.
 * With an empty bytecode, the script will only contains the value `0n`.
 * @returns The JavaScript script generated from the bytecode
 */
export function generateJS(bytecode: Bytecode): string {
    const lines = new Array<Array<string>>();
    {
        const first = 0;
        let current = 1;
        const last = bytecode.length;

        lines[first] = [];

        for (const instruction of bytecode) {
            const opcode = OperatorsJS[instruction.opcode];
            const operand = instruction.operand.toString();
            lines[current] = [" ", opcode, " ", operand, "n", ")"];

            lines[first].push("(");
            current += 1;
        }

        {
            // This block of code is not necessary for the script to work
            lines[first].pop(); // remove unnecessary "("
            lines[last].pop(); // remove unnecessary ")"
            lines[last].push(";");
        }

        // Add inital value
        lines[first].push("0", "n");
    }

    const script = lines.flat().join("");

    return script;
}
