import { describe, expect, it } from 'vitest'

import { hexToRgb, percentToRgb, rgbToHex } from '../src/color'
import { regexTest } from '../src/regex'

describe('color utils', () => {
  it('rgb to hex', () => {
    expect(hexToRgb('#FFC0CB')).toBe('rgb(255,192,203)')
    expect(hexToRgb('#FFC0CB', '.5')).toBe('rgba(255,192,203,.5)')
  })

  it('hex to rgb', () => {
    expect(rgbToHex('rgb(255,192,203)')).toBe('#FFC0CB')
    expect(rgbToHex('rgba(255,192,203,.5)')).toBe('#FFC0CB')
  })

  it('percent number to rgb', () => {
    const rgb = percentToRgb('80')
    expect(regexTest.isRGB(rgb)).toBeTruthy()
  })
})
