// A NARROW NAMES KEYS AND NEVER A PAGE TYPE, so one deriver serves every page type asked the same
// keys. Nothing about a page type is settled when a deriver is built — `chainOf`, `derivedOn` and
// `filedPagesOf` each answer on the first ask for one — and a page type named here would stand in
// the deriver's cache key, so the editor's domain tree, which asks 45 page types the same four keys
// inside one call, would build 45 derivers and re-read every page-type and property-definition page
// in akasha for each.
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
