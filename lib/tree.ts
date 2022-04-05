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
export interface TreeNodeConfig<T, R = T, C extends string = 'children'> {
  id: string | number
  pid: string | number
  children: string
  order: string | number
  format?: (node: TreeNodeItem<T, C>) => R | undefined
}

export type NormalTreeConfig<T> = Partial<
  Omit<TreeNodeConfig<T>, 'order' | 'format'>
>

export type OrderTreeConfig<T> = Partial<
  Pick<TreeNodeConfig<T>, 'order' | 'children'>
>

export type FormatTreeConfig<T, R = any> = Partial<
  Pick<TreeNodeConfig<T, R>, 'format' | 'children'>
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
const getConfig = <T, R = any>(config?: Partial<TreeNodeConfig<T, R>>) => ({
  ...DEFAULT_CONFIG,
  ...config,
})

/**
 * @description compare order
 */
const compare =
  <T>(order: string | number) =>
  (a: T, b: T) =>
    Number(a[order]) - Number(b[order])

/**
 * @description arr to tree
 */
export const arrToTree = <T>(
  arr: T[],
  config?: NormalTreeConfig<T>,
  extra?: { transformEmptyChildrenToNull: boolean }
): TreeNodeItem<T>[] => {
  const conf = getConfig<T>(config)
  const { id, pid, children } = conf

  const nodeMap = new Map<string, T>()
  let result: TreeNodeItem<T>[] = []

  for (const node of arr) {
    node[children] = node[children] || []
    nodeMap.set(node[id], node)
  }

  for (const node of arr) {
    const parent = nodeMap.get(node[pid])
    ;(parent ? parent[children] : result).push(node)
  }

  if (extra?.transformEmptyChildrenToNull) {
    result = formatTree(result, {
      format: (node) =>
        node[children].length === 0
          ? {
              ...node,
              [children]: null,
            }
          : node,
    })
  }

  return result
}

/**
 * @description order tree core
 */
const treeNodeOrder = <T>(
  data: TreeNodeItem<T>,
  config?: OrderTreeConfig<T>
): TreeNodeItem<T> => {
  const conf = getConfig<T>(config)
  const { order, children } = conf

  data[children] = data[children]
    ? data[children].sort(compare<T>(order))
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
const treeNodeFormat = <T, R = T>(
  data: TreeNodeItem<T>,
  config?: FormatTreeConfig<T, R>
): TreeNodeItem<R> => {
  const conf = getConfig<T, R>(config)
  const { format, children } = conf

  const hasChild = Array.isArray(data[children]) && data[children].length > 0
  const formattedData = format!(data) || {}

  return hasChild
    ? {
        ...formattedData,
        [children]: data[children].map(
          (i: T): R =>
            treeNodeFormat<T, R>(i, {
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
): TreeNodeItem<T>[] => treeData.map((node) => treeNodeOrder<T>(node, opt))

/**
 * @description format tree
 */
export const formatTree = <T, R = T>(
  treeData: TreeNodeItem<T>[],
  opt?: FormatTreeConfig<T, R>
) => treeData.map((node) => treeNodeFormat<T, R>(node, opt))

/**
 * @description flat tree to arr
 */
export const treeToArr = <T>(
  tree: TreeNodeItem<T>[],
  config?: NormalTreeConfig<T>
): T[] => {
  const conf = getConfig<T>(config)
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
  const conf = getConfig<T>(config)
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
  const conf = getConfig<T>(config)
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
