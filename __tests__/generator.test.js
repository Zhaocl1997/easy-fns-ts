const {
  genEmail,
  genMAC,
  genPhone,
  genPassword,
  genString,
  regexTest,
} = require('../dist/lib')

describe('generator utils', () => {
  test('generate email and validate', () => {
    expect(regexTest.isEmail(genEmail())).toBeTruthy()
  })

  test('generate macAddress and validate', () => {
    expect(regexTest.isMacAddress(genMAC())).toBeTruthy()
  })

  test('generate phone and validate', () => {
    expect(regexTest.isPhone(genPhone())).toBeTruthy()
  })

  test('generate password', () => {
    expect(genPassword(12)).toHaveLength(12)
  })

  test('generate random string', () => {
    expect(genString(32)).toHaveLength(32)
  })
})
