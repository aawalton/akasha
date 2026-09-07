export function sortedOnce(values: readonly string[]): readonly string[] {
  return [...new Set(values)].sort()
}
