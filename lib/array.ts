import { error } from './error'
import { getRandomInt } from './math'

/**
 * @description        get random one element in an array
 * @param  {Array} arr
 * @return {Any}
 */
export const getRandomElement = (arr: any[]): void =>
  arr[Math.floor(Math.random() * arr.length)]

/**
 * @description           get random elements in an array
 * @param  {Array}  arr
 * @param  {Number} count
 * @return {Array}
 */
export const getRandomElements = (arr: any[], count: number): any[] => {
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

type CurryRest<T> = T extends (x: infer U) => infer V
  ? U
  : T extends (x: infer U, ...rest: infer V) => infer W
  ? Curried<(...args: V) => W>
  : never

type Curried<T extends (...args: any) => any> = (
  x: CurryFirst<T>
) => CurryRest<T>

const curry = <T extends (...args: any) => any>(fn: T): Curried<T> => {
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
export const curryConcat = (...args: any[]): any =>
  curry(() => args.reduce((a: any, b: any) => a.concat(b)))

/**
 * @description                object array deduplication
 * @param {Array}  arr
 * @param {String} uniqueField the field for deduplicate, default is id
 * @return {Array}
 */
export const objectArrayUnique = <T = any>(arr: T[], key = 'id'): T[] => {
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
export const findAllIndex = (arr: any[], cb: (item: any) => boolean) => {
  const ret: Array<number> = []
  arr.filter((item, index) => {
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
export const shuffle = (arr: any[]): any[] => {
  return arr.sort(() => Math.random() - 0.5)
}

/**
 * @description      intersection
 * @param {Array}  a
 * @param {Array}  b
 * @return {Array}
 */
export const intersect = (a: any[], b: any[]): any[] => {
  const mySet = new Set(b)
  return a.filter((v) => mySet.has(v))
}

/**
 * @description      except, a - b
 * @param {Array}  a
 * @param {Array}  b
 * @return {Array}
 */
export const except = (a: any[], b: any[]): any[] => {
  if (a.length < b.length) {
    error('Array', 'First arr length must be bigger than the second.')
  }
  const mySet = new Set(b)
  return a.filter((v) => !mySet.has(v))
}

/**
 * @description      complement
 * @param {Array}  a
 * @param {Array}  b
 * @return {Array}
 */
export const complement = (a: any[], b: any[]): any[] => {
  if (a.length < b.length) {
    error('Array', 'First arr length must be bigger than the second.')
  }

  const set1 = new Set(a)
  const set2 = new Set(b)

  return [...a.filter((v) => !set2.has(v)), ...b.filter((v) => !set1.has(v))]
}
