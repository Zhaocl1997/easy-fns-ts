interface TreeHelperConfig {
  id: string
  children: string
  pid: string
}

const DEFAULT_CONFIG: TreeHelperConfig = {
  id: 'id',
  children: 'children',
  pid: 'pid',
}

const getConfig = (config: Partial<TreeHelperConfig>) => ({
  ...DEFAULT_CONFIG,
  ...config,
})

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
  const { id, children, pid } = conf

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
