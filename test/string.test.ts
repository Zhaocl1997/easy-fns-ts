import { describe, expect, it } from 'vitest'
import {
  camel2Line,
  checkStrStrong,
  clearIllegalChars,
  clearUnexpectedChars,
  line2Camel,
  lowerFirst,
  trimSpaceAside,
  upperFirst,
} from '../src/string'

describe('string utils', () => {
  it('line string convert to camel string', () => {
    const target = 'my-component'
    const result = 'myComponent'

    expect(line2Camel(target)).toBe(result)
  })

  it('camel string convert to line string', () => {
    const target = 'myComponent'
    const result = 'my-component'

    expect(camel2Line(target)).toBe(result)
  })

  it('trim the space aside', () => {
    const target = '   u-mb10 u-float-right    '
    const result = 'u-mb10 u-float-right'

    expect(trimSpaceAside(target)).toBe(result)
  })

  it('check string strength', () => {
    expect(checkStrStrong('1')).toBe(0)
    expect(checkStrStrong('123')).toBe(1)
    expect(checkStrStrong('123abc')).toBe(2)
    expect(checkStrStrong('123abc!@#')).toBe(3)
    expect(checkStrStrong('1234abCD!@#$%')).toBe(4)
  })

  it('clear illegal characters', () => {
    expect(clearIllegalChars('!1-2+3/', ['/'])).toBe('!1-2+3')
    expect(clearIllegalChars('!1-2+3/', ['/', '!'])).toBe('1-2+3')
    expect(clearIllegalChars('!1-2+3/', ['!', '/', '+', '-'])).toBe('123')
  })

  it('clear unexpected characters', () => {
    expect(clearUnexpectedChars('123abc阿松大', 'number')).toBe('123')
    expect(clearUnexpectedChars('123abc阿松大', 'letter')).toBe('abc')
    expect(clearUnexpectedChars('123abc阿松大', 'chinese')).toBe('阿松大')
  })

  it('upper first character', () => {
    expect(upperFirst('input')).toBe('Input')
  })

  it('lower first character', () => {
    expect(lowerFirst('Input')).toBe('input')
  })
})
