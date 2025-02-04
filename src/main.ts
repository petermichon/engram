import { generateJS } from './engram.ts'

export default function main() {
  const bytecode = [
    { opcode: 0, operand: 1 }, // [0] = [1]
    { opcode: 7, operand: 1 }, // [0] += 1
    { opcode: 1, operand: 1 }, // [1] = [0]
  ]
  const size = 2
  const script = generateJS(bytecode, size)

  console.log(script)
}
