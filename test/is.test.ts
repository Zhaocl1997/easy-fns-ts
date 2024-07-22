import { describe, expect, it } from 'vitest'

import {
  isArray,
  isBoolean,
  isClient,
  isDate,
  isFunction,
  isNull,
  isNumber,
  isObject,
  isRegExp,
  isServer,
  isString,
  isUndefined,
  isWindow,
} from '../src/is'

import { regex } from '../src/regex'

describe('is utils', () => {
  it('check value is null', () => {
    expect(isNull(null)).toBeTruthy()
    expect(isNull('')).toBeFalsy()
  })

  it('check value is Array', () => {
    expect(isArray([])).toBeTruthy()
    expect(isArray('')).toBeFalsy()
  })

  it('check value is Date', () => {
    expect(isDate(new Date())).toBeTruthy()
    expect(isDate('')).toBeFalsy()
  })

  it('check value is Regex', () => {
    expect(isRegExp(regex.email)).toBeTruthy()
    expect(isRegExp('')).toBeFalsy()
  })

  it('check value is Undefined', () => {
    expect(isUndefined(undefined)).toBeTruthy()
    expect(isUndefined('')).toBeFalsy()
  })

  it('check value is String', () => {
    expect(isString('123abc')).toBeTruthy()
    expect(isString({})).toBeFalsy()
  })

  it('check value is Number', () => {
    expect(isNumber(123123)).toBeTruthy()
    expect(isNumber('')).toBeFalsy()
  })

  it('check value is Boolean', () => {
    expect(isBoolean(true)).toBeTruthy()
    expect(isBoolean('')).toBeFalsy()
  })

  it('check value is Object', () => {
    expect(isObject({})).toBeTruthy()
    expect(isObject('')).toBeFalsy()
  })

  it('check value is Function', () => {
    expect(isFunction(() => {})).toBeTruthy()
    expect(isFunction('')).toBeFalsy()
  })

  it('check value is Client', () => {
    expect(isClient()).toBeFalsy()
  })

  it('check value is Server', () => {
    expect(isServer()).toBeTruthy()
  })

  it('check value is Window', () => {
    expect(isWindow()).toBeFalsy()
  })
})
