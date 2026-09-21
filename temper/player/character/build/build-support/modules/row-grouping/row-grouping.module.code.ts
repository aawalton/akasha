export function indexBy<T, K extends keyof T>(arr: readonly T[], key: K): Record<string, T> {
  return Object.fromEntries(arr.map((item) => [String(item[key]), item]))
}

export function groupByCount<T, K extends string>(
  items: readonly T[],
  keyExtractor: (item: T) => K | null
): readonly (readonly [K, number])[] {
  const map = new Map<K, number>()
  for (const item of items) {
    const key = keyExtractor(item)
    if (key === null) continue
    map.set(key, (map.get(key) ?? 0) + 1)
  }
  return Array.from(map.entries())
}
