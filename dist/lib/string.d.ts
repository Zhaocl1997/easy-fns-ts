/**
 * @description          划线转换驼峰
 * @param  {String} str  目标字符串
 * @param  {String} type 转换格式，默认-
 * @return {String}
 */
export declare const line2Camel: (str: string, type?: string) => string;
/**
 * @description          驼峰转换下划线
 * @param  {String} str  目标字符串
 * @param  {String} type 转换格式，默认-
 * @return {String}
 */
export declare const camel2Line: (str: string, type?: string) => string;
/**
 * @description         去除字符串两边的空格
 * @param  {String} str 目标字符串
 * @return {String}
 */
export declare const trimSpaceAside: (str: string) => string;
/**
 * @description         检查字符串强度，适用于密码检查
 * @param  {String} str 目标字符串
 * @return {Number}     1-4其中一个，4为最强
 */
export declare const checkStrStrong: (str: string) => number;
/**
 * @author Zhaocl1997   (https://github.com/Zhaocl1997)
 * @description         清除想要强制清除的字符串，一般指一些敏感的特殊字符
 * @example             clearIllegalChars("a|b/c", ["|", "/"]) => "abc"
 * @param  {String} str 目标字符串
 * @param  {Array} arr  不想要的字符串数组
 * @return {String}     清除完的字符串
 */
export declare const clearIllegalChars: (str: string, arr: Array<string>) => string;
declare enum AllowedInputTypeEnum {
    NUMBER = "number",
    LETTER = "letter",
    CHINESE = "chinese"
}
/**
 * @author Zhaocl1997    (https://github.com/Zhaocl1997)
 * @description          限制字符串内容，目前支持只能输入数字，字母和中文
 * @example              clearUnexpectedChars("123abc啊啊啊", "number") => "123"
 * @param  {String} str  目标字符串
 * @param  {String} type ["number", "letter", "chinese"] 目前只支持这三个的其中一种
 * @return {String}      清除完的字符串
 */
export declare const clearUnexpectedChars: (str: string, type?: AllowedInputTypeEnum) => string;
export {};
