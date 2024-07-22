export function isType(type: string) {
  return (target: any): boolean =>
    `[object ${type}]` === Object.prototype.toString.call(target)
}

export const isNull = isType('Null')
export const isArray = isType('Array')
export const isDate = isType('Date')
export const isRegExp = isType('RegExp')
export const isJSON = isType('JSON')

export function isUndefined(val: any): boolean {
  return typeof val === 'undefined' && isType('Undefined')(val)
}

export function isString(val: any): boolean {
  return typeof val === 'string' && isType('String')(val)
}

export function isNumber(val: any): boolean {
  return typeof val === 'number' && isType('Number')(val)
}

export function isBoolean(val: any): boolean {
  return typeof val === 'boolean' && isType('Boolean')(val)
}

export function isObject(val: any): boolean {
  return typeof val === 'object' && isType('Object')(val)
}

export function isFunction(val: any): boolean {
  return typeof val === 'function' && isType('Function')(val)
}

export const isClient = (): boolean => typeof window !== 'undefined'

export const isServer = (): boolean => typeof window === 'undefined'

export function isWindow(): boolean {
  return typeof window !== 'undefined' && isType('Window')(window)
}
