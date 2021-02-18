const {
  getRandomElement,
  getRandomElements,
  curryConcat,
  objectArrayUnique,
  shuffle,
  intersect,
  except,
  complement
} = require('../dist/lib')

describe('array utils', () => {
  const arr = [
    { id: 1, name: '李四1' },
    { id: 2, name: '李四' },
    { id: 2, name: '李四' },
    { id: 1, name: '李四1' },
    { id: 5, name: '李四5' },
  ]

  test('get random element in an array', () => {
    const result = getRandomElement(arr)
    const isInclude = arr.find((i) => i.id === result.id)
    expect(isInclude).toBeTruthy()
  })

  test('get random elements in an array', () => {
    expect(getRandomElements(arr, 3)).toHaveLength(3)
  })

  test('curry concat', () => {
    const arr1 = [1, 3, 5]
    const arr2 = [7, 9, 11]
    const arr3 = [2, 4, 6, 8]

    expect(curryConcat(arr1, arr2, arr3)).toEqual([
      1,
      3,
      5,
      7,
      9,
      11,
      2,
      4,
      6,
      8,
    ])
  })

  test('object array unique', () => {
    expect(objectArrayUnique(arr)).toEqual([
      { id: 1, name: '李四1' },
      { id: 2, name: '李四' },
      { id: 5, name: '李四5' },
    ])
  })

  test('shuffle the array', () => {
    const arr = [1, 3, 5, 7, 9]
    expect(shuffle(arr)).toEqual(expect.arrayContaining(arr))
    expect(shuffle(arr)).toHaveLength(arr.length)
  })

  test('shuffle the complex array', () => {
    const arr = [
      {
        name: 'jack',
        age: 23
      },
      {
        name: 'rose',
        age: 22
      },
      {
        name: 'lucy',
        age: 20
      }
    ]
    expect(shuffle(arr)).toHaveLength(arr.length)
  })

  test('intersect', () => {
    const a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    const b = [1, 3, 5, 7, 9, 11]
    expect(intersect(a, b)).toEqual([1, 3, 5, 7, 9])
  })

  test('except', () => {
    const a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    const b = [1, 3, 5, 7, 9, 11]
    expect(except(a, b)).toEqual([2, 4, 6, 8, 10])
  })

  test('complement', () => {
    const a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    const b = [1, 3, 5, 7, 9, 11]
    expect(complement(a, b)).toEqual([2, 4, 6, 8, 10, 11])
  })
})
