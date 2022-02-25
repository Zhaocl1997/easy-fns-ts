const {
  easyIsEmpty,
  easyIsEqual,

  countAge,
} = require('../dist/lib')

describe('check value is valid', () => {
  test('check value is empty(easy way)', () => {
    expect(easyIsEmpty('')).toBeTruthy()
    expect(easyIsEmpty(null)).toBeTruthy()
    expect(easyIsEmpty(undefined)).toBeTruthy()
    expect(easyIsEmpty(NaN)).toBeTruthy()

    expect(easyIsEmpty({})).toBeTruthy()
    expect(easyIsEmpty([])).toBeTruthy()

    expect(easyIsEmpty(new Map())).toBeTruthy()
    expect(easyIsEmpty(new Set())).toBeTruthy()
  })

  test('check two values is equal(easy way)', () => {
    expect(
      easyIsEqual({ name: 'jack', age: 23 }, { name: 'jack', age: 23 })
    ).toBeTruthy()
    expect(
      easyIsEqual([{ name: 'jack', age: 23 }], [{ name: 'jack', age: 23 }])
    ).toBeTruthy()

    expect(easyIsEqual([123, '123', true], [123, '123', true])).toBeTruthy()

    expect(
      easyIsEqual(
        {
          name: 'jack',
          hobbies: ['jogging', 'swimming'],
          family: [
            {
              name: 'lucy',
              age: 36,
              hobbies: ['reading', 'writing'],
              relatives: [
                {
                  name: 'rose',
                  relationship: 'aunt',
                  jobs: {
                    name: 'worker',
                    sallary: '5000',
                  },
                },
              ],
            },
          ],
        },
        {
          name: 'jack',
          hobbies: ['jogging', 'swimming'],
          family: [
            {
              name: 'lucy',
              age: 36,
              hobbies: ['reading', 'writing'],
              relatives: [
                {
                  name: 'rose',
                  relationship: 'aunt',
                  jobs: {
                    name: 'worker',
                    sallary: '5000',
                  },
                },
              ],
            },
          ],
        }
      )
    ).toBeTruthy()
  })
})

describe('common utils', () => {
  test('calculate time string to age', () => {
    expect(countAge('1997-12-22')).toBe(24)
    expect(countAge(new Date('1997-12-22'))).toBe(24)
  })
})
