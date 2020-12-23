import { DEFAULT_CACHE_TIME } from './constant'

export const createStroage = ({
  prefixKey = '',
  storage = sessionStorage,
} = {}) => {
  const WebStorage = class WebStorage {
    storage: Storage

    prefixKey?: string

    constructor() {
      this.storage = storage
      this.prefixKey = prefixKey
    }

    getKey(key: string) {
      return `${this.prefixKey}${key}`.toUpperCase()
    }

    set(
      key: string,
      value: any,
      expire: number | null = DEFAULT_CACHE_TIME
    ): void {
      const stringData = JSON.stringify({
        value,
        expire: expire !== null ? new Date().getTime() + expire * 1000 : null,
      })

      const stringifyValue = stringData

      this.storage.setItem(this.getKey(key), stringifyValue)
    }

    get(key: string, def: any = null): any {
      const item = this.storage.getItem(this.getKey(key))
      if (item) {
        try {
          const decItem = item
          const data = JSON.parse(decItem)
          const { value, expire } = data
          if (expire === null || expire >= new Date().getTime()) {
            return value
          }
          this.remove(this.getKey(key))
        } catch (e) {
          return def
        }
      }
      return def
    }

    remove(key: string) {
      this.storage.removeItem(this.getKey(key))
    }

    clear(): void {
      this.storage.clear()
    }
  }

  return new WebStorage()
}
