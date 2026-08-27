export const WALK_SKIP_DIRS: ReadonlySet<string> = new Set([
  "node_modules",
  ".next",
  "dist",
  ".turbo",
  "__fixtures__",
])

const isTsFileName = (name: string): boolean => name.endsWith(".ts") || name.endsWith(".tsx")

export const isUnder = (relPath: string, rootRel: string): boolean =>
  rootRel === "" || relPath === rootRel || relPath.startsWith(`${rootRel}/`)

export const below = (relPath: string, rootRel: string): string =>
  rootRel === "" ? relPath : relPath.slice(rootRel.length + 1)

export const skipsAnySegment = (
  relPath: string,
  rootRel: string,
  skip: ReadonlySet<string>
): boolean => {
  const segments = below(relPath, rootRel).split("/")
  for (let i = 0; i < segments.length - 1; i++) {
    const segment = segments[i]
    if (segment !== undefined && skip.has(segment)) return true
  }
  return false
}

export const walkTsFiles = (
  paths: readonly string[],
  rootRel: string
): readonly string[] => {
  const out: string[] = []
  for (const relPath of paths) {
    if (!isUnder(relPath, rootRel)) continue
    if (skipsAnySegment(relPath, rootRel, WALK_SKIP_DIRS)) continue
    if (!isTsFileName(relPath)) continue
    out.push(relPath)
  }
  return out
}
