/* eslint no-eval: 0 */
/* eslint no-plusplus: 0 */
/**
 * @description          划线转换驼峰
 * @param  {String} str  目标字符串
 * @param  {String} type 转换格式，默认-
 * @return {String}
 */
export const line2Camel = (str: string, type = '-'): string => str.replace(eval(`/\\${type}(\\w)/g`), (all, letter) => letter.toUpperCase());

/**
 * @description          驼峰转换下划线
 * @param  {String} str  目标字符串
 * @param  {String} type 转换格式，默认-
 * @return {String}
 */
export const camel2Line = (str: string, type = '-'): string => str.replace(/([A-Z])/g, `${type}$1`).toLowerCase();

/**
 * @description         去除字符串两边的空格
 * @param  {String} str 目标字符串
 * @return {String}
 */
export const trimSpaceAside = (str: string): string => (str || '').replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, '');

/**
 * @description         检查字符串强度，适用于密码检查
 * @param  {String} str 目标字符串
 * @return {Number}     1-4其中一个，4为最强
 */
export const checkStrStrong = (str: string): number => {
  let modes = 0;

  if (str.length < 1) return modes;
  if (/\d/.test(str)) modes++; // number
  if (/[a-z]/.test(str)) modes++; // lower
  if (/[A-Z]/.test(str)) modes++; // upper
  if (/\W/.test(str)) modes++; // special

  switch (modes) {
    case 1:
      return 1;
    case 2:
      return 2;
    case 3:
    case 4:
      return str.length < 12 ? 3 : 4;

    default:
      break;
  }

  return modes;
};

/**
 * @author Zhaocl1997   (https://github.com/Zhaocl1997)
 * @description         清除想要强制清除的字符串，一般指一些敏感的特殊字符
 * @example             clearIllegalChars("a|b/c", ["|", "/"]) => "abc"
 * @param  {String} str 目标字符串
 * @param  {Array} arr  不想要的字符串数组
 * @return {String}     清除完的字符串
 */
export const clearIllegalChars = (str: string, arr: Array<string>): string => {
  let newStr = str;
  for (let i = 0; i < arr.length; i++) {
    if (str.indexOf(arr[i]) !== -1) {
      const regexp = `/\\${arr[i]}/g`;
      newStr = newStr.replace(eval(regexp), '');
    }
  }
  return newStr;
};

interface RegexTemplate {
    number: string
    letter: string
    chinese: string
}

enum AllowedInputTypeEnum {
    NUMBER = 'number',
    LETTER = 'letter',
    CHINESE = 'chinese'
}

/**
 * @author Zhaocl1997    (https://github.com/Zhaocl1997)
 * @description          限制字符串内容，目前支持只能输入数字，字母和中文
 * @example              clearUnexpectedChars("123abc啊啊啊", "number") => "123"
 * @param  {String} str  目标字符串
 * @param  {String} type ["number", "letter", "chinese"] 目前只支持这三个的其中一种
 * @return {String}      清除完的字符串
 */
export const clearUnexpectedChars = (
  str: string,
  type: AllowedInputTypeEnum = AllowedInputTypeEnum.NUMBER,
): string => {
  const reverseRegex = (v: string) => `/${v}/g`;

  const regexTemplate: RegexTemplate = {
    number: '[^0-9-.]',
    letter: '[^A-Za-z]',
    chinese: '[^\u4e00-\u9fa5]',
  };

  return str.replace(eval(reverseRegex(regexTemplate[type])), '');
};
