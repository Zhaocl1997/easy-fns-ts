/**
 * @description         获取一个区间内的随机整数
 * @param  {Number} min 最小整数值
 * @param  {Number} max 最大整数值
 * @return {Number}
 */
export const getRandomInt = (min: number, max: number): number => {
  const cmin = Math.ceil(min)
  const cmax = Math.floor(max)
  return Math.floor(Math.random() * (cmax - cmin + 1)) + cmin
}

/**
 * @description       生成斐波那契数组
 * @param  {String} n 次数
 * @return {Array}    斐波那契数组
 */
export const Fibonacci = (times: number): Array<number> => {
  if (times === 0 || times < 0) return [0]
  const arr: Array<number> = []

  function* fib(x: number) {
    let a = 1
    let b = 1
    let n = 0
    while (n <= x) {
      yield a // 这个分号一定要有
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
