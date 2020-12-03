
const { arrToTree, treeToArr, findNode, deepClone } = require('../dist/lib')

describe('tree utils', () => {

    const arr = [
        {
            id: 1,
            name: '1',
        },
        {
            id: 2,
            name: '1-1',
            parentId: 1
        },
        {
            id: 3,
            name: '1-1-1',
            parentId: 2
        },
        {
            id: 4,
            name: '1-2',
            parentId: 1
        },
        {
            id: 5,
            name: '1-2-2',
            parentId: 4
        },
        {
            id: 6,
            name: '1-1-1-1',
            parentId: 3
        },
        {
            id: 7,
            name: '2',
        }
    ]

    const tree = [
        {
            "id": 1,
            "name": "1",
            "children": [
                {
                    "id": 2,
                    "name": "1-1",
                    "parentId": 1,
                    "children": [
                        {
                            "id": 3,
                            "name": "1-1-1",
                            "parentId": 2,
                            "children": [
                                {
                                    "id": 6,
                                    "name": "1-1-1-1",
                                    "parentId": 3,
                                    "children": []
                                }
                            ]
                        }
                    ]
                },
                {
                    "id": 4,
                    "name": "1-2",
                    "parentId": 1,
                    "children": [
                        {
                            "id": 5,
                            "name": "1-2-2",
                            "parentId": 4,
                            "children": []
                        }
                    ]
                }
            ]
        },
        {
            "id": 7,
            "name": "2",
            "children": []
        }
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
        const ret = {
            id: 3,
            name: '1-1-1',
            parentId: 2,
            children: [{ id: 6, name: '1-1-1-1', parentId: 3, children: [] }]
        }
        expect(findNode(dcTree, node => node.name === '1-1-1')).toEqual(ret)
    })

})

