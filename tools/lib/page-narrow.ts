export function narrowing(only: readonly string[] | undefined): ReadonlySet<string> | null {
  if (only === undefined) return null
  return new Set([...only, "slug"])
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
