import { formatTime } from './time'
import { isArray, isObject } from './is'

/**
 * @description         simplely checkout target value is empty or not
 * @param  {string} val
 * @return {boolean}
 */
export function easyIsEmpty(val: any): boolean {
  // null or undefined
  if (val === null || val === undefined)
    return true

  if (typeof val === 'boolean')
    return false

  if (typeof val === 'number')
    return !val

  if (val instanceof Error)
    return val.message === ''

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
 * @param  {string} a
 * @param  {string} b
 * @return {boolean}
 */
export function easyIsEqual(a: any, b: any): boolean {
  if (a === b)
    return true

  // object
  if (
    isObject(a)
    && isObject(b)
    && Object.keys(a).length === Object.keys(b).length
  ) {
    for (let i = 0; i < Object.keys(a).length; i++) {
      const key = Object.keys(a)[i]
      if (Object.prototype.hasOwnProperty.call(a, key)) {
        if (!easyIsEqual(a[key], b[key])) {
          // key different
          return false
        }
      }
    }
  }
  // array
  else if (isArray(a) && isArray(b) && a.length === b.length) {
    for (let i = 0, { length } = a; i < length; i++) {
      if (!easyIsEqual(a[i], b[i])) {
        // item different
        return false
      }
    }
  }
  else {
    // other false
    return false
  }
  return true
}

/**
 * @description              count age
 * @param  {string} date
 * @return {number}
 */
export function countAge(date: string | Date): number {
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
  }
  else {
    const ageDiff = nowYear - +birthYear // 年之差
    if (ageDiff > 0) {
      if (nowMonth === birthMonth) {
        const dayDiff = nowDay - birthDay // 日之差
        if (dayDiff < 0) {
          returnAge = ageDiff - 1
        }
        else {
          returnAge = ageDiff
        }
      }
      else {
        const monthDiff = nowMonth - birthMonth // 月之差
        if (monthDiff < 0) {
          returnAge = ageDiff - 1
        }
        else {
          returnAge = ageDiff
        }
      }
    }
    else {
      returnAge = -1 // 返回-1 表示出生日期输入错误 晚于今天
    }
  }

  return returnAge // 返回周岁年龄
}

/**
 * @description           防抖，在事件被触发n秒后再执行回调，如果在这n秒内又被触发，则重新计时。
 * @summary               场景：按钮提交，搜索联想
 * @param  {Function} cb  要防抖的函数
 * @param  {number} delay 延迟时间
 * @return {Function}
 */
export function easyDebounce(cb: () => void, delay = 500): (() => void) {
  let timeoutID: NodeJS.Timeout

  function wrapper(this: any, ...args: any[]): void {
    const self = this
    const _args: any = args

    function exec(): void {
      cb.apply(self, _args)
    }

    clearTimeout(timeoutID)

    timeoutID = setTimeout(exec, delay)
  }

  return wrapper
}

/**
 *  整个代码的逻辑十分清晰，一共只有三步：
 *  1.计算距离最近一次函数执行后经过的时间 elapsed，并清除之前设置的计时器。
 *  2.如果经过的时间大于设置的时间间隔 delay，那么立即执行函数，并更新最近一次*函数的执行时间。
 *  3.如果经过的时间小于设置的时间间隔 delay，那么通过 setTimeout 设置一个计数器，让函数在 delay - elapsed 时间后执行。
 */
// 节流
// 规定在一个单位时间内，只能触发一次函数
// 场景：拖拽，缩放，动画
export function easyThrottle(cb: () => void, delay = 500): (() => void) {
  let timeoutID: NodeJS.Timeout
  let lastExec = 0

  function wrapper(this: any, ...args: any[]): void {
    const self = this
    const elapsed = Number(new Date()) - lastExec
    const _args: any = args

    function exec(): void {
      lastExec = Number(new Date())
      cb.apply(self, _args)
    }

    clearTimeout(timeoutID)

    if (elapsed > delay) {
      exec()
    }
    else {
      timeoutID = setTimeout(exec, delay - elapsed)
    }
  }

  return wrapper
}
