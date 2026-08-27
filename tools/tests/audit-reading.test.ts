import { describe, expect, test } from "bun:test"
import { type AuditReading, renderAuditReading, summarizeAudit } from "../lib/audit-reading.ts"

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

describe("renderAuditReading", () => {
  test("an unscanned run says so, and never prints a zero", () => {
    const lines = renderAuditReading("select options", { kind: "no-population" })
    expect(lines[0]).toBe("select options\tno-population")
    expect(lines.join("\n")).toContain("this is not a zero")
    expect(lines.join("\n")).not.toMatch(/findings=/)
  })

  test("a measured zero is legible as a comparison that ran", () => {
    const lines = renderAuditReading("select options", {
      kind: "measured",
      scanned: 12,
      compared: 9,
      findings: 0,
      coverage: "complete",
    })
    expect(lines[0]).toContain("scanned=12")
    expect(lines[0]).toContain("compared=9")
    expect(lines[0]).toContain("findings=0")
    expect(lines[1]).toContain("9 weighed and none is the class")
  })

  test("a scan that weighed nothing is not reported as a clean zero", () => {
    const lines = renderAuditReading("select options", {
      kind: "measured",
      scanned: 40,
      compared: 0,
      findings: 0,
      coverage: "complete",
    })
    expect(lines[1]).toContain("none could be weighed")
    expect(lines[1]).toContain("this is not a zero")
    expect(lines[1]).not.toContain("none is the class")
  })

  test("findings are reported against their denominator, never bare", () => {
    const lines = renderAuditReading("select options", {
      kind: "measured",
      scanned: 12,
      compared: 9,
      findings: 3,
      coverage: "complete",
    })
    expect(lines[1]).toBe("  3 of 9 weighed are the class.")
  })

  test("a truncated scan says its counts are a floor; a complete one adds no such line", () => {
    const truncated: AuditReading = {
      kind: "measured",
      scanned: 1000,
      compared: 1000,
      findings: 2,
      coverage: "truncated",
    }
    expect(renderAuditReading("rows", truncated).join("\n")).toContain("FLOOR")
    expect(
      renderAuditReading("rows", { ...truncated, coverage: "complete" }).join("\n")
    ).not.toContain("FLOOR")
  })

  test("the three emptinesses render as three different readings", () => {
    const rendered = [
      renderAuditReading("rows", { kind: "no-population" }),
      renderAuditReading("rows", {
        kind: "measured",
        scanned: 5,
        compared: 0,
        findings: 0,
        coverage: "complete",
      }),
      renderAuditReading("rows", {
        kind: "measured",
        scanned: 5,
        compared: 5,
        findings: 0,
        coverage: "complete",
      }),
    ].map((lines) => lines.join("\n"))
    expect(new Set(rendered).size).toBe(3)
  })

  test("the subject is carried into the report, so a line stands without its command", () => {
    const lines = renderAuditReading("temper-skill morph groups", { kind: "no-population" })
    expect(lines[0]).toStartWith("temper-skill morph groups\t")
  })
})
