interface TreeHelperConfig {
  id: string
  pid: string
  children: string
}

interface FormatTreeConfig {
  format: any
  children?: string
}

interface OrderTreeConfig {
  order?: string
  children?: string
}

const DEFAULT_CONFIG: TreeHelperConfig = {
  id: 'id',
  pid: 'pid',
  children: 'children',
}

const getConfig = (config: Partial<TreeHelperConfig>) => ({
  ...DEFAULT_CONFIG,
  ...config,
})

/**
 * @description 根据指定字段排序
 */
const compare = (order: string) => (a: any, b: any) => a[order] - b[order]

/**
 * @description 递归格式化树
 */
const treeNodeFormat = (
  data: any,
  { format, children = 'children' }: FormatTreeConfig
) => {
  const hasChild = Array.isArray(data[children]) && data[children].length > 0
  const formattedData = format(data) || {}
  if (hasChild) {
    return {
      ...formattedData,
      [children]: data[children].map((i: number) =>
        treeNodeFormat(i, {
          children,
          format,
        })
      ),
    }
  } else {
    return {
      ...formattedData,
    }
  }
}

/**
 * @description 递归排序树
 */
const treeNodeOrder = (
  data: any,
  { order = 'order', children = 'children' }: OrderTreeConfig
) => {
  data[children] = data[children]
    ? data[children].sort(compare(order))
    : data[children]

  const hasChild = Array.isArray(data[children]) && data[children].length > 0
  if (hasChild) {
    return {
      ...data,
      [children]: data[children].map((i: number) =>
        treeNodeOrder(i, {
          order,
          children,
        })
      ),
    }
  } else {
    return {
      ...data,
    }
  }
}

/**
 * @description                   格式化树为指定结构
 * @param  {Array}  treeData      要格式化的树状结构数据
 * @param  {FormatTreeConfig} opt 包含格式化方法和children字段
 * @return {Array}                格式化后的树
 */
export function formatTree<T = any>(treeData: T[], opt: FormatTreeConfig): T[] {
  return treeData.map((node) => treeNodeFormat(node, opt))
}

/**
 * @description                  根据指定字段排序树状结构
 * @param  {Array}  treeData     要排序的树状结构数据
 * @param  {OrderTreeConfig} opt 包含order字段和children字段
 * @return {Array}               排序好的树
 */
export function orderTree<T = any>(treeData: T[], opt: OrderTreeConfig): T[] {
  return treeData.map((node) => treeNodeOrder(node, opt))
}

/**
 * @description            生成树
 * @param  {Array}  arr    要构造的数组
 * @param  {Object} config 树配置
 * @return {Array}
 */
export function arrToTree<T = any>(
  arr: any[],
  config: Partial<TreeHelperConfig> = {}
): T[] {
  const conf = getConfig(config) as TreeHelperConfig
  const { id, pid, children } = conf

  const nodeMap = new Map()
  const result: T[] = []

  for (const node of arr) {
    node[children] = node[children] || []
    nodeMap.set(node[id], node)
  }
  for (const node of arr) {
    const parent = nodeMap.get(node[pid])
    ;(parent ? parent.children : result).push(node)
  }
  return result
}

/**
 * @description            平铺树
 * @param  {Array}  tree   要平铺的树
 * @param  {Object} config 树配置
 * @return {Array}
 */
export function treeToArr<T = any>(
  tree: any,
  config: Partial<TreeHelperConfig> = {}
): T {
  const conf = getConfig(config) as TreeHelperConfig
  const { children } = conf

  const result: any = [...tree]

  for (let i = 0; i < result.length; i++) {
    if (!result[i][children]) continue
    result.splice(i + 1, 0, ...result[i][children])
  }

  result.forEach((element: any) => {
    delete element[children]
  })

  return result
}

/**
 * @description            在树中查找节点
 * @param  {Array}  tree   树状结构
 * @param  {Array}  func   查询函数
 * @param  {Object} config 树配置
 * @return {Array}
 */
export function findNode<T = any>(
  tree: any,
  func: any,
  config: Partial<TreeHelperConfig> = {}
): T | null {
  const conf = getConfig(config) as TreeHelperConfig
  const { children } = conf

  const result: any = [...tree]

  for (const node of result) {
    if (func(node)) return node
    node[children] && result.push(...node[children])
  }

  return null
}
