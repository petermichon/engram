import { assertEquals } from '@std/assert'
import { generateJS } from './generateJS.ts'

// Some none-exhaustive tests

Deno.test('Test n°1', () => {
  const bytecode: [string, number][] = [
    //
  ]
  const actual = generateJS(bytecode)
  const expected = `return n;`
  assertEquals(actual, expected)
})

Deno.test('Test n°2', () => {
  const bytecode: [string, number][] = [
    ['+', 1],
    //
  ]
  const actual = generateJS(bytecode)
  const expected = `return n + 1;`
  assertEquals(actual, expected)
})

Deno.test('Test n°3', () => {
  const bytecode: [string, number][] = [
    ['|', 1],
    ['+', 31],
    ['^', 31],
    ['&', 56],
    ['>>', 3],
  ]
  const actual = generateJS(bytecode)
  const expected = `return ((((n | 1) + 31) ^ 31) & 56) >> 3;`
  assertEquals(actual, expected)
})

Deno.test('Test n°3', () => {
  const bytecode: [string, number][] = [
    ['&', 0],
    ['|', 0],
    ['^', 0],
    ['<<', 0],
    ['>>', 0],
    ['>>>', 0],
    ['+', 0],
    ['-', 0],
    ['*', 0],
    ['/', 0],
    ['%', 0],
    ['**', 0],
  ]
  const actual = generateJS(bytecode)
  const expected = `return (((((((((((n & 0) | 0) ^ 0) << 0) >> 0) >>> 0) + 0) - 0) * 0) / 0) % 0) ** 0;`
  assertEquals(actual, expected)
})
