class EasyFnsError extends Error {
  constructor(m: string) {
    super(m)
    this.name = 'EasyFnsError'
  }
}

export const e = (scope: string, m: string) => {
  throw new EasyFnsError(`[${scope}] ${m}`)
}
