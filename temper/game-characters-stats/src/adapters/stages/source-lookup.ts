interface SourceCollection<K extends string, V> {
  has: (id: string) => id is K
  data: Record<K, V>
}

export function lookupSourceUnlessSentinel<K extends string, V>(
  collection: SourceCollection<K, V>,
  id: string,
  sentinel: string
): V | null {
  if (id === sentinel) return null
  if (!collection.has(id)) return null
  return collection.data[id]
}
