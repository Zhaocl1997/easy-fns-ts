export const isType = (type: string) => (target: string | Window):boolean => `[object ${type}]` === Object.prototype.toString.call(target);

export const isNull = isType('Null');
export const isArray = isType('Array');
export const isDate = isType('Date');
export const isRegExp = isType('RegExp');
export const isJSON = isType('JSON');

export const isUndefined = (val: string): boolean => typeof val === 'undefined' && isType('Undefined')(val);

export const isString = (val: string): boolean => typeof val === 'string' && isType('String')(val);

export const isNumber = (val: string): boolean => typeof val === 'number' && isType('Number')(val);

export const isBoolean = (val: string): boolean => typeof val === 'boolean' && isType('Boolean')(val);

export const isObject = (val: string): boolean => typeof val === 'object' && isType('Object')(val);

export const isFunction = (val: string): boolean => typeof val === 'function' && isType('Function')(val);

export const isClient = (): boolean => typeof window !== 'undefined';

export const isServer = (): boolean => typeof window === 'undefined';

export const isWindow = (): boolean => typeof window !== 'undefined' && isType('Window')(window);
