function packageScopeOf(path: string, packageRoots: readonly string[]): string | null {
  let best: string | null = null
  for (const root of packageRoots) {
    if (!path.startsWith(`${root}/`)) continue
    if (best === null || root.length > best.length) best = root
  }
  return best
}

export function pairingScope(path: string, packageRoots: readonly string[]): string {
  return packageScopeOf(path, packageRoots) ?? path.slice(0, path.lastIndexOf("/") + 1)
}

export interface ChecksumSubstitutionSite {
  readonly file: string
  readonly line: number
}

function sharedDirectoryDepth(a: string, b: string): number {
  const left = a.split("/")
  const right = b.split("/")
  let shared = 0
  while (shared < left.length - 1 && shared < right.length - 1 && left[shared] === right[shared]) {
    shared++
  }
  return shared
}

function scopeDepth(scope: string): number {
  const trimmed = scope.replace(/\/+$/, "")
  return trimmed === "" ? 0 : trimmed.split("/").length
}

export function unmatchedEmits<E extends { readonly file: string; readonly line: number }>(
  emits: readonly E[],
  sites: readonly ChecksumSubstitutionSite[],
  scope: string
): readonly E[] {
  const floor = scopeDepth(scope)
  const claimed = sites.map(() => false)
  const unmatched = new Set(emits)

  const nearPairs: { emit: E; site: number; depth: number }[] = []
  for (const emit of emits) {
    for (const [site, where] of sites.entries()) {
      const depth = sharedDirectoryDepth(emit.file, where.file)
      if (depth > floor) nearPairs.push({ emit, site, depth })
    }
  }
  nearPairs.sort(
    (a, b) =>
      b.depth - a.depth ||
      a.emit.file.localeCompare(b.emit.file) ||
      a.emit.line - b.emit.line ||
      a.site - b.site
  )
  for (const pair of nearPairs) {
    if (claimed[pair.site] === true) continue
    if (!unmatched.has(pair.emit)) continue
    claimed[pair.site] = true
    unmatched.delete(pair.emit)
  }

  let spare = claimed.filter((taken) => !taken).length
  for (const emit of [...unmatched]) {
    if (spare === 0) break
    spare--
    unmatched.delete(emit)
  }
  return [...unmatched]
}
