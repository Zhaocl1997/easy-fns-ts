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
  L extends string = 'label'
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
