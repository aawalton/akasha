export interface VerdictCoverage {
  readonly observed: number
  readonly declared: number | null
  readonly unit: string
}

export interface VerdictFinding {
  readonly detail: string
  readonly at: string | null
}

export interface AnyVerdict {
  readonly kind: string
  readonly subject: string
  readonly reason: string
  readonly coverage: VerdictCoverage
  readonly findings?: readonly VerdictFinding[]
}

export const VERDICT_ANCHOR = "VERDICT: "

export const FOLD_LINE_BREAKS = /\s*[\r\n]+\s*/g

const HEADLINE: Readonly<Record<string, string | undefined>> = {
  pass: "PASS",
  fail: "FAIL",
}

export function renderCoverage(coverage: VerdictCoverage): string {
  const { observed, declared, unit } = coverage
  if (declared === null) return `${observed} ${unit} (denominator not computed)`
  return `${observed} of ${declared} ${unit}`
}

export function findingLines(findings: readonly VerdictFinding[]): readonly string[] {
  return findings.map((finding) => `  [${finding.at ?? "unattributed"}] ${finding.detail}`)
}

export function verdictHeadline(verdict: AnyVerdict): string {
  const headline = HEADLINE[verdict.kind]
  if (headline === undefined) {
    return `UNREADABLE VERDICT — ${verdict.subject}: this build cannot interpret kind "${verdict.kind}"`
  }
  return `${headline} — ${verdict.subject}: ${verdict.reason} [over ${renderCoverage(verdict.coverage)}]`
}

export function verdictFindingLines(verdict: AnyVerdict): readonly string[] {
  if (HEADLINE[verdict.kind] === undefined) return []
  if (verdict.kind === "pass") return []
  return findingLines(verdict.findings ?? [])
}

export function verdictLine(verdict: AnyVerdict): string {
  return `${VERDICT_ANCHOR}${verdictHeadline(verdict).replace(FOLD_LINE_BREAKS, " ")}`
}

export function emitVerdict(verdict: AnyVerdict): undefined {
  for (const finding of verdictFindingLines(verdict)) process.stderr.write(`${finding}\n`)
  process.stdout.write(`${verdictLine(verdict)}\n`)
}
