import type {
  TreeNodeItem,
} from '../src/tree'
import { describe, expect, it } from 'vitest'
import { easyDeepClone } from '../src/object'
import {
  arrToTree,
  filterTree,
  findNode,
  findPath,
  formatTree,
  orderTree,
  treeToArr,
} from '../src/tree'

describe('tree utils', () => {
  const arr = [
    {
      id: 1,
      name: '1',
      parentId: 0,
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
      parentId: 0,
    },
  ]

  const tree = [
    {
      id: 1,
      name: '1',
      parentId: 0,
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
      parentId: 0,
      children: [],
    },
  ]

  const childrenNullTree = [
    {
      id: 1,
      name: '1',
      parentId: 0,
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
      parentId: 0,
      children: [],
    },
  ]

  const dcArr = easyDeepClone(arr)
  const dcArr2 = easyDeepClone(arr)
  const dcTree = easyDeepClone(tree)

  it('array to tree', () => {
    expect(arrToTree(arr, { pid: 'parentId' })).toEqual(dcTree)
  })

  it('array to tree with null children', () => {
    expect(
      arrToTree(
        dcArr2,
        { pid: 'parentId' },
      ),
    ).toEqual(childrenNullTree)
  })

  it('tree to array', () => {
    expect(treeToArr(tree, { childrenField: 'children' }).sort((a, b) => +a.id - +b.id)).toEqual(dcArr)
  })

  it('find node in tree', () => {
    const target = [
      {
        id: 1,
        name: '1',
        parentId: 0,
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

    expect(findNode(target, node => node.name === '1-1-1', { childrenField: 'children' })).toEqual(ret)
  })

  it('format tree into specific structure', () => {
    const target: TreeNodeItem<{ id: number, pid?: number }, 'childrens'>[] = [
      {
        id: 0,
        childrens: [
          {
            id: 1,
            pid: 0,
            childrens: [
              {
                id: 2,
                pid: 1,
              },
              {
                id: 3,
                pid: 1,
              },
            ],
          },
          {
            id: 4,
            pid: 0,
            childrens: [
              {
                id: 5,
                pid: 4,
              },
              {
                id: 6,
                pid: 4,
              },
            ],
          },
        ],
      },
    ]

    const result: TreeNodeItem<
      { id: number, parentId?: number },
      'childrens'
    >[] = [
      {
        id: 0,
        childrens: [
          {
            id: 1,
            parentId: 0,
            childrens: [
              {
                id: 2,
                parentId: 1,
              },
              {
                id: 3,
                parentId: 1,
              },
            ],
          },
          {
            id: 4,
            parentId: 0,
            childrens: [
              {
                id: 5,
                parentId: 4,
              },
              {
                id: 6,
                parentId: 4,
              },
            ],
          },
        ],
      },
    ]

    expect(
      formatTree(target, (node) => {
        return {
          id: node.id,
          parentId: node.pid,
        }
      }, { childrenField: 'childrens' }),
    ).toEqual(result)
  })

  it('order tree by specific field', () => {
    const target = [
      {
        id: 0,
        pid: 0,
        meta: { order: 0 },
        childrens: [
          {
            id: 1,
            pid: 0,
            meta: { order: 2 },
            childrens: [
              {
                id: 2,
                pid: 1,
                meta: { order: 2 },
                childrens: [],
              },
              {
                id: 3,
                pid: 1,
                meta: { order: 1 },
                childrens: [],
              },
            ],
          },
          {
            id: 4,
            pid: 0,
            meta: { order: 1 },
            childrens: [
              {
                id: 5,
                pid: 4,
                meta: { order: 2 },
                childrens: [],
              },
              {
                id: 6,
                pid: 4,
                meta: { order: 1 },
                childrens: [],
              },
            ],
          },
        ],
      },
    ]

    const result = [
      {
        id: 0,
        pid: 0,
        meta: { order: 0 },
        childrens: [
          {
            id: 4,
            pid: 0,
            meta: { order: 1 },
            childrens: [
              {
                id: 6,
                pid: 4,
                meta: { order: 1 },
                childrens: [],
              },
              {
                id: 5,
                pid: 4,
                meta: { order: 2 },
                childrens: [],
              },
            ],
          },
          {
            id: 1,
            pid: 0,
            meta: { order: 2 },
            childrens: [
              {
                id: 3,
                pid: 1,
                meta: { order: 1 },
                childrens: [],
              },
              {
                id: 2,
                pid: 1,
                meta: { order: 2 },
                childrens: [],
              },
            ],
          },
        ],
      },
    ]

    expect(
      orderTree(target, (a, b) => a.meta.order - b.meta.order, {
        childrenField: 'childrens',
      }),
    ).toEqual(result)
  })

  it('find node path through callback', () => {
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

    const result = [
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

      {
        id: 6,
        name: '1-1-1-1',
        parentId: 3,
        children: [],
      },
    ]

    expect(findPath(target, node => node.id === 6, { childrenField: 'children' })).toEqual(result)
  })

  it('filter tree with condition', () => {
    interface ITest {
      id: number
      name: string
      parentId?: number
    }

    const target: TreeNodeItem<ITest>[] = [
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

    const result: TreeNodeItem<ITest>[] = [
      {
        id: 1,
        name: '1',
        children: [
          {
            id: 4,
            name: '1-2',
            parentId: 1,
            children:
              [
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
      { id: 7, name: '2', children: [] },
    ]

    expect(filterTree<ITest>(target, item => item.name.includes('2'))).toEqual(result)
  })
})
