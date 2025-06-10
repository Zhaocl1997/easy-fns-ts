/**
 * @description may be null
 */
export type Nullable<T> = T | null

/**
 * @description string / number
 */
export type StringOrNumber = string | number

/**
 * @description string / number / boolean
 */
export type BaseDataType = StringOrNumber | boolean

/**
 * @description v-for index type
 */
export type IndexType = StringOrNumber | symbol

/**
 * @description type usage for const
 */
export type ValueOf<T> = T[keyof T]

/**
 * @description function type
 */
export interface Fn<T = any, R = T> {
  (...arg: T[]): R
}

/**
 * @description promise function type
 */
export type PromiseFn<T = any> = (args?: T) => Promise<void>

/**
 * @description is primitive type
 */
export type IsPrimitive<T>
  = T extends string | number | boolean | null | undefined | symbol | bigint ? true : false

/**
 * @description is function
 */
export type IsFunction<T> = T extends Fn ? true : false

/**
 * @description no distrubute
 */
export type NoDistribute<T> = [T] extends [unknown] ? T : never

/**
 * @description recordable
 */
export type Recordable<T = any> = Record<string, T>

/**
 * @description Used for components with `options` API.
 * Default value field is `value` and label field is `label`
 *
 * @example
 * Default: const options1: OptionDataItem[] = [{ value: 'foo', label: 'bar' }]
 * Custom:  const options2: OptionDataItem<'value1', 'label1'>[] = [{ value1: 'foo', label1: 'bar' }]
 */
export type OptionDataItem<
  E extends Record<string, any> = any,
  V extends string = 'value',
  L extends string = 'label',
> = Record<V, BaseDataType> & Record<L, string> & Partial<E>

/**
 * @description Filter wanted type fields, return field union type
 *
 * @example
 * interface Thing {
 *   id: string;
 *   price: number;
 *   other: { stuff: boolean };
 *   test: string
 * }
 *
 * KeysMatching<Thing, string>  =====>  'id' | 'test'
 *
 */
export type KeysMatching<T, V> = {
  [K in keyof T]-?: T[K] extends V ? K : never
}[keyof T]

// 限制最大递归深度为 5 层
type MaxDepth = 5

// 数字操作辅助类型
type BuildTuple<L extends number, T extends any[] = []> = T['length'] extends L
  ? T
  : BuildTuple<L, [...T, any]>

type Subtract<A extends number, B extends number>
  = BuildTuple<A> extends [...BuildTuple<B>, ...infer R]
    ? R['length']
    : 0

// 字符串路径是否以指定前缀开头
type StartsWith<Path extends string, Prefix extends string>
  = Path extends `${Prefix}${infer _}` ? true : false

// 检查路径是否应该被排除
type ShouldOmit<Path extends string, OmitPaths extends string[]>
  = OmitPaths extends [infer First extends string, ...infer Rest extends string[]]
    ? StartsWith<Path, First> extends true
      ? true
      : ShouldOmit<Path, Rest>
    : false

/**
 * @description support omit fields on T
 */
export type DeepKeyOf<T, Depth extends number = MaxDepth>
  = Depth extends 0
    ? never
    : T extends Date | Fn | string | number | boolean | null | undefined
      ? never
      : T extends object
        ? { [K in keyof T & (string | number)]: K | `${K}${T[K] extends object ? `.${DeepKeyOf<T[K], Subtract<Depth, 1>>}` : ''}` }[keyof T & (string | number)]
        : never

/**
 * @description support omit fields on T
 */
export type DeepKeyOfWithOmit<
  T,
  OmitPaths extends string[] = [],
  Depth extends number = MaxDepth,
> = Depth extends 0
  ? never
  : T extends Date | Fn | string | number | boolean | null | undefined
    ? never
    : T extends object
      ? {
          [K in keyof T & (string | number)]:
          ShouldOmit<`${K}`, OmitPaths> extends true
            ? never
            : K | `${K}${T[K] extends object ? `.${DeepKeyOfWithOmit<T[K], OmitPaths, Subtract<Depth, 1>>}` : ''}`
        }[keyof T & (string | number)]
      : never

/**
 * @description path array
 */
export type DeepPathArray<T>
  = T extends object
    ? {
        [K in keyof T]: [K] | [K, ...DeepPathArray<T[K]>]
      }[keyof T]
    : []
