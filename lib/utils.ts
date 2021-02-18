import { formatTime } from './time';
import { isObject, isArray } from './is'

/**
 * @description         simplely checkout target value is empty or not
 * @param  {String} val 
 * @return {Boolean}    
 */
export const isEmpty = (val: any): boolean => {
  // null or undefined
  if (val === null || val === undefined) return true

  if (typeof val === 'boolean') return false

  if (typeof val === 'number') return !val

  if (val instanceof Error) return val.message === ''

  switch (Object.prototype.toString.call(val)) {
    // String or Array
    case '[object String]':
    case '[object Array]':
      return !val.length

    // Map or Set or File
    case '[object File]':
    case '[object Map]':
    case '[object Set]': {
      return !val.size
    }

    // Plain Object
    case '[object Object]': {
      return !Object.keys(val).length
    }

    default: {
      return true
    }
  }
}

/**
 * @description       simplely compare two target values is equal or not
 * @param  {String} a 
 * @param  {String} b 
 * @return {Boolean}  
 */
export const isEqual = (a: any, b: any): boolean => {
  if (a === b) return true

  // object
  if (
    isObject(a) &&
    isObject(b) &&
    Object.keys(a).length === Object.keys(b).length
  ) {
    for (let i = 0; i < Object.keys(a).length; i++) {
      const key = Object.keys(a)[i]
      if (Object.prototype.hasOwnProperty.call(a, key)) {
        if (!isEqual(a[key], b[key])) {
          // key different
          return false
        }
      }
    }
  }
  // array
  else if (isArray(a) && isArray(a) && a.length === b.length) {
    for (let i = 0, { length } = a; i < length; i++) {
      if (!isEqual(a[i], b[i])) {
        // item different
        return false
      }
    }
  } else {
    // other false
    return false
  }
  return true
}

/**
 * @description                    simplely deep clone an object
 * @param  {Object | Array} target 
 * @return {Object | Array}        
 */
export const deepClone = (target: any): any => {
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
export const deepFreeze = (target: any): any => {
  let prop

  // 首先冻结第一层对象
  Object.freeze(target)

  Object.keys(target).forEach((key) => {
    prop = target[key]
    if (
      !(
        !Object.prototype.hasOwnProperty.call(target, key) ||
        !(isObject(prop)) ||
        Object.isFrozen(prop)
      )
    ) {
      // 跳过原型链上的属性、基本类型和已冻结的对象
      return
    }
    deepFreeze(prop) // 递归调用
  })
}

/**
 * @description                    simplely deep merged two objects
 * @param  {Object | Array} src
 * @param  {Object | Array} target
 * @return {Object | Array}
 */
export const deepMerge = (src: any = {}, target: any = {}): any => {
  const origin = deepClone(src)

  Object.keys(target).forEach((key) => {
    origin[key] =
      origin[key] && origin[key].toString() === '[object Object]'
        ? deepMerge(origin[key], target[key])
        : (origin[key] = target[key])
  })

  return origin
}


/**
 * @description              count age
 * @param  {String} date 
 * @return {Number}          
 */
export const countAge = (date: string | Date): number => {
  const formatedDate = formatTime(date)
  let returnAge
  const birthStrArr = formatedDate.split('-')
  const birthYear = +birthStrArr[0]
  const birthMonth = +birthStrArr[1]
  const birthDay = +birthStrArr[2]

  const d = new Date()
  const nowYear = d.getFullYear()
  const nowMonth = d.getMonth() + 1
  const nowDay = d.getDate()

  if (nowYear === birthYear) {
    returnAge = 0 // 同年 则为0岁
  } else {
    const ageDiff = nowYear - +birthYear // 年之差
    if (ageDiff > 0) {
      if (nowMonth === birthMonth) {
        const dayDiff = nowDay - birthDay // 日之差
        if (dayDiff < 0) {
          returnAge = ageDiff - 1
        } else {
          returnAge = ageDiff
        }
      } else {
        const monthDiff = nowMonth - birthMonth // 月之差
        if (monthDiff < 0) {
          returnAge = ageDiff - 1
        } else {
          returnAge = ageDiff
        }
      }
    } else {
      returnAge = -1 // 返回-1 表示出生日期输入错误 晚于今天
    }
  }

  return returnAge // 返回周岁年龄
}

/**
 * @description           防抖，在事件被触发n秒后再执行回调，如果在这n秒内又被触发，则重新计时。
 * @summary               场景：按钮提交，搜索联想
 * @param  {Function} cb  要防抖的函数
 * @param  {Number} delay 延迟时间
 * @return {Function}
 */
/* export const debounce = (cb: (() => void), delay: number = 500): (() => void) => {
  let timeoutID

  function wrapper() {
    const self = this
    const args = arguments

    function exec() {
      cb.apply(self, args)
    }

    clearTimeout(timeoutID)

    timeoutID = setTimeout(exec, delay)
  }

  return wrapper
}
 */

/**
 * @description                  filter an object by specfic keys
 * @param  {Object}         obj
 * @param  {Array | String} keys string or string array
 * @return {Object}
 */
export const filterObj = (obj: any, keys: Array<string> | string): any => {
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
 * @param  {Array}  uselessKeys
 * @return {Object}
 */
export const omit = (obj: any, uselessKeys: string[]) => {
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
export const deepReplaceKey = (obj: any, replaceKeysMap: any): any => {
  const deep = (obj: any, km: any): any => {
    return Object.fromEntries(Object.entries(obj).map(([key, value]: [string, any]) => {
      const resultKey = km[key] || key

      if (isObject(value)) {
        const newValue = deep(value, km)
        return [resultKey, newValue]
      }

      if (isArray(value)) {
        const arrayLikeObject = deep(value, km)
        const newValue = Object.keys(arrayLikeObject).map(key => arrayLikeObject[key])
        return [resultKey, newValue]
      }

      return [resultKey, value]
    }))
  }

  return deep(obj, replaceKeysMap)

}
