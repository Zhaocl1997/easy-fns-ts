/**
 * @description         get random int
 * @param  {number} min
 * @param  {number} max
 * @return {number}
 */
export function getRandomInt(min: number, max: number): number {
  const cmin = Math.ceil(min)
  const cmax = Math.floor(max)
  return Math.floor(Math.random() * (cmax - cmin + 1)) + cmin
}

/**
 * @description       generate Fibonacci array
 * @param  {string} n time
 * @return {Array}
 */
export function Fibonacci(times: number): number[] {
  if (times === 0 || times < 0)
    return [0]
  const arr: number[] = []

  function* fib(x: number): Generator<number> {
    let a = 1
    let b = 1
    let n = 0
    while (n <= x) {
      yield a // must have the semicolon
      ;[a, b] = [b, a + b]
      n++
    }
  }

  const gen = fib(times)

  function next(): void {
    const res = gen.next()
    if (res.done) {
      return
    }
    arr.push(res.value)
    next()
  }

  next()

  return arr
}
