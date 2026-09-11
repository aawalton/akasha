export type InFlightKeys = {
  readonly claim: (key: string) => boolean
  readonly release: (key: string) => void
}

export function inFlightKeys(): InFlightKeys {
  const held = new Set<string>()
  return {
    claim: (key) => {
      if (held.has(key)) return false
      held.add(key)
      return true
    },
    release: (key) => {
      held.delete(key)
    },
  }
}
