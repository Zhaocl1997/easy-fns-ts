import { isObject, isArray } from './is';
import { e } from './error';

/**
 * @description         检查是否为空(伪)
 * @param  {String} val 目标值
 * @return {Boolean}    true为空，false为不空
 */
export const isEmpty = (val: any): boolean => {
  // null or undefined
  if (val === null || val === undefined) return true;

  if (typeof val === 'boolean') return false;

  if (typeof val === 'number') return !val;

  if (val instanceof Error) return val.message === '';

  switch (Object.prototype.toString.call(val)) {
    // String or Array
    case '[object String]':
    case '[object Array]':
      return !val.length;

    // Map or Set or File
    case '[object File]':
    case '[object Map]':
    case '[object Set]': {
      return !val.size;
    }

    // Plain Object
    case '[object Object]': {
      return !Object.keys(val).length;
    }

    default: {
      return true;
    }
  }
};

/**
 * @description       比较两值是否相等(伪)
 * @param  {String} a 目标a
 * @param  {String} b 目标b
 * @return {Boolean}  true为相等，false为不等
 */
export const isEqual = (a: any, b: any): boolean => {
  if (a === b) return true;

  // object
  if (isObject(a) && isObject(b)
    && Object.keys(a).length === Object.keys(b).length) {
    for (let i = 0; i < Object.keys(a).length; i++) {
      const key = Object.keys(a)[i];
      if (Object.prototype.hasOwnProperty.call(a, key)) {
        if (!isEqual(a[key], b[key])) {
          // key different
          return false;
        }
      }
    }
  } else
  // array
  if (isArray(a) && isArray(a) && a.length === b.length) {
    for (let i = 0, { length } = a; i < length; i++) {
      if (!isEqual(a[i], b[i])) {
        // item different
        return false;
      }
    }
  } else {
    // other false
    return false;
  }
  return true;
};

/**
 * @description                    深克隆(伪)
 * @param  {Object | Array} target 目标参数
 * @return {Object | Array}        深克隆完的对象或数组
 */
export const deepClone = (target: any): any => {
  const dp = (t: any): any => {
    const tObj: Record<string, any> = t.constructor === Array ? [] : {};

    Object.keys(t).forEach((key) => {
      if (t[key] && typeof t[key] === 'object') {
        tObj[key] = dp(t[key]);
      } else {
        tObj[key] = t[key];
      }
    });

    return tObj;
  };

  return dp(target);
};

/**
 * @description                    深冻结(伪)
 * @param  {Object | Array} target 目标参数
 * @return {Object | Array}        深冻结完的对象或数组
 */
export const deepFreeze = (target: any): any => {
  let prop;

  // 首先冻结第一层对象
  Object.freeze(target);

  Object.keys(target).forEach((key) => {
    prop = target[key];
    if (!(!Object.prototype.hasOwnProperty.call(target, key)
      || !(typeof prop === 'object')
      || Object.isFrozen(prop))) {
      // 跳过原型链上的属性、基本类型和已冻结的对象
      return;
    }
    deepFreeze(prop); // 递归调用
  });
};

/**
 * @description                    深合并(伪)
 * @param  {Object | Array} src
 * @param  {Object | Array} target
 * @return {Object | Array}
 */
export const deepMerge = (src: any, target: any): any => {
  const origin = deepClone(src);

  Object.keys(target).forEach((key) => {
    origin[key] = origin[key] && origin[key].toString() === '[object Object]'
      ? deepMerge(origin[key], target[key])
      : (origin[key] = target[key]);
  });

  return origin;
};

/**
 * @description             百分比转化为RGB颜色
 * @param  {Number} percent 百分比数字 不能超过100小于0
 * @return {String}         rgb字符串
 */
export const percentToRGB = (percent: number): string => {
  if (percent > 100 || percent < 0) {
    e('utils', 'Percent should be in [0, 100]');
  }

  let r;
  let g;
  const b = 0;

  if (percent < 50) {
    // green to yellow
    r = Math.floor(255 * (percent / 50));
    g = 255;
  } else {
    // yellow to red
    r = 255;
    g = Math.floor(255 * ((50 - (percent % 50)) / 50));
  }

  return `rgb(${r}, ${g}, ${b})`;
};

/**
 * @description              计算年龄
 * @param  {String} birthStr 字符串日期，类似于 2020-10-20
 * @return {Number}          年龄
 */
export const countAge = (birthStr: string): number => {
  let returnAge;
  const birthStrArr = birthStr.split('-');
  const birthYear = +birthStrArr[0];
  const birthMonth = +birthStrArr[1];
  const birthDay = +birthStrArr[2];

  const d = new Date();
  const nowYear = d.getFullYear();
  const nowMonth = d.getMonth() + 1;
  const nowDay = d.getDate();

  if (nowYear === birthYear) {
    returnAge = 0; // 同年 则为0岁
  } else {
    const ageDiff = nowYear - +birthYear; // 年之差
    if (ageDiff > 0) {
      if (nowMonth === birthMonth) {
        const dayDiff = nowDay - birthDay; // 日之差
        if (dayDiff < 0) {
          returnAge = ageDiff - 1;
        } else {
          returnAge = ageDiff;
        }
      } else {
        const monthDiff = nowMonth - birthMonth; // 月之差
        if (monthDiff < 0) {
          returnAge = ageDiff - 1;
        } else {
          returnAge = ageDiff;
        }
      }
    } else {
      returnAge = -1; // 返回-1 表示出生日期输入错误 晚于今天
    }
  }

  return returnAge; // 返回周岁年龄
};

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
 * @description                 对象字段过滤，支持模糊过滤字段
 * @param  {Object}         obj
 * @param  {Array | String} arr 字符串字段数组，或者是字符串
 * @return {Object}
 */
export const filterObj = (obj: any, keys: Array<string> | string): any => {
  const result: any = {};
  if (Array.isArray(keys)) {
    Object.keys(obj).filter((key) => keys.includes(key)).forEach((key) => {
      result[key] = obj[key];
    });
  } else {
    Object.keys(obj).filter((key) => key.includes(keys)).forEach((key) => {
      result[key] = obj[key];
    });
  }

  return result;
};
