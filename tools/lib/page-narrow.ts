export interface Narrow {
  readonly kind: string
  readonly keys: readonly string[]
}

export function narrowing(only: Narrow | undefined): (kind: string) => ReadonlySet<string> | null {
  if (only === undefined) return () => null
  const keys = new Set([...only.keys, "slug"])
  return (kind) => (kind === only.kind ? keys : null)
}

export function keptIn<T>(
  held: ReadonlyMap<string, T>,
  only: ReadonlySet<string> | null
): ReadonlyMap<string, T> {
  if (only === null) return held
  const kept = new Map<string, T>()
  for (const [key, one] of held) if (only.has(key)) kept.set(key, one)
  return kept
}
