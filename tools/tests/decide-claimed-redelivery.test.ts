
import { describe, expect, it } from "bun:test"
import {
  type ClaimedCandidate,
  type ClaimedTranscriptFinding,
  decideClaimedRedelivery,
} from "../lib/decide-claimed-redelivery.ts"

const A = "019f4bfd-2a3a-7757-9644-159e53fdb8a3"
const B = "019efb4f-ebd7-760c-af44-a0cf841c3dbb"

const LOST: ClaimedTranscriptFinding = { outcome: "lost", selfRead: false }
const ABSENT: ClaimedTranscriptFinding = { outcome: "absent", selfRead: false }
const INJECTED: ClaimedTranscriptFinding = { outcome: "injected", selfRead: false }

const START = 1_000_000
const before = (id: string, finding: ClaimedTranscriptFinding | null): ClaimedCandidate => ({
  id,
  claimedAtMs: START - 5_000,
  finding,
})
const during = (id: string, finding: ClaimedTranscriptFinding | null): ClaimedCandidate => ({
  id,
  claimedAtMs: START + 5_000,
  finding,
})

const decide = (candidates: readonly ClaimedCandidate[]) =>
  decideClaimedRedelivery({ candidates, processStartedAtMs: START })

describe("decideClaimedRedelivery — which claimed rows may be released", () => {
  it("releases a row claimed before this process started whose transcript shows it was lost", () => {
    const d = decide([before(A, LOST)])
    expect(d.release).toEqual([A])
    expect(d.skipped).toEqual([])
  })

  it("releases a row the transcript says NOTHING about — the never-offered class", () => {
    const d = decide([before(A, ABSENT)])
    expect(d.release).toEqual([A])
  })

  it("skips a row claimed by the LIVING process — it is in flight, not lost", () => {
    const d = decide([during(A, ABSENT)])
    expect(d.release).toEqual([])
    expect(d.skipped).toEqual([{ id: A, reason: "in-flight" }])
  })

  it("skips a row the transcript shows was injected", () => {
    const d = decide([before(A, INJECTED)])
    expect(d.release).toEqual([])
    expect(d.skipped).toEqual([{ id: A, reason: "injected" }])
  })

  it("skips everything when the transcript is unreadable — fail toward NOT duplicating", () => {
    const d = decide([before(A, null), before(B, null)])
    expect(d.release).toEqual([])
    expect(d.skipped.map((s) => s.reason)).toEqual(["unreadable", "unreadable"])
  })

  it("releases and skips independently across a mixed batch", () => {
    const d = decide([before(A, LOST), before(B, INJECTED)])
    expect(d.release).toEqual([A])
    expect(d.skipped).toEqual([{ id: B, reason: "injected" }])
  })

  it("no candidates is a clean no-op", () => {
    const d = decide([])
    expect(d.release).toEqual([])
    expect(d.skipped).toEqual([])
  })
})
