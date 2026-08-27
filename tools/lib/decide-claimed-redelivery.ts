
export interface ClaimedTranscriptFinding {
  readonly outcome: "injected" | "lost" | "not-yet" | "absent"
  readonly selfRead: boolean
}

export interface ClaimedCandidate {
  readonly id: string
  readonly claimedAtMs: number
  readonly finding: ClaimedTranscriptFinding | null
}

export type ClaimSkipReason = "in-flight" | "injected" | "self-read" | "not-yet" | "unreadable"

export interface ClaimedRedeliveryDecision {
  readonly release: readonly string[]
  readonly skipped: readonly { readonly id: string; readonly reason: ClaimSkipReason }[]
}

export function decideClaimedRedelivery(opts: {
  readonly candidates: readonly ClaimedCandidate[]
  readonly processStartedAtMs: number
}): ClaimedRedeliveryDecision {
  const release: string[] = []
  const skipped: { id: string; reason: ClaimSkipReason }[] = []

  for (const candidate of opts.candidates) {
    if (candidate.claimedAtMs >= opts.processStartedAtMs) {
      skipped.push({ id: candidate.id, reason: "in-flight" })
      continue
    }
    const finding = candidate.finding
    if (finding === null) {
      skipped.push({ id: candidate.id, reason: "unreadable" })
      continue
    }
    if (finding.selfRead) {
      skipped.push({ id: candidate.id, reason: "self-read" })
      continue
    }
    if (finding.outcome === "injected") {
      skipped.push({ id: candidate.id, reason: "injected" })
      continue
    }
    if (finding.outcome === "not-yet") {
      skipped.push({ id: candidate.id, reason: "not-yet" })
      continue
    }
    release.push(candidate.id)
  }

  return { release, skipped }
}
