class EasyFnsError extends Error {
  constructor(m: string) {
    super(m)
    this.name = 'EasyFnsError'
  }
}

export function error(scope: string, m: string): void {
  throw new EasyFnsError(`[${scope}] ${m}`)
}
