import { easyDeepClone } from './object'

/**
 * @description tree structure data.
 * First generic is base data structure.
 * Second generic is 'children' field, default is 'children'.
 *
 * @example
 * const treeItem: TreeNodeItem<{ id: number }> = { id: 1, children: [] }
 * const treeData: TreeNodeItem<{ id: number }>[] = [{ id: 1, children: [] }]
 * const customChildrenField: TreeNodeItem<{ id: number }, 'child'>[] = [{ id: 1, child: [] }]
 */
export type TreeNodeItem<T, C extends string = 'children'> = T &
  Partial<Record<C, TreeNodeItem<T>[]>>

/**
 * @description tree node config interface
 */
export interface TreeNodeConfig<T, K = T> {
  id: string | number
  pid: string | number
  children: string
  order: string | number
  format?: (node: T) => K
}

export type NormalTreeConfig<T> = Partial<
  Omit<TreeNodeConfig<T>, 'order' | 'format'>
>

export type OrderTreeConfig<T> = Partial<
  Pick<TreeNodeConfig<T>, 'order' | 'children'>
>

export type FormatTreeConfig<T> = Partial<
  Pick<TreeNodeConfig<T>, 'format' | 'children'>
>

/**
 * @description default tree config
 */
export const DEFAULT_CONFIG: TreeNodeConfig<any> = {
  id: 'id',
  pid: 'pid',
  children: 'children',
  order: 'order',
  format: (node) => node,
}

/**
 * @description get merged tree config
 */
const getConfig = <T>(config?: Partial<TreeNodeConfig<T>>) => ({
  ...DEFAULT_CONFIG,
  ...config,
})

/**
 * @description compare order
 */
const compare =
  <T>(order: string | number) =>
  (a: T, b: T) =>
    a[order] - b[order]

/**
 * @description arr to tree
 */
export const arrToTree = <T>(
  arr: T[],
  config?: NormalTreeConfig<T>
): TreeNodeItem<T>[] => {
  const conf = getConfig(config)
  const { id, pid, children } = conf

  const nodeMap = new Map<string, T>()
  const result: TreeNodeItem<T>[] = []

  for (const node of arr) {
    node[children] = node[children] || []
    nodeMap.set(node[id], node)
  }

  for (const node of arr) {
    const parent = nodeMap.get(node[pid])
    ;(parent ? parent[children] : result).push(node)
  }

  return result
}

/**
 * @description order tree core
 */
const treeNodeOrder = <T>(
  data: TreeNodeItem<T>,
  config?: OrderTreeConfig<T>
): typeof data => {
  const conf = getConfig(config)
  const { order, children } = conf

  data[children] = data[children]
    ? data[children].sort(compare(order))
    : data[children]

  const hasChild = Array.isArray(data[children]) && data[children].length > 0

  return hasChild
    ? {
        ...data,
        [children]: data[children].map((i: T) =>
          treeNodeOrder(i, {
            order,
            children,
          })
        ),
      }
    : { ...data }
}

/**
 * @description format tree core
 */
const treeNodeFormat = <T, K = T>(
  data: TreeNodeItem<T>,
  config?: FormatTreeConfig<T>
) => {
  const conf = getConfig(config)
  const { format, children } = conf

  const hasChild = Array.isArray(data[children]) && data[children].length > 0
  const formattedData = format!(data) || {}

  return hasChild
    ? {
        ...formattedData,
        [children]: data[children].map((i: T): K[] =>
          treeNodeFormat<T, K>(i, {
            children,
            format,
          })
        ),
      }
    : { ...formattedData }
}

/**
 * @description order tree
 */
export const orderTree = <T>(
  treeData: TreeNodeItem<T>[],
  opt?: OrderTreeConfig<T>
): typeof treeData => treeData.map((node) => treeNodeOrder<T>(node, opt))

/**
 * @description format tree
 */
export const formatTree = <T>(
  treeData: TreeNodeItem<T>[],
  opt?: FormatTreeConfig<T>
) => treeData.map((node) => treeNodeFormat<T>(node, opt))

/**
 * @description flat tree to arr
 */
export const treeToArr = <T>(
  tree: TreeNodeItem<T>[],
  config?: NormalTreeConfig<T>
): T[] => {
  const conf = getConfig(config)
  const { children } = conf

  const result: T[] = [...tree]

  for (let i = 0; i < result.length; i++) {
    if (!result[i][children]) continue
    result.splice(i + 1, 0, ...result[i][children])
  }

  result.forEach((element: T) => {
    delete element[children]
  })

  return result
}

/**
 * @description find tree node by callback function
 */
export const findNode = <T>(
  tree: TreeNodeItem<T>[],
  func: (node: T) => boolean,
  config?: NormalTreeConfig<T>
): T | null => {
  const conf = getConfig(config)
  const { children } = conf

  for (const node of tree) {
    if (func(node)) return node
    node[children] && tree.push(...node[children])
  }

  return null
}

/**
 * @description find node path
 */
export const findPath = <T>(
  tree: TreeNodeItem<T>[],
  func: (node: T) => boolean,
  config?: NormalTreeConfig<T>
): T | T[] | null => {
  const treeData = easyDeepClone(tree)
  const conf = getConfig(config)
  const { children } = conf

  const result: T[] = []
  const visitedSet = new Set<T>()

  while (treeData.length) {
    const node = treeData[0]
    if (visitedSet.has(node)) {
      result.pop()
      treeData.shift()
    } else {
      visitedSet.add(node)
      node[children!] && treeData.unshift(...node[children!])
      result.push(node)
      if (func(node)) {
        return result
      }
    }
  }
  return null
}
