
import { type Roots } from "../../page/page"
import { locate } from "../../repo/roots/roots"
import type { Outcome } from "../../outcome/outcome"

export function owedBy(outcomes: readonly Outcome[]): readonly string[] {
  const owed: string[] = []
  for (const outcome of outcomes) {
    if (outcome.verdict !== "fail") continue
    for (const absolute of outcome.owed ?? []) if (!owed.includes(absolute)) owed.push(absolute)
  }
  return owed
}

export function namedOwed(owed: readonly string[], roots: Roots): readonly string[] {
  return owed.map((absolute) => {
    const at = locate(absolute, roots)
    return at === null || at.repo !== "instructions" ? absolute : at.relPath
  })
}

export function loadingLines(outcomes: readonly Outcome[], roots: Roots): readonly string[] {
  const owed = owedBy(outcomes)
  if (owed.length === 0) return []
  const named = namedOwed(owed, roots)
  return [
    `owed:   ${owed.length} file(s) above are owed a reading, and this one call loads all of them:`,
    `        ops read ${named.map((path) => `--file-path ${path}`).join(" ")}`,
  ]
}
