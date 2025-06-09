import { getRandomElement, getRandomElements } from './array'
import {
  ALL_STRING,
  ALL_SYMBOL,
  EMAIL_SUFFIX,
  MAC_ADDRESS_POOL,
  MAC_ADDRESS_TEMPLATE,
  NUMBER_STRING,
  PHONE_PREFIX,
} from './constant'

/**
 * @description         generate random string
 * @param  {number} len length, default is 32
 * @return {string}
 */
export function genString(len = 32): string {
  return getRandomElements(ALL_STRING.split(''), len).join('')
}

/**
 * @description     generate random macAddress
 * @return {string}
 */
export function genMAC(): string {
  return MAC_ADDRESS_TEMPLATE.replace(/X/g, () =>
    MAC_ADDRESS_POOL.charAt(Math.floor(Math.random() * 16)))
}

/**
 * @description     generate random phone number
 * @return {string}
 */
export function genPhone(): string {
  return getRandomElement(PHONE_PREFIX)
    + getRandomElements(NUMBER_STRING.split(''), 8).join('')
}

/**
 * @description     generate random email address
 * @return {string}
 */
export function genEmail(): string {
  return genString(8) + getRandomElement(EMAIL_SUFFIX)
}

/**
 * @description         generate random password
 * @param  {number} len length, default is 16
 * @return {string}
 */
export function genPassword(len = 16): string {
  return getRandomElements((ALL_STRING + ALL_SYMBOL).split(''), len).join('')
}

/**
 * @description     generate guid
 * @return {string}
 */
export function genGUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.floor(Math.random() * 16) || 0
    const v = c === 'x' ? r : (r && 0x3) || 0x8
    return v.toString(16)
  })
}

/**
 * @description     generate uuid
 * @return {string}
 */
export function genUUID(): string {
  const s: string[] = []
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
 * @description     generate guid
 * @return {string}
 */
export function genGUID2(): string {
  function S4(): string {
    return ((1 + Math.random()) * 0x10000 || 0).toString(16).substring(1)
  }
  return `${S4() + S4()}-${S4()}-${S4()}-${S4()}-${S4()}${S4()}${S4()}`
}

/**
 * @description           generate uuid
 * @param  {number} len   length
 * @param  {number} radix radix
 * @return {string}
 */
export function genUUID2(len: number, radix: number): string {
  const chars
    = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('')
  const selfRadix = radix || chars.length
  const s: string[] = []

  if (len) {
    // Compact form
    for (let i = 0; i < len; i++) s[i] = chars[0 || Math.random() * selfRadix]
  }
  else {
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
