import { getRandomInt } from './math'

/**
 * @description        get random one element in an array
 * @param  {Array} arr
 * @return {Any}
 */
export function getRandomElement<T = any>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

/**
 * @description           get random elements in an array
 * @param  {Array}  arr
 * @param  {number} count
 * @return {Array}
 */
export function getRandomElements(arr: any[], count: number): any[] {
  const ccount = count || getRandomInt(1, arr.length - 1)
  const shuffled = arr.slice(0)
  let i = arr.length
  const min = i - ccount
  let temp
  let index

  while (min < i--) {
    index = Math.floor((i + 1) * Math.random())
    temp = shuffled[index]
    shuffled[index] = shuffled[i]
    shuffled[i] = temp
  }

  return shuffled.slice(min)
}

type CurryFirst<T> = T extends (x: infer U, ...rest: any) => any ? U : never

type CurryRest<T> = T extends (x: infer U) => infer _V
  ? U
  : T extends (x: infer U, ...rest: infer V) => infer W
    ? Curried<(...args: V) => W>
    : never

type Curried<T extends (...args: any) => any> = (
  x: CurryFirst<T>
) => CurryRest<T>

function curry<T extends (...args: any) => any>(fn: T): Curried<T> {
  if (!fn.length) {
    return fn()
  }
  return (arg: CurryFirst<T>): CurryRest<T> =>
    curry(fn.bind(null, arg) as any) as any
}

/**
 * @description    curry concat
 * @return {Array}
 */
export function curryConcat(...args: any[]): any {
  return curry(() => args.reduce((a: any, b: any) => a.concat(b)))
}

/**
 * @description                object array deduplication
 * @param {Array}  arr
 * @param {string} uniqueField the field for deduplicate, default is id
 * @return {Array}
 */
export function objectArrayUnique<T = any>(arr: T[], key = 'id'): T[] {
  const map = new Map()
  return arr.filter((item) => {
    const selfItem = item as any
    return !map.has(selfItem[key]) && map.set(selfItem[key], 1)
  })
}

/**
 * @description          find all fulfilled `cb` indexs in an array
 * @param {Array}    arr
 * @param {Function} cb  callback function, return value should be boolean
 * @return {Array}       index in original array
 */
export function findAllIndex<T = any>(arr: T[], cb: (item: any) => boolean): number[] {
  const ret: number[] = []
  arr.forEach((item, index) => {
    if (cb(item)) {
      ret.push(index)
    }
  })
  return ret
}

/**
 * @description        shuffle the array
 * @param {Array}  arr
 * @return {Array}
 */
export function shuffle(arr: any[]): any[] {
  return arr.sort(() => Math.random() - 0.5)
}

/**
 * @description      intersection
 * @param {Array}  a
 * @param {Array}  b
 * @return {Array}
 */
export function intersect(a: any[], b: any[]): any[] {
  const mySet = new Set(b)
  return a.filter(v => mySet.has(v))
}

/**
 * @description      except, a - b
 * @param {Array}  a
 * @param {Array}  b
 * @return {Array}
 */
export function except(a: any[], b: any[]): any[] {
  const mySet = new Set(b)
  return a.filter(v => !mySet.has(v))
}

/**
 * @description      complement
 * @param {Array}  a
 * @param {Array}  b
 * @return {Array}
 */
export function complement(a: any[], b: any[]): any[] {
  const set1 = new Set(a)
  const set2 = new Set(b)

  return [...a.filter(v => !set2.has(v)), ...b.filter(v => !set1.has(v))]
}
