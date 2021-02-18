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

/**
 * @description default tree config
 */
const DEFAULT_CONFIG: TreeHelperConfig = {
  id: 'id',
  pid: 'pid',
  children: 'children',
}

/**
 * @description get merged tree config
 */
const getConfig = (config: Partial<TreeHelperConfig>) => ({
  ...DEFAULT_CONFIG,
  ...config,
})

/**
 * @description sort by order field
 */
const compare = (order: string) => (a: any, b: any) => a[order] - b[order]

/**
 * @description Recursion format
 */
const treeNodeFormat = (
  data: any,
  { format, children = 'children' }: FormatTreeConfig = {
    format: (i: any) => i,
  }
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
 * @description Recursion order
 */
const treeNodeOrder = (
  data: any,
  { order = 'order', children = 'children' }: OrderTreeConfig = {}
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
 * @description                   format tree into specfic structure
 * @param  {Array}  treeData      
 * @param  {FormatTreeConfig} opt include format fn and children field
 * @return {Array}                
 */
export function formatTree<T = any>(treeData: T[], opt: FormatTreeConfig): T[] {
  return treeData.map((node) => treeNodeFormat(node, opt))
}

/**
 * @description                  order tree by specfic field
 * @param  {Array}  treeData     
 * @param  {OrderTreeConfig} opt include order field and children field
 * @return {Array}               
 */
export function orderTree<T = any>(treeData: T[], opt: OrderTreeConfig): T[] {
  return treeData.map((node) => treeNodeOrder(node, opt))
}

/**
 * @description            arr to tree 
 * @param  {Array}  arr    
 * @param  {Object} config 
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
 * @description            flat tree to arr
 * @param  {Array}  tree   
 * @param  {Object} config 
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
 * @description            find tree node by callback function
 * @param  {Array}  tree   
 * @param  {Array}  func   callback function
 * @param  {Object} config 
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
