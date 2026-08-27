import { below, isUnder, skipsAnySegment } from "./discover-workspace-walk.ts"
import { matchAny } from "./globs.ts"

const SCAN_SKIP_DIRS: ReadonlySet<string> = new Set([
  "node_modules",
  ".next",
  "dist",
  ".turbo",
  "__fixtures__",
])

export const scanFiles = (
  paths: readonly string[],
  rootRel: string,
  matchAgainstRel: string,
  patterns: readonly string[]
): readonly string[] => {
  if (patterns.length === 0) return []
  const out: string[] = []
  for (const relPath of paths) {
    if (!isUnder(relPath, rootRel)) continue
    if (skipsAnySegment(relPath, rootRel, SCAN_SKIP_DIRS)) continue
    if (!isUnder(relPath, matchAgainstRel)) continue
    if (matchAny(patterns, below(relPath, matchAgainstRel))) out.push(relPath)
  }
  return out
}
