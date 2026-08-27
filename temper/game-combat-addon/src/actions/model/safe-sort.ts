export function compactAndSort<T>(list: T[], sortsBefore: (a: T, b: T) => boolean): T[] {
  const dense: T[] = []
  for (let i = 0; i < list.length; i = i + 1) {
    const e = list[i]
    if (e !== undefined) {
      dense.push(e)
    }
  }
  for (let i = 1; i < dense.length; i = i + 1) {
    const value = dense[i]
    if (value === undefined) {
      continue
    }
    let j = i - 1
    while (j >= 0) {
      const prev = dense[j]
      if (prev === undefined || !sortsBefore(value, prev)) {
        break
      }
      dense[j + 1] = prev
      j = j - 1
    }
    dense[j + 1] = value
  }
  return dense
}
