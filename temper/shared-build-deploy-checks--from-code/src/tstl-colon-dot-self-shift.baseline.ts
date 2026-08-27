import type { SelfShiftIssue } from "./tstl-colon-dot-self-shift"

export interface SelfShiftBaselineEntry {
  readonly bundleSuffix: string
  readonly method: string
  readonly receiver: string
}

const SEP = "\u0000"

function key(bundleSuffix: string, method: string, receiver: string): string {
  return `${bundleSuffix}${SEP}${method}${SEP}${receiver}`
}

function bundleMemberTail(bundleSuffix: string): string | null {
  const slash = bundleSuffix.lastIndexOf("/")
  if (slash < 0) return null
  const dir = bundleSuffix.slice(0, slash)
  const file = bundleSuffix.slice(slash + 1)
  return file === `${dir}.lua` ? `/${file}` : null
}

function isGrandfathered(issue: SelfShiftIssue, baselineKeys: ReadonlySet<string>): boolean {
  for (const k of baselineKeys) {
    const sepIdx = k.indexOf(SEP)
    const bundleSuffix = k.slice(0, sepIdx)
    if (k !== key(bundleSuffix, issue.method, issue.receiver)) continue
    if (issue.file.endsWith(bundleSuffix)) return true
    const tail = bundleMemberTail(bundleSuffix)
    if (tail !== null && issue.file.endsWith(tail)) return true
  }
  return false
}

export function findUnreachableBaselineRows(
  baseline: readonly SelfShiftBaselineEntry[],
  emittableLuaBasenames: ReadonlySet<string>,
  rosterAddonNames: ReadonlySet<string>
): readonly SelfShiftBaselineEntry[] {
  return baseline.filter((row) => {
    const slash = row.bundleSuffix.lastIndexOf("/")
    const dir = slash < 0 ? null : row.bundleSuffix.slice(0, slash)
    const file = slash < 0 ? row.bundleSuffix : row.bundleSuffix.slice(slash + 1)
    if (!emittableLuaBasenames.has(file)) return true
    if (bundleMemberTail(row.bundleSuffix) !== null) return false
    return dir !== null && !rosterAddonNames.has(dir)
  })
}

export function partitionBaselined(
  issues: readonly SelfShiftIssue[],
  baseline: readonly SelfShiftBaselineEntry[]
): {
  readonly fresh: readonly SelfShiftIssue[]
  readonly grandfathered: readonly SelfShiftIssue[]
} {
  const keys = new Set(baseline.map((e) => key(e.bundleSuffix, e.method, e.receiver)))
  const fresh: SelfShiftIssue[] = []
  const grandfathered: SelfShiftIssue[] = []
  for (const issue of issues) {
    if (!issue.loadScope && isGrandfathered(issue, keys)) grandfathered.push(issue)
    else fresh.push(issue)
  }
  return { fresh, grandfathered }
}

export function dedupeSortBaseline(
  rows: readonly SelfShiftBaselineEntry[]
): readonly SelfShiftBaselineEntry[] {
  const seen = new Set<string>()
  const out: SelfShiftBaselineEntry[] = []
  for (const r of rows) {
    const k = key(r.bundleSuffix, r.method, r.receiver)
    if (seen.has(k)) continue
    seen.add(k)
    out.push({ bundleSuffix: r.bundleSuffix, method: r.method, receiver: r.receiver })
  }
  return out.sort((a, b) => {
    const byBundle = a.bundleSuffix.localeCompare(b.bundleSuffix)
    if (byBundle !== 0) return byBundle
    const byMethod = a.method.localeCompare(b.method)
    if (byMethod !== 0) return byMethod
    return a.receiver.localeCompare(b.receiver)
  })
}
