
interface TreeNodeConfig<T = any, K = T> {
  id: string | number
  pid: string | number
  children: string
  order: string | number
  format?: (node: T) => K
}

type NormalTreeConfig = Partial<Omit<TreeNodeConfig, 'order' | 'format'>>

type OrderTreeConfig = Partial<Pick<TreeNodeConfig, 'order' | 'children'>>

type ForMatTreeConfig = Partial<Pick<TreeNodeConfig, 'format' | 'children'>>

export type TreeNode<T> = T & { children?: TreeNode<T>[] };

/**
 * @description default tree config
 */
const DEFAULT_CONFIG: TreeNodeConfig = {
  id: 'id',
  pid: 'pid',
  children: 'children',
  order: 'order',
  format: (node) => node
}

/**
 * @description get merged tree config
 */
const getConfig = (config?: Partial<TreeNodeConfig>) => ({
  ...DEFAULT_CONFIG,
  ...config,
})

/**
 * @description compare order
 */
const compare = <T>(order: string | number) => (a: T, b: T) => a[order] - b[order]

/**
 * @description arr to tree
 */
export const arrToTree = <T>(
  arr: T[],
  config?: NormalTreeConfig
): TreeNode<T>[] => {
  const conf = getConfig(config)
  const { id, pid, children } = conf

  const nodeMap = new Map<string, T>()
  const result: TreeNode<T>[] = []

  for (const node of arr) {
    node[children] = node[children] || []
    nodeMap.set(node[id], node)
  }

  for (const node of arr) {
    const parent = nodeMap.get(node[pid])
      ; (parent ? parent[children] : result).push(node)
  }

  return result
}

/**
 * @description order tree core
 */
const treeNodeOrder = <T>(
  data: TreeNode<T>,
  config?: OrderTreeConfig
) => {
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
    : { ...data, }
}

/**
 * @description format tree core
 */
const treeNodeFormat = <T, K = T>(
  data: TreeNode<T>,
  config?: ForMatTreeConfig
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
export const orderTree = <T>(treeData: TreeNode<T>[], opt?: OrderTreeConfig) =>
  treeData.map((node) => treeNodeOrder<T>(node, opt))

/**
 * @description format tree
 */
export const formatTree = <T>(treeData: TreeNode<T>[], opt?: ForMatTreeConfig) =>
  treeData.map((node) => treeNodeFormat<T>(node, opt))


/**
 * @description flat tree to arr            
 */
export const treeToArr = <T>(
  tree: TreeNode<T>[],
  config?: NormalTreeConfig
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
  tree: TreeNode<T>[],
  func: (node: T) => boolean,
  config?: NormalTreeConfig
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
  tree: TreeNode<T>[],
  func: (node: T) => boolean,
  config?: NormalTreeConfig
): T | T[] | null => {
  const conf = getConfig(config)
  const { children } = conf

  const result: T[] = []
  const visitedSet = new Set<T>()

  while (tree.length) {
    const node = tree[0]
    if (visitedSet.has(node)) {
      result.pop()
      tree.shift()
    } else {
      visitedSet.add(node)
      node[children!] && tree.unshift(...node[children!])
      result.push(node)
      if (func(node)) {
        return result
      }
    }
  }
  return null
}
