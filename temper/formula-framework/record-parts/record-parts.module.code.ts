export function valuesOf<V>(obj: Record<string, V>): readonly V[] {
  return Object.values(obj)
}

export function keysOf<K extends string>(obj: Record<K, unknown>): readonly K[] {
  return Object.keys(obj).filter((k): k is K => k in obj)
}

export function getFromPartialRecord<T, K extends string>(
  record: Partial<Record<K, T>>,
  key: K
): T | undefined {
  return record[key]
}

export const typedPartialRecordKeys = <K extends string>(
  record: Partial<Record<K, unknown>>
): readonly K[] => {
  const out: K[] = []
  for (const key in record) {
    out.push(key)
  }
  return out
}
