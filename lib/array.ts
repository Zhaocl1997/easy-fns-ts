import { getRandomInt } from './math';

/**
 * @description        获取数组随意一项
 * @param  {Array} arr 目标数组
 * @return {Any}       目标数组的一项
 */
export const getRandomElement = (arr: Array<unknown>): unknown => arr[Math.floor(Math.random() * arr.length)];

/**
 * @description           获取数组随机多项
 * @param  {Array} arr    目标数组
 * @param  {Number} count 想要获取的项目数量，默认目标数组长度
 * @return {Array}        目标数组的多项
 */
export const getRandomElements = (
  arr: Array<unknown>,
  count: number,
): Array<unknown> => {
  const ccount = count || getRandomInt(1, arr.length - 1);
  const shuffled = arr.slice(0);
  let i = arr.length;
  const min = i - ccount;
  let temp;
  let index;

  while (min < i--) {
    index = Math.floor((i + 1) * Math.random());
    temp = shuffled[index];
    shuffled[index] = shuffled[i];
    shuffled[i] = temp;
  }

  return shuffled.slice(min);
};

type CurryFirst<T> = T extends (x: infer U, ...rest: any) => any ? U : never;

type CurryRest<T> = T extends (x: infer U) => infer V
  ? U
  : T extends (x: infer U, ...rest: infer V) => infer W
  ? Curried<(...args: V) => W>
  : never;

type Curried<T extends (...args: any) => any> = (
  x: CurryFirst<T>
) => CurryRest<T>;

const curry = <T extends (...args: any) => any>(fn: T): Curried<T> => {
  if (!fn.length) {
    return fn();
  }
  return (arg: CurryFirst<T>): CurryRest<T> => curry(fn.bind(null, arg) as any) as any;
};

/**
 * @description    柯里化concat
 * @return {Array}
 */
export const curryConcat = (...args: any[]): any => curry(() => args.reduce((a: any, b: any) => a.concat(b)));

/**
 * @description                对象数组去重
 * @param {Array} arr          目标数组
 * @param {String} uniqueField 去重根据字段key值，默认id
 * @return {Array}
 */
export const objectArrayUnique = <T = any>(arr: T[], key = 'id'): T[] => {
  const map = new Map();
  return arr.filter((item) => {
    const selfItem = item as any;
    return !map.has(selfItem[key]) && map.set(selfItem[key], 1);
  });
}

/**
 * @description          寻找一个数组内符合条件的所有索引
 * @param {Array}    arr 目标数组
 * @param {Function} cb  回调函数，返回值需为boolean
 * @return {Array}       在原数组中的索引数组
 */
export const findAllIndex = (arr: Array<any>, cb: (item: any) => boolean) => {
  const ret: Array<number> = [];
  arr.filter((item, index) => {
    if (cb(item)) {
      ret.push(index);
    }
  });
  return ret;
}