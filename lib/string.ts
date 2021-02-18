function selfEval(fn: string) {
  const Fn = Function
  return new Fn(`return ${fn}`)()
}

/**
 * @description          line to camel
 * @param  {String} str  
 * @param  {String} type default `-`
 * @return {String}
 */
export const line2Camel = (str: string, type = '-'): string =>
  str.replace(selfEval(`/\\${type}(\\w)/g`), (all, letter) =>
    letter.toUpperCase()
  )

/**
 * @description          camel to line
 * @param  {String} str  
 * @param  {String} type default `-`
 * @return {String}
 */
export const camel2Line = (str: string, type = '-'): string =>
  str.replace(/([A-Z])/g, `${type}$1`).toLowerCase()

/**
 * @description         remove the space aside
 * @param  {String} str 
 * @return {String}
 */
export const trimSpaceAside = (str: string): string =>
  (str || '').replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, '')

/**
 * @description         check for the strength of the string
 * @param  {String} str 
 * @return {Number}     1 to 4, 4 means strongest
 */
export const checkStrStrong = (str: string): number => {
  let modes = 0

  if (str.length < 3) return modes
  if (/\d/.test(str)) modes++ // number
  if (/[a-z]/.test(str)) modes++ // lower
  if (/[A-Z]/.test(str)) modes++ // upper
  if (/\W/.test(str)) modes++ // special

  switch (modes) {
    case 1:
      return 1
    case 2:
      return 2
    case 3:
    case 4:
      return str.length < 12 ? 3 : 4
    /* istanbul ignore next */
    default:
      return 1
  }
}

/**
 * @author Zhaocl1997   (https://github.com/Zhaocl1997)
 * @description         forced remove some unexpected characters
 * @param  {String} str 
 * @param  {Array}  arr unexpected string array
 * @return {String}     
 * @example             clearIllegalChars("a|b/c", ["|", "/"]) => "abc"
 */
export const clearIllegalChars = (str: string, arr: Array<string>): string => {
  let newStr = str
  for (let i = 0; i < arr.length; i++) {
    if (str.indexOf(arr[i]) !== -1) {
      const regexp = `/\\${arr[i]}/g`
      newStr = newStr.replace(selfEval(regexp), '')
    }
  }
  return newStr
}

interface RegexTemplate {
  number: string
  letter: string
  chinese: string
}

enum AllowedInputTypeEnum {
  NUMBER = 'number',
  LETTER = 'letter',
  CHINESE = 'chinese',
}

/**
 * @author Zhaocl1997    (https://github.com/Zhaocl1997)
 * @description          limit the input type
 * @param  {String} str  
 * @param  {String} type ["number", "letter", "chinese"] only support for one in the array
 * @return {String}
 * @example              clearUnexpectedChars("123abc啊啊啊", "number") => "123"
 * @example              clearUnexpectedChars("123abc啊啊啊", "letter") => "abc"
 * @example              clearUnexpectedChars("123abc啊啊啊", "chinese") => "啊啊啊"
 */
export const clearUnexpectedChars = (
  str: string,
  type: AllowedInputTypeEnum = AllowedInputTypeEnum.NUMBER
): string => {
  const reverseRegex = (v: string) => `/${v}/g`

  const regexTemplate: RegexTemplate = {
    number: '[^0-9-.]',
    letter: '[^A-Za-z]',
    chinese: '[^\u4e00-\u9fa5]',
  }

  return str.replace(selfEval(reverseRegex(regexTemplate[type])), '')
}

/**
 * @description         upper first character
 * @param  {String} arr 
 * @return {String}     
 */
export const upperFirst = (str: string): string => {
  return str.substr(0, 1).toLocaleUpperCase() + str.substr(1, str.length)
}

/**
 * @description         lower first character
 * @param  {String} arr 
 * @return {String}     
 */
export const lowerFirst = (str: string): string => {
  return str.substr(0, 1).toLocaleLowerCase() + str.substr(1, str.length)
}
