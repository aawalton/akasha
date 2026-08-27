
import { describe, expect, it } from "bun:test"
import { hold } from "../lib/digest-harness.ts"
import type { IdleRuleSource } from "../lib/supervisor-idle-rule.ts"
import { observeBusyChildDetails, parseInFlightResponse } from "../lib/supervisor-idle-observe.ts"

const idleRuleDouble = (): IdleRuleSource => ({
  ignoredMcpCmdlines: (cmdlines) =>
    Promise.resolve({ value: cmdlines.map(() => false), notice: null }),
  preservingRestart: () => Promise.resolve({ value: { idle: false, reason: "" }, notice: null }),
  pastCliff: () => Promise.resolve({ value: { idle: false, reason: "" }, notice: null }),
})

const PARSE_VECTORS: readonly unknown[] = [
  { inFlight: 0, heldCount: 0, oldestHeldMs: null },
  { inFlight: 3, heldCount: 1, oldestHeldMs: 500 },
  { inFlight: 2, heldCount: 0, oldestHeldMs: null, someNewField: 41 },
  { inFlight: 0, someFieldWeDoNotKnowYet: "x" },
  { inFlight: 7 },
  { heldCount: 0, oldestHeldMs: null },
  { inFlight: -1 },
  { inFlight: 1.5 },
  { inFlight: "3" },
  null,
  "not an object",
]

const STANDING_PARSES: readonly (number | null)[] = [0, 3, 2, 0, 7, null, null, null, null, null, null]

describe("parseInFlightResponse", () => {
  it("answers what the standing implementation answered over every vector its suite parses", () => {
    const verdict = hold(
      "parseInFlightResponse",
      STANDING_PARSES,
      PARSE_VECTORS.map((body) => parseInFlightResponse(body))
    )
    expect(verdict).toMatchObject({ matches: true })
  })
})

describe("observeBusyChildDetails", () => {
  it("answers no ignored children for a null claude pid, as the standing one did", async () => {
    const verdict = hold("observeBusyChildDetails/null-pid", [], await observeBusyChildDetails(null, idleRuleDouble()))
    expect(verdict).toMatchObject({ matches: true })
  })

  it("answers no ignored children for a pid that is not there, as the standing one did", async () => {
    const verdict = hold(
      "observeBusyChildDetails/absent-pid",
      [],
      await observeBusyChildDetails(2_000_000_000, idleRuleDouble())
    )
    expect(verdict).toMatchObject({ matches: true })
  })
})
