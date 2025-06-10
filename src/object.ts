import type { DeepKeyOf } from './types'
import { isArray, isNull, isObject, isString, isUndefined } from './is'
import { easyIsEmpty } from './utils'

/**
 * @description                    simplely deep clone an object
 * @param  {object | Array} target
 * @return {object | Array}
 */
export function easyDeepClone<T = any>(target: T): T {
  const dp = (t: any): any => {
    const tObj: Record<string, any> = t.constructor === Array ? [] : {}

    Object.keys(t).forEach((key) => {
      if (t[key] && isObject(t[key])) {
        tObj[key] = dp(t[key])
      }
      else {
        tObj[key] = t[key]
      }
    })

    return tObj
  }

  return dp(target)
}

/**
 * @description                    simplely deep freeze an object
 * @param  {object | Array} target
 * @return {object | Array}
 */
export function easyDeepFreeze(target: any): any {
  let prop

  // 首先冻结第一层对象
  Object.freeze(target)

  Object.keys(target).forEach((key) => {
    prop = target[key]
    if (
      !(
        !Object.prototype.hasOwnProperty.call(target, key)
        || !isObject(prop)
        || Object.isFrozen(prop)
      )
    ) {
      // 跳过原型链上的属性、基本类型和已冻结的对象
      return
    }
    easyDeepFreeze(prop) // 递归调用
  })
}

/**
 * @description                    simplely deep merged two objects
 * @param  {object | Array} src
 * @param  {object | Array} target
 * @return {object | Array}
 */
export function easyDeepMerge<T = any>(src: any, target: any): T | undefined {
  if (easyIsEmpty(src) || easyIsEmpty(target))
    return

  const origin = easyDeepClone<typeof src>(src)

  Object.keys(target).forEach((key) => {
    origin[key]
      = origin[key] && origin[key].toString() === '[object Object]'
        ? easyDeepMerge(origin[key], target[key])
        : (origin[key] = target[key])
  })

  return origin
}

/**
 * @description                  filter an object by specfic keys
 * @param  {object}         obj
 * @param  {Array | string} keys string or string array
 * @return {object}
 */
export function easyFilterObj(obj: any, keys: Array<string> | string): any {
  const result: any = {}
  if (Array.isArray(keys)) {
    Object.keys(obj)
      .filter(key => keys.includes(key))
      .forEach((key) => {
        result[key] = obj[key]
      })
  }
  else {
    Object.keys(obj)
      .filter(key => key.includes(keys))
      .forEach((key) => {
        result[key] = obj[key]
      })
  }

  return result
}

/**
 * @description                 simple remove unexpected keys on an object
 * @param  {object} obj
 * @param  {Array | string}  uselessKeys
 * @return {object}
 */
export function easyOmit<T extends object, K extends string[]>(obj: T, uselessKeys: K): Pick<T, Exclude<keyof T, K[number]>> {
  return Object.keys(obj).reduce(
    (prev, key) =>
      uselessKeys.includes(key) ? { ...prev } : { ...prev, [key]: obj[key] },
    {} as Pick<T, Exclude<keyof T, K[number]>>,
  )
}

/**
 * @description                    simplely deep replace keys in target object
 * @param  {object} obj
 * @param  {Array}  replaceKeysMap should be like => { oldKey1: newKey1, oldkey2: newKey2, ...etc }
 * @return {object}
 */
export function easyDeepReplaceKey(obj: any, replaceKeysMap: any): any {
  const deep = (obj: any, km: any): any => {
    return Object.fromEntries(
      Object.entries(obj).map(([key, value]: [string, any]) => {
        const resultKey = km[key] || key

        if (isObject(value)) {
          const newValue = deep(value, km)
          return [resultKey, newValue]
        }

        if (isArray(value)) {
          const arrayLikeObject = deep(value, km)
          const newValue = Object.keys(arrayLikeObject).map(
            key => arrayLikeObject[key],
          )
          return [resultKey, newValue]
        }

        return [resultKey, value]
      }),
    )
  }

  return deep(obj, replaceKeysMap)
}

/**
 * @description Easy version polyfill for lodash 'set'.
 */
export function easyDeepSet<T extends object>(obj: T, prop: string | string[], value: any): void {
  if (isString(prop)) {
    prop = (prop as string).split('.')
  }

  if (prop.length > 1) {
    const e = (prop as string[]).shift()!
    easyDeepSet((obj[e] = isObject(obj[e]) ? obj[e] : {}), prop, value)
  }
  else {
    obj[prop[0]] = value
  }
}

/**
 * @description Easy version polyfill for lodash 'get'. No support for `key[0].key`
 */
export function easyDeepGet<T extends object>(obj: T, path: string | string[], defaultValue?: any): T {
  return (
    ((!isArray(path)
      ? (path as string).replace(/\[/g, '.').replace(/\]/g, '').split('.')
      : path
    ) as string[]).reduce((o: any, k: any) => (o || {})[k], obj) ?? defaultValue
  )
}

/**
 * @description filter obj ''/null/undefined/{}/[] value, change origin object
 */
export function easyFilterEmptyValue(object: Record<string, any>): Record<string, any> {
  Object.entries(object).forEach(([k, v]) => {
    if (v && isObject(v))
      easyFilterEmptyValue(v)
    if (
      (v && isObject(v) && !Object.keys(v).length)
      || isNull(v)
      || isUndefined(v)
      || v.length === 0
    ) {
      if (Array.isArray(object))
        object.splice(k as unknown as number, 1)
      else if (!(v instanceof Date))
        delete object[k]
    }
  })
  return object
}

/**
 * @description transform "true"/"false" to true/false, change origin object
 */
export function easyTransformObjectStringBoolean(object: Record<string, any>): Record<string, any> {
  Object.entries(object).forEach(([k, v]) => {
    if (v && isObject(v))
      easyTransformObjectStringBoolean(v)
    if (v === 'true')
      object[k] = true
    if (v === 'false')
      object[k] = false
  })
  return object
}

/**
 * @description easy get nested field in object, only support `a.b.c`
 */
export function easyObjectGet<T extends object, P extends DeepKeyOf<T>>(obj: T, path: P, defaultValue = undefined): string | boolean | number | undefined | T {
  const pathArray = String(path).split('.').filter(segment => segment !== '') as string[]

  let result = obj
  for (const segment of pathArray) {
    if (result === null || result === undefined) {
      return defaultValue
    }
    result = result[segment]
  }

  return result !== undefined ? result : defaultValue
}
