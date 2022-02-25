export const isType =
  (type: string) =>
  (target: any): boolean =>
    `[object ${type}]` === Object.prototype.toString.call(target)

export const isNull = isType('Null')
export const isArray = isType('Array')
export const isDate = isType('Date')
export const isRegExp = isType('RegExp')
export const isJSON = isType('JSON')

export const isUndefined = (val: any): boolean =>
  typeof val === 'undefined' && isType('Undefined')(val)

export const isString = (val: any): boolean =>
  typeof val === 'string' && isType('String')(val)

export const isNumber = (val: any): boolean =>
  typeof val === 'number' && isType('Number')(val)

export const isBoolean = (val: any): boolean =>
  typeof val === 'boolean' && isType('Boolean')(val)

export const isObject = (val: any): boolean =>
  typeof val === 'object' && isType('Object')(val)

export const isFunction = (val: any): boolean =>
  typeof val === 'function' && isType('Function')(val)

export const isClient = (): boolean => typeof window !== 'undefined'

export const isServer = (): boolean => typeof window === 'undefined'

export const isWindow = (): boolean =>
  typeof window !== 'undefined' && isType('Window')(window)
