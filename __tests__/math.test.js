const { getRandomInt, Fibonacci } = require('../dist/lib')

describe('math utils', () => {
  test('get random int', () => {
    expect(getRandomInt(10, 20)).toBeGreaterThanOrEqual(10)
    expect(getRandomInt(10, 20)).toBeLessThanOrEqual(20)
  })

  test('Fibonacci array', () => {
    expect(Fibonacci(8)).toEqual([1, 1, 2, 3, 5, 8, 13, 21, 34])
  })
})
