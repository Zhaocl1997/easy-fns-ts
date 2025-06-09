import { easyDeepClone, easyObjectGet } from './object'

/**
 * @description tree structure data.
 * First generic is base data structure.
 * Second generic is 'children' field, default is 'children'.
 */
export type TreeNodeItem<T, C extends string = 'children'> = T
  & Partial<Record<C, TreeNodeItem<T, C>[]>>

/**
 * @description tree node config interface
 */
export interface TreeNodeConfig<T, _, C extends string> {
  id: string | number
  pid: string | number
  orderField: DeepKeyOfWithOmit<T, C>
  childrenField: C
}

/**
 * @description default tree config
 */
function DEFAULT_CONFIG<T, R, C extends string>(): TreeNodeConfig<T, R, C> {
  return {
    id: 'id',
    pid: 'pid',
    childrenField: 'children' as C,
    orderField: 'order' as DeepKeyOfWithOmit<T, C>,
  }
}

/**
 * @description get merged tree config
 */
function getConfig<T extends object, R = T, C extends string = 'children'>(config?: Partial<TreeNodeConfig<T, R, C>>): TreeNodeConfig<T, R, C> {
  return {
    ...DEFAULT_CONFIG<T, R, C>(),
    ...config,
  }
}

/**
 * @description compare order
 */
function compare<T extends object, C extends string>(order: DeepKeyOfWithOmit<T, C>) {
  return (a: T, b: T) =>
    Number(easyObjectGet(a, order as DeepKeyOf<T>)) - Number(easyObjectGet(b, order as DeepKeyOf<T>))
}

/**
 * @description order tree core
 */
function treeNodeOrder<T extends object, R = T, C extends string = 'children'>(data: TreeNodeItem<T, C>, config?: Partial<TreeNodeConfig<T, R, C>>): TreeNodeItem<T, C> {
  const conf = getConfig<T, R, C>(config)
  const { orderField, childrenField } = conf

  if (Array.isArray(data[childrenField])) {
    data[childrenField] = data[childrenField].sort(compare<T, C>(orderField)) as TreeNodeItem<T, C>[C]
  }

  const hasChild = Array.isArray(data[childrenField]) && data[childrenField].length > 0

  return hasChild
    ? {
        ...data,
        [childrenField]: data[childrenField]?.map((i: TreeNodeItem<T, C>) =>
          treeNodeOrder(i, config),
        ),
      }
    : { ...data }
}

/**
 * @description order tree
 */
export function orderTree<T extends object, C extends string = 'children'>(treeData: TreeNodeItem<T, C>[], config?: Partial<TreeNodeConfig<T, any, C>>): TreeNodeItem<T, C>[] {
  return treeData.map(node => treeNodeOrder<T, any, C>(node, config))
}

/**
 * @description format tree core
 */
function treeNodeFormat<T extends object, R = T, C extends string = 'children'>(data: TreeNodeItem<T, C>, callback: (item: T) => R, config?: Partial<TreeNodeConfig<T, R, C>>): TreeNodeItem<R, C> | null {
  const conf = getConfig<T, R, C>(config)
  const { childrenField } = conf

  const hasChild = Array.isArray(data[childrenField]) && data[childrenField].length > 0
  const formattedData = callback(data)!

  return hasChild
    ? {
        ...formattedData,
        [childrenField]: data[childrenField]?.map(
          (i: TreeNodeItem<T, C>): R =>
            treeNodeFormat<T, R, C>(i, callback, config)!,
        ),
      }
    : { ...formattedData }
}

/**
 * @description format tree
 */
export function formatTree<T extends object, R = T, C extends string = 'children'>(treeData: TreeNodeItem<T, C>[], callback: (item: T) => R, config?: Partial<TreeNodeConfig<T, R, C>>): TreeNodeItem<R, C>[] {
  return treeData
    .map(node => treeNodeFormat<T, R, C>(node, callback, config))
    .filter(node => node !== null)
}

/**
 * @description filter tree core
 */
function treeNodeFilter<T extends object, R = T, C extends string = 'children'>(data: TreeNodeItem<T, C>, callback: (item: T) => boolean, config?: Partial<TreeNodeConfig<T, R, C>>): TreeNodeItem<T, C> | null {
  const conf = getConfig<T, R, C>(config)
  const { childrenField } = conf

  if (callback(data)) {
    return data
  }

  if (Array.isArray(data[childrenField])) {
    const filteredChildren = data[childrenField]
      .map(child => treeNodeFilter(child, callback, config))
      .filter(child => child !== null) as TreeNodeItem<T, C>[]

    if (filteredChildren.length > 0) {
      return {
        ...data,
        [childrenField]: filteredChildren,
      }
    }
  }

  return null
}

/**
 * @description filter tree
 */
export function filterTree<T extends object, C extends string = 'children'>(treeData: TreeNodeItem<T, C>[], callback: (item: T) => boolean, config?: TreeNodeConfig<T, T, C>): TreeNodeItem<T, C>[] {
  return treeData
    .map(node => treeNodeFilter(node, callback, config))
    .filter(node => node !== null)
}

/**
 * @description arr to tree
 */
export function arrToTree<T extends object, R = T, C extends string = 'children'>(arr: T[], config?: Partial<TreeNodeConfig<T, R, C>>): TreeNodeItem<T, C>[] {
  const conf = getConfig<T, R, C>(config)
  const { id, pid, childrenField } = conf

  const nodeMap = new Map<string | number, TreeNodeItem<T, C>>()
  const result: TreeNodeItem<T, C>[] = []

  for (const node of arr) {
    const treeNode = node as TreeNodeItem<T, C>
    treeNode[childrenField] = treeNode[childrenField] || [] as TreeNodeItem<T, C>[C]
    nodeMap.set(node[id], treeNode)
  }

  for (const node of arr) {
    const treeNode = node as TreeNodeItem<T, C>
    const parent = nodeMap.get(node[pid])
    ;(parent ? parent[childrenField] : result)?.push(treeNode)
  }

  return result
}

/**
 * @description flat tree to arr
 */
export function treeToArr<T extends object, R = T, C extends string = 'children'>(
  tree: TreeNodeItem<T, C>[],
  config?: Partial<TreeNodeConfig<T, R, C>>,
): T[] {
  const conf = getConfig<T, R, C>(config)
  const { childrenField } = conf

  const result: T[] = [...tree]

  for (let i = 0; i < result.length; i++) {
    const currentNode = result[i] as TreeNodeItem<T, C>

    if (Array.isArray(currentNode[childrenField])) {
      result.splice(i + 1, 0, ...currentNode[childrenField])
    }
  }

  result.forEach((element: T) => {
    delete (element as Record<string, any>)[childrenField]
  })

  return result
}

/**
 * @description find tree node by callback function
 */
export function findNode<T extends object, R = T, C extends string = 'children'>(tree: TreeNodeItem<T, C>[], func: (node: T) => boolean, config?: Partial<TreeNodeConfig<T, R, C>>): T | null {
  const conf = getConfig<T, R, C>(config)
  const { childrenField } = conf

  const queue = [...tree]

  for (const node of queue) {
    if (func(node))
      return node
    if (node[childrenField]) {
      queue.push(...node[childrenField])
    }
  }

  return null
}

/**
 * @description find node path
 */
export function findPath<T extends object, R = T, C extends string = 'children'>(tree: TreeNodeItem<T, C>[], callback: (node: T) => boolean, config?: Partial<TreeNodeConfig<T, R, C>>): T[] | null {
  const treeData = easyDeepClone(tree)
  const conf = getConfig<T, R, C>(config)
  const { childrenField } = conf

  const result: T[] = []
  const visitedSet = new Set<T>()

  while (treeData.length) {
    const node = treeData[0]
    if (visitedSet.has(node)) {
      result.pop()
      treeData.shift()
    }
    else {
      visitedSet.add(node)
      if (node[childrenField]) {
        treeData.unshift(...node[childrenField])
      }
      result.push(node)
      if (callback(node)) {
        return result
      }
    }
  }
  return null
}
