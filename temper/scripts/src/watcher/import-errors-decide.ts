import { crashSignatureKey } from "@temper/shared-capture-errors-decision-core/crash-signatures"
import type { LivenessVerdict } from "@temper/shared-capture-errors-decision-core/liveness"
import type { ErrorEntry } from "@temper/shared-capture-errors-core/types"
import type { Triage, TriageVerdict } from "@temper/shared-capture-errors-decision-core/triage"

export interface TemperErrorEnvelope {
  readonly kind: "temper-error"
  readonly signature: string
  readonly traceback: string
  readonly message: string
  readonly count: number
  readonly firstSeenAt: string
  readonly lastSeenAt: string
  readonly eventCode: number
  readonly account: string
  readonly character: string
  readonly triage: Triage
}

export interface EntryVerdict {
  readonly stale: boolean
  readonly triage: Triage
}

export function isStaleResidue(liveness: LivenessVerdict, triage: TriageVerdict): boolean {
  return liveness.verdict === "stale" || triage.triage === "stale-ram"
}

export interface ErrorDecision {
  readonly envelopes: readonly TemperErrorEnvelope[]
  readonly nextSeen: ReadonlyMap<string, number>
  readonly suppressed: number
}

function identityFor(entry: ErrorEntry): string {
  return crashSignatureKey(entry.message, entry.traceback)
}

function toIso(epochSeconds: number): string {
  return new Date(epochSeconds * 1000).toISOString()
}

export function decideErrorEmissions(
  priorSeen: ReadonlyMap<string, number>,
  entries: readonly ErrorEntry[],
  verdictFor: (entry: ErrorEntry) => EntryVerdict
): ErrorDecision {
  const envelopes: TemperErrorEnvelope[] = []
  const nextSeen = new Map<string, number>(priorSeen)
  let suppressed = 0

  for (const entry of entries) {
    const identity = identityFor(entry)
    const prior = priorSeen.get(identity)
    const isNew = prior === undefined
    const increased = prior !== undefined && entry.count > prior

    const recorded = nextSeen.get(identity)
    if (recorded === undefined || entry.count > recorded) {
      nextSeen.set(identity, entry.count)
    }

    if (!(isNew || increased)) continue

    const verdict = verdictFor(entry)
    if (verdict.stale) {
      suppressed += 1
      continue
    }

    const traceback = entry.traceback
    envelopes.push({
      kind: "temper-error",
      signature: identity,
      traceback: traceback !== null && traceback !== undefined ? traceback : "",
      message: entry.message,
      count: entry.count,
      firstSeenAt: toIso(entry.firstSeenAt),
      lastSeenAt: toIso(entry.lastSeenAt),
      eventCode: entry.eventCode,
      account: entry.account,
      character: entry.character,
      triage: verdict.triage,
    })
  }

  return { envelopes, nextSeen, suppressed }
}
