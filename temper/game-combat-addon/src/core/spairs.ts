export function spairs<TKey extends string | number, TValue>(
  t: Record<TKey, TValue>,
  order?: (this: void, t: Record<TKey, TValue>, a: TKey, b: TKey) => boolean
): Array<[TKey, TValue]> {
  const keys: TKey[] = []
  for (const [k] of pairs(t)) {
    keys[keys.length] = k
  }

  if (order !== undefined) {
    table.sort(keys, (a, b) => order(t, a, b))
  } else {
    table.sort(keys)
  }

  const sorted: Array<[TKey, TValue]> = []
  for (const [, k] of ipairs(keys)) {
    sorted[sorted.length] = [k, t[k]]
  }
  return sorted
}
