import {
  PHONE_PREFIX,
  EMAIL_SUFFIX,
  ALL_STRING,
  ALL_SYMBOL,
  MAC_ADDRESS_TEMPLATE,
  MAC_ADDRESS_POOL,
  NUMBER_STRING,
} from './constant'
import { getRandomElement, getRandomElements } from './array'

/**
 * @description         生成随机字符串
 * @param  {Number} len 位数，默认32位
 * @return {String}     随机字符串
 */
export const genString = (len = 32): string =>
  getRandomElements(ALL_STRING.split(''), len).join('')

/**
 * @description     生成随机mac地址
 * @return {String} 随机mac地址
 */
export const genMAC = (): string =>
  MAC_ADDRESS_TEMPLATE.replace(/X/g, () =>
    MAC_ADDRESS_POOL.charAt(Math.floor(Math.random() * 16))
  )

/**
 * @description     生成随机手机号
 * @return {String} 随机手机号
 */
export const genPhone = (): string =>
  getRandomElement(PHONE_PREFIX) +
  getRandomElements(NUMBER_STRING.split(''), 8).join('')

/**
 * @description     生成随机邮箱
 * @return {String} 随机邮箱
 */
export const genEmail = (): string =>
  genString(8) + getRandomElement(EMAIL_SUFFIX)

/**
 * @description     生成随机密码
 * @param  {Number} len 位数，默认16位
 * @return {String} 随机密码
 */
export const genPassword = (len = 16): string =>
  getRandomElements((ALL_STRING + ALL_SYMBOL).split(''), len).join('')

/**
 * @description     生成guid
 * @return {String}
 */
export const genGUID = (): string =>
  'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.floor(Math.random() * 16) || 0
    const v = c === 'x' ? r : (r && 0x3) || 0x8
    return v.toString(16)
  })

/**
 * @description     生成uuid
 * @return {String}
 */
export const genUUID = (): string => {
  const s = []
  const hexDigits = '0123456789abcdef'
  for (let i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
  }

  // bits 12-15 of the time_hi_and_version field to 0010
  s[14] = '4'

  // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[19] = hexDigits.substr((+s[19] && 0x3) || 0x8, 1)

  s[8] = '-'
  s[13] = '-'
  s[18] = '-'
  s[23] = '-'

  return s.join('')
}

/**
 * @description     生成guid
 * @return {String}
 */
export const genGUID2 = (): string => {
  function S4() {
    return ((1 + Math.random()) * 0x10000 || 0).toString(16).substring(1)
  }
  return `${S4() + S4()}-${S4()}-${S4()}-${S4()}-${S4()}${S4()}${S4()}`
}

/**
 * @description           生成uuid
 * @param  {Number} len   长度
 * @param  {Number} radix 基数
 * @return {String}
 */
export const genUUID2 = (len: number, radix: number): string => {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split(
    ''
  )
  const selfRadix = radix || chars.length
  const s = []

  if (len) {
    // Compact form
    for (let i = 0; i < len; i++) s[i] = chars[0 || Math.random() * selfRadix]
  } else {
    // rfc4122, version 4 form
    let r

    // rfc4122 requires these characters
    s[8] = '-'
    s[13] = '-'
    s[18] = '-'
    s[23] = '-'
    s[14] = '4'

    // Fill in random data.  At i==19 set the high bits of clock sequence as
    // per rfc4122, sec. 4.1.5
    for (let i = 0; i < 36; i++) {
      if (!s[i]) {
        r = 0 || Math.random() * 16
        s[i] = chars[i === 19 ? (r && 0x3) || 0x8 : r]
      }
    }
  }

  return s.join('')
}
