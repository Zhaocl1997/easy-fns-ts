const { arrToTree, treeToArr, findNode, formatTree, orderTree, deepClone } = require('../dist/lib')

describe('tree utils', () => {
  const arr = [
    {
      id: 1,
      name: '1',
    },
    {
      id: 2,
      name: '1-1',
      parentId: 1,
    },
    {
      id: 3,
      name: '1-1-1',
      parentId: 2,
    },
    {
      id: 4,
      name: '1-2',
      parentId: 1,
    },
    {
      id: 5,
      name: '1-2-2',
      parentId: 4,
    },
    {
      id: 6,
      name: '1-1-1-1',
      parentId: 3,
    },
    {
      id: 7,
      name: '2',
    },
  ]

  const tree = [
    {
      id: 1,
      name: '1',
      children: [
        {
          id: 2,
          name: '1-1',
          parentId: 1,
          children: [
            {
              id: 3,
              name: '1-1-1',
              parentId: 2,
              children: [
                {
                  id: 6,
                  name: '1-1-1-1',
                  parentId: 3,
                  children: [],
                },
              ],
            },
          ],
        },
        {
          id: 4,
          name: '1-2',
          parentId: 1,
          children: [
            {
              id: 5,
              name: '1-2-2',
              parentId: 4,
              children: [],
            },
          ],
        },
      ],
    },
    {
      id: 7,
      name: '2',
      children: [],
    },
  ]

  const dcArr = deepClone(arr)
  const dcTree = deepClone(tree)

  test('array to tree', () => {
    expect(arrToTree(arr, { pid: 'parentId' })).toEqual(dcTree)
  })

  test('tree to array', () => {
    expect(treeToArr(tree).sort((a, b) => a.id - b.id)).toEqual(dcArr)
  })

  test('find node in tree', () => {
    const target = [
      {
        id: 1,
        name: '1',
        children: [
          {
            id: 2,
            name: '1-1',
            parentId: 1,
            children: [
              {
                id: 3,
                name: '1-1-1',
                parentId: 2,
                children: [
                  {
                    id: 6,
                    name: '1-1-1-1',
                    parentId: 3,
                    children: [],
                  },
                ],
              },
            ],
          },
          {
            id: 4,
            name: '1-2',
            parentId: 1,
            children: [
              {
                id: 5,
                name: '1-2-2',
                parentId: 4,
                children: [],
              },
            ],
          },
        ],
      },
      {
        id: 7,
        name: '2',
        children: [],
      },
    ]

    const ret = {
      id: 3,
      name: '1-1-1',
      parentId: 2,
      children: [{ id: 6, name: '1-1-1-1', parentId: 3, children: [] }],
    }

    expect(findNode(target, (node) => node.name === '1-1-1')).toEqual(ret)
  })

  test('format tree into specific structure', () => {
    const target = [
      {
        id: 0,
        childrens: [
          {
            id: 1,
            pid: 0,
            childrens: [
              {
                id: 2,
                pid: 1
              },
              {
                id: 3,
                pid: 1
              }
            ]
          },
          {
            id: 4,
            pid: 0,
            childrens: [
              {
                id: 5,
                pid: 4
              },
              {
                id: 6,
                pid: 4
              }
            ]
          }
        ]
      }
    ]

    const result = [
      {
        id: 0,
        childrens: [
          {
            id: 1,
            parentId: 0,
            childrens: [
              {
                id: 2,
                parentId: 1
              },
              {
                id: 3,
                parentId: 1
              }
            ]
          },
          {
            id: 4,
            parentId: 0,
            childrens: [
              {
                id: 5,
                parentId: 4
              },
              {
                id: 6,
                parentId: 4
              }
            ]
          }
        ]
      }
    ]

    expect(formatTree(target, {
      format: node => {
        return {
          id: node.id,
          parentId: node.pid
        }
      },
      children: 'childrens'
    })).toEqual(result)
  })

  test('order tree by specific field', () => {
    const target = [
      {
        id: 0,
        childrens: [
          {
            id: 1,
            pid: 0,
            customOrder: 2,
            childrens: [
              {
                id: 2,
                pid: 1,
                customOrder: 2
              },
              {
                id: 3,
                pid: 1,
                customOrder: 1
              }
            ]
          },
          {
            id: 4,
            pid: 0,
            customOrder: 1,
            childrens: [
              {
                id: 5,
                pid: 4,
                customOrder: 2
              },
              {
                id: 6,
                pid: 4,
                customOrder: 1
              }
            ]
          }]
      }
    ]

    const result = [
      {
        id: 0,
        childrens: [
          {
            id: 4,
            pid: 0,
            customOrder: 1,
            childrens: [
              {
                id: 6,
                pid: 4,
                customOrder: 1
              },
              {
                id: 5,
                pid: 4,
                customOrder: 2
              },

            ]
          },
          {
            id: 1,
            pid: 0,
            customOrder: 2,
            childrens: [
              {
                id: 3,
                pid: 1,
                customOrder: 1
              },
              {
                id: 2,
                pid: 1,
                customOrder: 2
              },

            ]
          }
        ]
      },

    ]

    expect(orderTree(target, {
      order: 'customOrder',
      children: 'childrens'
    })).toEqual(result)
  })
})
