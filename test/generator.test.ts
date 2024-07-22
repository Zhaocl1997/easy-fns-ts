import { describe, expect, it } from 'vitest'

import {
  genEmail,
  genMAC,
  genPassword,
  genPhone,
  genString,
} from '../src/generator'

import { regexTest } from '../src/regex'

describe('generator utils', () => {
  it('generate email and validate', () => {
    expect(regexTest.isEmail(genEmail())).toBeTruthy()
  })

  it('generate macAddress and validate', () => {
    expect(regexTest.isMacAddress(genMAC())).toBeTruthy()
  })

  it('generate phone and validate', () => {
    expect(regexTest.isPhone(genPhone())).toBeTruthy()
  })

  it('generate password', () => {
    expect(genPassword(12)).toHaveLength(12)
  })

  it('generate random string', () => {
    expect(genString(32)).toHaveLength(32)
  })
})
