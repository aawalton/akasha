import { describe, expect, it } from "bun:test"
import { formatExplainWalk, type JsonOutput, type TtcBreakdown } from "../lib/temper-explain-walk.ts"

const BASE: Omit<JsonOutput, "ttc"> = {
  itemId: 1,
  itemName: "Test",
  itemLink: "",
  categoryNodeIds: null,
  itemKey: null,
  perRule: [],
  outcome: {
    kind: "implicit-terminal",
    action: "nothing",
    destination: null,
    label: "Keep",
    indeterminateRules: [],
  },
}

function ttcLine(out: string): string | undefined {
  return out.split("\n").find((l) => l.startsWith("ttc\t"))
}

function makeTtc(over: Partial<TtcBreakdown>): TtcBreakdown {
  return {
    saleAvg: null,
    minPrice: null,
    amountCount: null,
    saleAmountCount: null,
    estimatedValue: null,
    merchantValue: null,
    replacementCost: null,
    ...over,
  }
}

describe("formatExplainWalk TTC section", () => {
  it("derives STR = min(1, SAC/AC) when AC > 0", () => {
    const out = formatExplainWalk({
      ...BASE,
      ttc: makeTtc({
        saleAvg: 6500,
        minPrice: 6000,
        amountCount: 10,
        saleAmountCount: 2,
        estimatedValue: 6100,
        merchantValue: 48,
      }),
    })
    expect(ttcLine(out)).toBe("ttc\t6500\t6000\t10\t2\t0.2000\t6100\t48\t")
  })

  it("STR = 1 when there are sales but no listings (AC === 0, SAC > 0)", () => {
    const out = formatExplainWalk({
      ...BASE,
      ttc: makeTtc({
        saleAvg: 500,
        minPrice: null,
        amountCount: 0,
        saleAmountCount: 3,
        estimatedValue: 500,
      }),
    })
    expect(ttcLine(out)).toBe("ttc\t500\t\t0\t3\t1.0000\t500\t\t")
  })

  it("STR is blank when there are no sales (SAC === 0)", () => {
    const out = formatExplainWalk({
      ...BASE,
      ttc: makeTtc({ saleAvg: 500, minPrice: 400, amountCount: 5, saleAmountCount: 0 }),
    })
    expect(ttcLine(out)).toBe("ttc\t500\t400\t5\t0\t\t\t\t")
  })

  it("STR is blank when AC/SAC are unknown", () => {
    const out = formatExplainWalk({ ...BASE, ttc: makeTtc({ estimatedValue: 6100 }) })
    expect(ttcLine(out)).toBe("ttc\t\t\t\t\t\t6100\t\t")
  })

  it("omits the TTC section entirely when ttc is null", () => {
    const out = formatExplainWalk({ ...BASE, ttc: null })
    expect(out).not.toContain("# TTC pricing")
    expect(ttcLine(out)).toBeUndefined()
  })
})
