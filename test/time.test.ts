import { describe, expect, it } from 'vitest'
import { formatAgo, formatTime, getNow } from '../src/time'

describe('time utils', () => {
  it('format time', () => {
    const strTime = '2019-10-12 16:52:45'
    const time = new Date(strTime)

    expect(formatTime(time)).toBe(strTime)
    expect(formatTime(time, 'YYYY-MM-DD')).toBe(strTime.split(' ')[0])
    expect(formatTime(time, 'HH:mm:ss')).toBe(strTime.split(' ')[1])
  })

  it('format how long ago', () => {
    const oldTime = new Date().getTime() + 10000
    const whileAgo = new Date().getTime() - 20 * 1000
    const secondAgo = new Date().getTime() - 40 * 1000
    const minuteAgo = new Date().getTime() - 5 * 60 * 1000
    const hourAgo = new Date().getTime() - 10 * 60 * 60 * 1000
    const dayAgo = new Date().getTime() - 20 * 24 * 60 * 60 * 1000
    const monthAgo = new Date().getTime() - 3 * 31 * 24 * 60 * 60 * 1000
    const yearAgo = new Date().getTime() - 20 * 12 * 31 * 24 * 60 * 60 * 1000

    expect(formatAgo(oldTime)).toBe('')
    expect(formatAgo(whileAgo)).toBe('刚刚')
    expect(formatAgo(secondAgo)).toBe('40秒前')
    expect(formatAgo(minuteAgo)).toBe('5分钟前')
    expect(formatAgo(hourAgo)).toBe('10小时前')
    expect(formatAgo(dayAgo)).toBe('20天前')
    expect(formatAgo(monthAgo)).toBe('3个月前')
    expect(formatAgo(yearAgo)).toBe('20年前')
  })

  it('get now formatted time', () => {
    expect(getNow()).toEqual(formatTime(new Date()))
    expect(getNow('YYYY-MM-DD')).toEqual(formatTime(new Date(), 'YYYY-MM-DD'))
  })
})
