import { describe, expect, test } from "bun:test"
import { summarizeAudit } from "./audit-reading.ts"

describe("summarizeAudit", () => {
  test("an empty scan reports no-population and can express no zero at all", () => {
    const reading = summarizeAudit({
      scanned: 0,
      compared: 0,
      findings: 0,
      coverage: "complete",
    })
    expect(reading).toEqual({ kind: "no-population" })
    expect(reading).not.toHaveProperty("findings")
  })

  test("a measured zero carries the denominator it was measured over", () => {
    expect(summarizeAudit({ scanned: 12, compared: 9, findings: 0, coverage: "complete" })).toEqual(
      {
        kind: "measured",
        scanned: 12,
        compared: 9,
        findings: 0,
        coverage: "complete",
      }
    )
  })

  test("rows that could not be weighed leave the denominator, not the numerator", () => {
    const reading = summarizeAudit({
      scanned: 40,
      compared: 0,
      findings: 0,
      coverage: "complete",
    })
    expect(reading.kind).toBe("measured")
    expect(reading).toMatchObject({ scanned: 40, compared: 0 })
  })

  test("only an empty scan crosses into no-population, whatever the other counts say", () => {
    for (const scanned of [1, 2, 500]) {
      expect(summarizeAudit({ scanned, compared: 0, findings: 0, coverage: "complete" }).kind).toBe(
        "measured"
      )
    }
    expect(
      summarizeAudit({ scanned: 0, compared: 0, findings: 0, coverage: "truncated" }).kind
    ).toBe("no-population")
  })
})
