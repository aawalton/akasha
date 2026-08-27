export type DeliveryVerdict =
  | "injected"
  | "self-found"
  | "lost"
  | "not-yet"
  | "not-enqueued"
  | "undetermined"

export interface DeliveryDecision {
  readonly verdict: DeliveryVerdict
  readonly reason: string
}

export const VERDICT_GLOSS = {
  injected: "the channel woke the seat — the model saw it",
  "self-found": "never injected; the seat later read its own inbox and found it",
  lost: "offered and never taken, AND the seat provably moved past it",
  "not-yet":
    "offered, not taken, and nothing yet proves the seat had its\nchance — a busy seat mid-turn reads exactly like a swallow",
  "not-enqueued":
    "no row: the send was refused, so it never entered the\nchannel — the send command's own dead-recipient guard is what\nproduces it",
  undetermined:
    "could not look — store unreadable, or the message predates\ntranscript retention, where a miss is unobservable",
} satisfies Record<DeliveryVerdict, string>

const VERDICT_PROSE = Object.fromEntries(
  Object.entries(VERDICT_GLOSS).map(([verdict, gloss]) => [verdict, gloss.replaceAll("\n", " ")])
) as Record<DeliveryVerdict, string>

export interface DeliveryFinding {
  readonly detail: string
  readonly at: string | null
}

export interface DeliveryReading {
  readonly subject: string
  readonly state: DeliveryVerdict
  readonly reason: string
  readonly observedAtMs: number
  readonly coverage: {
    readonly observed: number
    readonly declared: number
    readonly unit: string
  }
  readonly evidence: DeliveryDecision
  readonly findings: readonly DeliveryFinding[]
}

const COVERAGE_UNIT = "transcripts"

function atLeastOne(
  findings: readonly DeliveryFinding[],
  fallback: DeliveryFinding
): readonly DeliveryFinding[] {
  const [first, ...rest] = findings
  return first === undefined ? [fallback] : [first, ...rest]
}

export function deliveryReading(opts: {
  readonly decision: DeliveryDecision
  readonly messageId: string
  readonly findings: readonly DeliveryFinding[]
  readonly transcriptsScanned: number
  readonly observedAtMs: number
}): DeliveryReading {
  const { decision, messageId: subject, observedAtMs } = opts
  const reason = `${decision.verdict}/${decision.reason} — ${VERDICT_PROSE[decision.verdict]}`
  const coverage = {
    observed: opts.transcriptsScanned,
    declared: opts.transcriptsScanned,
    unit: COVERAGE_UNIT,
  }
  const base = { subject, reason, observedAtMs, coverage, evidence: decision } as const
  switch (decision.verdict) {
    case "injected":
    case "not-yet":
    case "undetermined":
      return { ...base, state: decision.verdict, findings: opts.findings }
    case "self-found":
    case "lost":
      return {
        ...base,
        state: decision.verdict,
        findings: atLeastOne(opts.findings, { detail: reason, at: null }),
      }
    case "not-enqueued":
      return {
        ...base,
        state: "not-enqueued",
        coverage: { ...coverage, observed: 0, declared: 0 },
        findings: [],
      }
    default:
      throw new Error(`unhandled delivery verdict: ${String(decision.verdict)}`)
  }
}
