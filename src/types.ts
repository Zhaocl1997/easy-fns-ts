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

/**
 * @description deep keyof
 */
export type DeepKeyOf<T> = T extends object
  ? {
      [K in keyof T & (string | number)]: `${K}` | (T[K] extends object ? `${K}.${DeepKeyOf<T[K]>}` : never)
    }[keyof T & (string | number)]
  : never

/**
 * @description support omit fields on T
 */
export type DeepKeyOfWithOmit<T, C extends string>
  = T extends string | number | boolean | null | undefined | (() => void) ? never
    : T extends Date | { _id: any } ? never
      : T extends Array<infer U> ? DeepKeyOfWithOmit<U, C>
        : T extends object ? {
          [K in keyof Omit<T, C> & string]:
      `${K}` | (DeepKeyOfWithOmit<T[K], C> extends never ? never : `${K}.${DeepKeyOfWithOmit<T[K], C>}`)
        }[keyof Omit<T, C> & string] : never

/**
 * @description path array
 */
export type DeepPathArray<T>
  = T extends object
    ? {
        [K in keyof T]: [K] | [K, ...DeepPathArray<T[K]>]
      }[keyof T]
    : []
