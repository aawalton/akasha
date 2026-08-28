
import { describe, expect, it } from "bun:test"
import { hold } from "../lib/digest-harness.ts"
import { hoursUntilReset } from "../lib/usage-derivations.ts"

const NOW = 1_754_000_000_000

const VECTORS: ReadonlyArray<
  readonly [{ now: number; sevenDayResetsAt: string | null }, number]
> = [
  [{ now: NOW, sevenDayResetsAt: null }, 144],
  [{ now: NOW, sevenDayResetsAt: "" }, 144],
  [{ now: NOW, sevenDayResetsAt: "not a date" }, 144],
  [{ now: NOW, sevenDayResetsAt: "2025-07-31T22:13:20.000Z" }, 144],
  [{ now: NOW, sevenDayResetsAt: "2025-07-31T22:13:19.999Z" }, 144],
  [{ now: NOW, sevenDayResetsAt: "2025-07-30T22:13:20.000Z" }, 144],
  [{ now: NOW, sevenDayResetsAt: "2025-07-31T22:13:20.001Z" }, 2.777_777_777_777_777_6e-7],
  [{ now: NOW, sevenDayResetsAt: "2025-07-31T23:13:20.000Z" }, 1],
  [{ now: NOW, sevenDayResetsAt: "2025-08-01T03:13:20.000Z" }, 5],
  [{ now: NOW, sevenDayResetsAt: "2025-08-07T22:13:20.000Z" }, 168],
  [{ now: NOW, sevenDayResetsAt: "2026-07-31T22:13:20.000Z" }, 8760],
  [{ now: 0, sevenDayResetsAt: "1970-01-01T00:00:00.000Z" }, 144],
]

describe("hoursUntilReset, held against the standing implementation", () => {
  it("answers what the code repository answered, over every vector", () => {
    const standing = VECTORS.map(([, answer]) => answer)
    const ported = VECTORS.map(([input]) => hoursUntilReset(input))
    const verdict = hold("hoursUntilReset", standing, ported)
    expect(verdict.ported).toBe(verdict.standing)
    expect(verdict.matches).toBe(true)
  })

  it("goes red when one standing answer is changed", () => {
    const standing = VECTORS.map(([, answer]) => answer)
    const tampered = [...standing]
    tampered[9] = 144
    const ported = VECTORS.map(([input]) => hoursUntilReset(input))
    expect(hold("hoursUntilReset", tampered, ported).matches).toBe(false)
  })
})
