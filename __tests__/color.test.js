const { hexToRgb, rgbToHex, percentToRgb, regexTest } = require('../dist/lib')

describe('color utils', () => {
  test('rgb to hex', () => {
    expect(hexToRgb('#FFC0CB')).toBe('rgb(255,192,203)')
    expect(hexToRgb('#FFC0CB', '.5')).toBe('rgba(255,192,203,.5)')
  })

  test('hex to rgb', () => {
    expect(rgbToHex('rgb(255,192,203)')).toBe('#FFC0CB')
    expect(rgbToHex('rgba(255,192,203,.5)')).toBe('#FFC0CB')
  })

  test('percent number to rgb', () => {
    const rgb = percentToRgb('80')
    expect(regexTest.isRGB(rgb)).toBeTruthy()
  })
})
