import { isObject, isArray, isString } from './is'

/**
 * @description                    simplely deep clone an object
 * @param  {Object | Array} target
 * @return {Object | Array}
 */
export const easyDeepClone = (target: any): any => {
  const dp = (t: any): any => {
    const tObj: Record<string, any> = t.constructor === Array ? [] : {}

    Object.keys(t).forEach((key) => {
      if (t[key] && isObject(t[key])) {
        tObj[key] = dp(t[key])
      } else {
        tObj[key] = t[key]
      }
    })

    return tObj
  }

  return dp(target)
}

/**
 * @description                    simplely deep freeze an object
 * @param  {Object | Array} target
 * @return {Object | Array}
 */
export const easyDeepFreeze = (target: any): any => {
  let prop

  // 首先冻结第一层对象
  Object.freeze(target)

  Object.keys(target).forEach((key) => {
    prop = target[key]
    if (
      !(
        !Object.prototype.hasOwnProperty.call(target, key) ||
        !isObject(prop) ||
        Object.isFrozen(prop)
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
 * @param  {Object | Array} src
 * @param  {Object | Array} target
 * @return {Object | Array}
 */
export const easyDeepMerge = (src: any = {}, target: any = {}): any => {
  const origin = easyDeepClone(src)

  Object.keys(target).forEach((key) => {
    origin[key] =
      origin[key] && origin[key].toString() === '[object Object]'
        ? easyDeepMerge(origin[key], target[key])
        : (origin[key] = target[key])
  })

  return origin
}

/**
 * @description                  filter an object by specfic keys
 * @param  {Object}         obj
 * @param  {Array | String} keys string or string array
 * @return {Object}
 */
export const easyFilterObj = (obj: any, keys: Array<string> | string): any => {
  const result: any = {}
  if (Array.isArray(keys)) {
    Object.keys(obj)
      .filter((key) => keys.includes(key))
      .forEach((key) => {
        result[key] = obj[key]
      })
  } else {
    Object.keys(obj)
      .filter((key) => key.includes(keys))
      .forEach((key) => {
        result[key] = obj[key]
      })
  }

  return result
}

/**
 * @description                 simple remove unexpected keys on an object
 * @param  {Object} obj
 * @param  {Array|String}  uselessKeys
 * @return {Object}
 */
export const easyOmit = (obj: any, uselessKeys: string[] | string) => {
  return Object.keys(obj).reduce(
    (prev, key) =>
      uselessKeys.includes(key) ? { ...prev } : { ...prev, [key]: obj[key] },
    {}
  )
}

/**
 * @description                    simplely deep replace keys in target object
 * @param  {Object} obj
 * @param  {Array}  replaceKeysMap should be like => { oldKey1: newKey1, oldkey2: newKey2, ...etc }
 * @return {Object}
 */
export const easyDeepReplaceKey = (obj: any, replaceKeysMap: any): any => {
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
            (key) => arrayLikeObject[key]
          )
          return [resultKey, newValue]
        }

        return [resultKey, value]
      })
    )
  }

  return deep(obj, replaceKeysMap)
}

/**
 * @description Easy version polyfill for lodash 'set'.
 */
export const easyDeepSet = (obj: any, prop: any, value: any) => {
  if (isString(prop)) {
    prop = prop.split('.')
  }

  if (prop.length > 1) {
    const e = prop.shift()
    easyDeepSet((obj[e] = isObject(obj[e]) ? obj[e] : {}), prop, value)
  } else obj[prop[0]] = value
}

/**
 * @description Easy version polyfill for lodash 'get'. No support for `key[0].key`
 */
export const easyDeepGet = (
  obj: any,
  path: any = '',
  defaultValue: any = ''
) => {
  return (
    (!isArray(path)
      ? path.replace(/\[/g, '.').replace(/\]/g, '').split('.')
      : path
    ).reduce((o: any, k: any) => (o || {})[k], obj) || defaultValue
  )
}
