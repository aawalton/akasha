import { describe, expect, test } from "bun:test"
import { crashSignatureKey } from "@temper/shared-capture-errors-decision-core/crash-signatures"
import type { LivenessVerdict } from "@temper/shared-capture-errors-decision-core/liveness"
import type { ErrorEntry } from "@temper/shared-capture-errors-core/types"
import type { TriageVerdict } from "@temper/shared-capture-errors-decision-core/triage"
import { decideErrorEmissions, type EntryVerdict, isStaleResidue } from "./import-errors-decide"

const DEFAULT_KEY = crashSignatureKey("attempt to index a nil value", "stack traceback: A <- B")

const allLive: (entry: ErrorEntry) => EntryVerdict = () => ({ stale: false, triage: "unknown" })

function entry(over: Partial<ErrorEntry> = {}): ErrorEntry {
  return {
    traceback: "stack traceback: A <- B",
    message: "attempt to index a nil value",
    count: 1,
    firstSeenAt: 1_700_000_000,
    lastSeenAt: 1_700_000_100,
    account: "@alan",
    character: "Tank",
    world: "NA",
    esoVersion: "10.0.0",
    apiVersion: 101_044,
    eventCode: 0,
    ...over,
  }
}

describe("isStaleResidue", () => {
  const live: LivenessVerdict = { verdict: "live", reason: "live" }
  const recencyStale: LivenessVerdict = { verdict: "stale", reason: "recency" }
  const liveRecurrence: TriageVerdict = {
    triage: "live-recurrence",
    reason: "loaded-matches-deployed",
  }
  const staleRam: TriageVerdict = { triage: "stale-ram", reason: "loaded-differs-from-deployed" }
  const unknownTriage: TriageVerdict = { triage: "unknown", reason: "unattributed" }

  test("stale when the build-id signal proves stale-ram", () => {
    expect(isStaleResidue(live, staleRam)).toBe(true)
  })

  test("stale when the recency signal fires", () => {
    expect(isStaleResidue(recencyStale, liveRecurrence)).toBe(true)
  })

  test("live only when NEITHER signal fires", () => {
    expect(isStaleResidue(live, liveRecurrence)).toBe(false)
    expect(isStaleResidue(live, unknownTriage)).toBe(false)
  })
})

describe("decideErrorEmissions", () => {
  test("emits a brand-new error and records its count under the signature key", () => {
    const { envelopes, nextSeen, suppressed } = decideErrorEmissions(new Map(), [entry()], allLive)
    expect(envelopes).toHaveLength(1)
    const env = envelopes[0]
    expect(env?.kind).toBe("temper-error")
    expect(env?.count).toBe(1)
    expect(env?.account).toBe("@alan")
    expect(env?.firstSeenAt).toBe(new Date(1_700_000_000 * 1000).toISOString())
    expect(env?.signature).toBe(DEFAULT_KEY)
    expect(env?.traceback).toBe("stack traceback: A <- B")
    expect(env?.triage).toBe("unknown")
    expect(nextSeen.get(DEFAULT_KEY)).toBe(1)
    expect(suppressed).toBe(0)
  })

  test("does NOT re-emit an unchanged error (edge-trigger on signature)", () => {
    const prior = new Map([[DEFAULT_KEY, 1]])
    const { envelopes, nextSeen } = decideErrorEmissions(prior, [entry({ count: 1 })], allLive)
    expect(envelopes).toHaveLength(0)
    expect(nextSeen.get(DEFAULT_KEY)).toBe(1)
  })

  test("re-emits when the count increased", () => {
    const prior = new Map([[DEFAULT_KEY, 1]])
    const { envelopes, nextSeen } = decideErrorEmissions(prior, [entry({ count: 4 })], allLive)
    expect(envelopes).toHaveLength(1)
    expect(envelopes[0]?.count).toBe(4)
    expect(nextSeen.get(DEFAULT_KEY)).toBe(4)
  })

  test("stamps the triage verdict onto an emitted (live) envelope", () => {
    const verdictFor: (e: ErrorEntry) => EntryVerdict = () => ({
      stale: false,
      triage: "live-recurrence",
    })
    const { envelopes } = decideErrorEmissions(new Map(), [entry()], verdictFor)
    expect(envelopes[0]?.triage).toBe("live-recurrence")
  })

  test("SUPPRESSES a stale-residue entry from the burst but advances the cursor", () => {
    const staleVerdict: (e: ErrorEntry) => EntryVerdict = () => ({
      stale: true,
      triage: "stale-ram",
    })
    const { envelopes, nextSeen, suppressed } = decideErrorEmissions(
      new Map(),
      [entry()],
      staleVerdict
    )
    expect(envelopes).toHaveLength(0)
    expect(suppressed).toBe(1)
    expect(nextSeen.get(DEFAULT_KEY)).toBe(1)
  })

  test("emits live entries and suppresses stale ones in a mixed batch", () => {
    const liveEntry = entry({ traceback: "stack traceback: A <- B", message: "live error" })
    const staleEntry = entry({ traceback: "stack traceback: C <- D", message: "stale residue" })
    const verdictFor: (e: ErrorEntry) => EntryVerdict = (e) =>
      e.message === "stale residue"
        ? { stale: true, triage: "stale-ram" }
        : { stale: false, triage: "live-recurrence" }
    const { envelopes, suppressed } = decideErrorEmissions(
      new Map(),
      [liveEntry, staleEntry],
      verdictFor
    )
    expect(envelopes.map((env) => env.message)).toEqual(["live error"])
    expect(suppressed).toBe(1)
  })

  test("falls back to the message when traceback is nil", () => {
    const nilKey = crashSignatureKey("lost-traceback error", null)
    const { envelopes, nextSeen } = decideErrorEmissions(
      new Map(),
      [entry({ traceback: null, message: "lost-traceback error" })],
      allLive
    )
    expect(envelopes).toHaveLength(1)
    expect(envelopes[0]?.traceback).toBe("")
    expect(envelopes[0]?.signature).toBe(nilKey)
    expect(nextSeen.get(nilKey)).toBe(1)
    const second = decideErrorEmissions(
      nextSeen,
      [entry({ traceback: null, message: "lost-traceback error" })],
      allLive
    )
    expect(second.envelopes).toHaveLength(0)
  })

  test("distinct crash sites each emit independently", () => {
    const { envelopes } = decideErrorEmissions(
      new Map(),
      [
        entry({ traceback: "stack traceback: A <- B", message: "first error" }),
        entry({ traceback: "stack traceback: C <- D", message: "second error" }),
      ],
      allLive
    )
    expect(envelopes.map((e) => e.message).sort()).toEqual(["first error", "second error"])
  })

  test("collapses two raw tracebacks of the SAME site to one cursor identity (#13405)", () => {
    const message = "/EsoUI/Ingame/Inventory/Inventory.lua:1596: attempt to index a nil value"
    const frame = "user:/AddOns/Temper/TemperMasterWritInventoryMarker.lua:475: in function 'f'"
    const { envelopes, nextSeen } = decideErrorEmissions(
      new Map(),
      [
        entry({
          message,
          traceback: `stack traceback:\n\t${frame}\n\tZO_MenuBar:305: in 'Release'`,
        }),
        entry({
          message,
          traceback: `stack traceback:\n\t${frame}\n\tZO_MainMenu:3: in 'MouseUp'`,
        }),
      ],
      allLive
    )
    expect(nextSeen.size).toBe(1)
    expect(envelopes[0]?.signature).toBe(envelopes[1]?.signature)
    const second = decideErrorEmissions(
      nextSeen,
      [
        entry({
          message,
          traceback: `stack traceback:\n\t${frame}\n\tZO_MenuBar:305: in 'Release'`,
        }),
        entry({
          message,
          traceback: `stack traceback:\n\t${frame}\n\tZO_MainMenu:3: in 'MouseUp'`,
        }),
      ],
      allLive
    )
    expect(second.envelopes).toHaveLength(0)
  })

  test("carries forward the max count for a duplicated identity within one batch", () => {
    const { nextSeen } = decideErrorEmissions(
      new Map(),
      [entry({ count: 2 }), entry({ count: 5 })],
      allLive
    )
    expect(nextSeen.get(DEFAULT_KEY)).toBe(5)
  })
})
