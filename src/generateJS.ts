/**
 * A simple code generator for in-place computation.
 * It generates in-place algorithms from an intermediate representation
 * bytecode.
 * Currently, only JavaScript is supported as a target code.
 * @module
 */

/**
 * Generates a JavaScript script from a bytecode.
 * @param bytecode The bytecode used for generating the JavaScript script.
 * @returns The JavaScript script generated from the bytecode
 */
function generateJS(bytecode: [string, number][]): string {
  let script = 'n'

  for (const operation of bytecode) {
    script = `(${script} ${operation[0]} ${operation[1]})`
  }

  // remove extra parentheses
  if (bytecode.length > 0) {
    script = script.slice(1, script.length - 1)
  }

  script = `return ${script};`

  return script
}

export { generateJS }
