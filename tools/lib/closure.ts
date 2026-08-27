export function closure(
  from: readonly string[],
  successorsOf: (at: string) => readonly string[]
): readonly string[] {
  const seen = new Set<string>()
  const queue = [...from]
  while (queue.length > 0) {
    const at = queue.shift()
    if (at === undefined || seen.has(at)) continue
    seen.add(at)
    for (const next of successorsOf(at)) queue.push(next)
  }
  return [...seen]
}
