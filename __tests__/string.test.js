const {
  line2Camel,
  camel2Line,
  trimSpaceAside,
  checkStrStrong,
  clearIllegalChars,
  clearUnexpectedChars,
  upperFirst,
  lowerFirst
} = require('../dist/lib')

describe('string utils', () => {
  test('line string convert to camel string', () => {
    const target = 'my-component'
    const result = 'myComponent'

    expect(line2Camel(target)).toBe(result)
  })

  test('camel string convert to line string', () => {
    const target = 'myComponent'
    const result = 'my-component'

    expect(camel2Line(target)).toBe(result)
  })

  test('trim the space aside', () => {
    const target = '   u-mb10 u-float-right    '
    const result = 'u-mb10 u-float-right'

    expect(trimSpaceAside(target)).toBe(result)
  })

  test('check string strength', () => {
    expect(checkStrStrong('1')).toBe(0)
    expect(checkStrStrong('123')).toBe(1)
    expect(checkStrStrong(123)).toBe(1)
    expect(checkStrStrong('123abc')).toBe(2)
    expect(checkStrStrong('123abc!@#')).toBe(3)
    expect(checkStrStrong('1234abCD!@#$%')).toBe(4)
  })

  test('clear illegal characters', () => {
    expect(clearIllegalChars('!1-2+3/', '/')).toBe('!1-2+3')
    expect(clearIllegalChars('!1-2+3/', ['/', '!'])).toBe('1-2+3')
    expect(clearIllegalChars('!1-2+3/', ['!', '/', '+', '-'])).toBe('123')
  })

  test('clear unexpected characters', () => {
    expect(clearUnexpectedChars('123abc阿松大', 'number')).toBe('123')
    expect(clearUnexpectedChars('123abc阿松大', 'letter')).toBe('abc')
    expect(clearUnexpectedChars('123abc阿松大', 'chinese')).toBe('阿松大')
  })

  test('upper first character', () => {
    expect(upperFirst('input')).toBe('Input')
  })

  test('lower first character', () => {
    expect(lowerFirst('Input')).toBe('input')
  })
})
