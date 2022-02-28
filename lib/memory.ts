export interface MemoryCache<V = any> {
  /**
   * @description cached value
   */
  value?: V

  /**
   * @description milisecond to expire, timestamp
   */
  maxAge: number

  /**
   * @description created at, timestamp
   */
  createdAt: number
}

export class Memory<T = any, V = any> {
  private cache: { [key in keyof T]?: MemoryCache<V> } = {}
  private maxAge: number

  constructor(maxAge = 0) {
    this.maxAge = maxAge
  }

  set<K extends keyof T>(key: K, value: V, expires?: number) {
    this.cache[key] = {
      maxAge: expires || this.maxAge,
      value,
      createdAt: Date.now(),
    }
  }

  get<K extends keyof T>(key: K) {
    const cachedItem = this.cache[key]
    if (!cachedItem) return null
    const isExpired = Date.now() - cachedItem.createdAt > cachedItem.maxAge
    isExpired && this.remove(key)
    return isExpired ? null : cachedItem.value
  }

  remove<K extends keyof T>(key: K) {
    Reflect.deleteProperty(this.cache, key)
  }

  clear() {
    this.cache = {}
  }
}
