import { describe, expect, it } from 'vitest'

import { genEmail, genGUID, genMAC, genPhone, genUUID } from '../src/generator'

import { regexTest } from '../src/regex'

describe('regexTest utils', () => {
  it('url regex test', () => {
    expect(regexTest.isUrl('https://www.baidu.com')).toBeTruthy()
    expect(regexTest.isUrl('123')).toBeFalsy()
  })

  it('phone regex test', () => {
    expect(regexTest.isPhone(genPhone())).toBeTruthy()
    expect(regexTest.isPhone('123')).toBeFalsy()
  })

  it('email regex test', () => {
    expect(regexTest.isEmail(genEmail())).toBeTruthy()
    expect(regexTest.isEmail('123')).toBeFalsy()
  })

  it('macAddress regex test', () => {
    expect(regexTest.isMacAddress(genMAC())).toBeTruthy()
    expect(regexTest.isMacAddress('123')).toBeFalsy()
  })

  it('id regex test', () => {
    expect(regexTest.isId('230105199808242154')).toBeTruthy()
    expect(regexTest.isId('123')).toBeFalsy()
  })

  it('number regex test', () => {
    expect(regexTest.isNumber('230105199808')).toBeTruthy()
    expect(regexTest.isNumber('abc')).toBeFalsy()
  })

  it('letter regex test', () => {
    expect(regexTest.isLetter('abc')).toBeTruthy()
    expect(regexTest.isLetter('123')).toBeFalsy()
  })

  it('external regex test', () => {
    expect(regexTest.isExternal('tel:15774517304')).toBeTruthy()
    expect(regexTest.isExternal('www.baidu.com')).toBeFalsy()
  })

  it('rgb regex test', () => {
    expect(regexTest.isRGB('rgb(255,255,255)')).toBeTruthy()
    expect(regexTest.isRGB('rgba(255,255,255,.8)')).toBeTruthy()
    expect(regexTest.isRGB('rgb(255,255,255,.8)')).toBeFalsy()
  })

  it('hex regex test', () => {
    expect(regexTest.isHEX('#f73131')).toBeTruthy()
    expect(regexTest.isHEX('f73131')).toBeFalsy()
  })

  it('uuid regex test', () => {
    expect(regexTest.isUUID(genUUID())).toBeTruthy()
    expect(regexTest.isUUID(genGUID())).toBeTruthy()
  })
})
