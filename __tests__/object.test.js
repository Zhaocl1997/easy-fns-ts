const {
  easyDeepClone,
  easyDeepMerge,
  easyFilterObj,
  easyOmit,
  easyDeepReplaceKey,
  easyDeepGet,
  easyDeepSet,
  easyFilterEmptyValue,
  easyTransformObjectStringBoolean,
} = require('../dist/lib')

describe('object operation', () => {
  test('deep clone target(easy way)', () => {
    const objTarget = {
      name: 'jack',
      age: 23,
      marriage: false,
      hobbies: ['jogging'],
      family: { father: { name: 'ken', age: 45 } },
    }
    expect(easyDeepClone(objTarget)).toEqual({
      name: 'jack',
      age: 23,
      marriage: false,
      hobbies: ['jogging'],
      family: { father: { name: 'ken', age: 45 } },
    })
  })

  test('deep merge two values(easy way)', () => {
    const src = {
      name: 'jack',
      age: 23,
      marriage: false,
      hobbies: ['jogging', 'running'],
    }
    const target = {
      name: 'lucy',
      age: 22,
      marriage: false,
      hobbies: ['jogging', 'writing'],
    }

    expect(easyDeepMerge(src, target)).toEqual({
      name: 'lucy',
      age: 22,
      marriage: false,
      hobbies: ['jogging', 'writing'],
    })
  })

  test('object filter by field', () => {
    const objTarget = {
      name: 'jack',
      age: 23,
      marriage: false,
      hobbies: ['jogging'],
      family: { father: { name: 'ken', age: 45 } },
    }
    expect(easyFilterObj(objTarget, ['name'])).toEqual({ name: 'jack' })
    expect(easyFilterObj(objTarget, 'm')).toEqual({
      name: 'jack',
      marriage: false,
      family: { father: { name: 'ken', age: 45 } },
    })
  })

  test('remove useless key on an object', () => {
    const objTarget = {
      name: 'jack',
      age: 23,
      marriage: false,
      hobbies: ['jogging'],
    }
    expect(easyOmit(objTarget, ['age', 'marriage'])).toEqual({
      name: 'jack',
      hobbies: ['jogging'],
    })

    expect(easyOmit(objTarget, 'age')).toEqual({
      name: 'jack',
      marriage: false,
      hobbies: ['jogging'],
    })
  })

  test('deep replace key into new one', () => {
    const target = {
      name: 'jack',
      age: 21,
      family: [
        {
          name: 'lucy',
          age: 23,
        },
        {
          name: 'tom',
          age: 16,
        },
      ],
      mom: {
        name: 'sue',
        age: 46,
      },
      dad: {
        name: 'trump',
        age: 48,
      },
    }

    expect(
      easyDeepReplaceKey(target, { name: 'nameNew', age: 'ageNew' })
    ).toEqual({
      nameNew: 'jack',
      ageNew: 21,
      family: [
        {
          nameNew: 'lucy',
          ageNew: 23,
        },
        {
          nameNew: 'tom',
          ageNew: 16,
        },
      ],
      mom: {
        nameNew: 'sue',
        ageNew: 46,
      },
      dad: {
        nameNew: 'trump',
        ageNew: 48,
      },
    })
  })

  test('deep get value on object', () => {
    const target = {
      name: 'jack',
      age: 21,
      family: [
        {
          name: 'lucy',
          age: 23,
        },
        {
          name: 'tom',
          age: 16,
        },
      ],
      mom: {
        name: 'sue',
        age: 46,
      },
      dad: {
        name: 'trump',
        age: 48,
      },
    }

    expect(easyDeepGet(target, 'mom.name')).toBe('sue')
  })

  test('deep set value on object', () => {
    const target = {
      name: 'jack',
      age: 21,
      family: [
        {
          name: 'lucy',
          age: 23,
        },
        {
          name: 'tom',
          age: 16,
        },
      ],
      mom: {
        name: 'sue',
        age: 46,
      },
      dad: {
        name: 'trump',
        age: 48,
      },
    }

    easyDeepSet(target, 'mom.name', 'sue2')
    expect(target).toEqual({
      name: 'jack',
      age: 21,
      family: [
        {
          name: 'lucy',
          age: 23,
        },
        {
          name: 'tom',
          age: 16,
        },
      ],
      mom: {
        name: 'sue2',
        age: 46,
      },
      dad: {
        name: 'trump',
        age: 48,
      },
    })
  })

  test('deep filter falsy values in object', () => {
    const target = [
      {
        field1: '',
        field2: undefined,
        field3: null,
        field4: 0,
        field5: false,
        field6: {},
        field7: [],
      },
      {
        field8: {
          field9: {
            field10: {
              test: '123',
            },
          },
        },
      },
      {},
      {
        field11: {},
        field12: [],
      },
    ]

    expect(easyFilterEmptyValue(target)).toEqual([
      {
        field4: 0,
        field5: false,
      },
      {
        field8: {
          field9: {
            field10: {
              test: '123',
            },
          },
        },
      },
      {},
    ])
  })

  test('transform string boolean to real boolean', () => {
    const target = [
      {
        field1: '',
        field2: undefined,
        field3: null,
        field4: 0,
        field5: 'true',
        field55: 'false',
        field6: {},
        field7: [],
      },
      {
        field8: {
          field9: {
            field10: {
              test: '123',
            },
          },
        },
      },
      {},
      {
        field11: {},
        field12: [],
      },
    ]

    expect(easyTransformObjectStringBoolean(target)).toEqual([
      {
        field1: '',
        field2: undefined,
        field3: null,
        field4: 0,
        field5: true,
        field55: false,
        field6: {},
        field7: [],
      },
      {
        field8: {
          field9: {
            field10: {
              test: '123',
            },
          },
        },
      },
      {},
      {
        field11: {},
        field12: [],
      },
    ])
  })
})
