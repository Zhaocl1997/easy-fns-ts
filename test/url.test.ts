import { describe, expect, it } from 'vitest'
import { addParams, addTimeStamp, parseParams } from '../src/url'

describe('url utils', () => {
  it('add a timestamp in url', () => {
    const target = 'https://www.zhaocl.net'

    expect(addTimeStamp(target).includes('?')).toBeTruthy()
  })

  it('add params in url', () => {
    const target = 'https://www.zhaocl.net'
    const result = 'https://www.zhaocl.net?name=jack'

    expect(addParams(target, 'name', 'jack')).toBe(result)
  })

  it('extract params in url into object', () => {
    const target
      = 'http://127.0.0.1:7300/dev-api/system/user/list?nickName=asd&pageNum=1&pageSize=10&pageSize=12&userName=&isDel'
    const result = {
      nickName: 'asd',
      pageNum: 1,
      pageSize: 12,
      userName: '',
      isDel: true,
    }

    expect(parseParams(target)).toEqual(result)
  })
})
