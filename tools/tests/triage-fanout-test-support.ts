import type { FanoutTriageResult } from "../lib/triage-fanout-log.ts"

export const AT = 1_700_000_000_000

export function evidenceOf(result: FanoutTriageResult) {
  return result.evidence
}

export function resolvedAttributionOf(result: FanoutTriageResult, startsWith: string) {
  const line = evidenceOf(result).failLines.find((l) => l.evidence.startsWith(startsWith))
  if (line === undefined) throw new Error(`no fail line starting with ${startsWith}`)
  if (line.attribution.kind !== "resolved") {
    throw new Error(`expected a resolved attribution, got ${line.attribution.kind}`)
  }
  return line.attribution
}
