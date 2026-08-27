import { describe, expect, it } from "bun:test"
import {
  computeUnattributedMs,
  emptyBracket,
  emptyNetWorthStats,
  emptySettlingStats,
  foldBracket,
  foldNetWorthWalk,
} from "./bank-trace-fold"

describe("foldNetWorthWalk", () => {
  it("first walk seeds count/total/max from empty stats", () => {
    expect(foldNetWorthWalk(emptyNetWorthStats(), 3100)).toEqual({
      walkCount: 1,
      walkTotalMs: 3100,
      walkMaxMs: 3100,
    })
  })

  it("accumulates count and total, keeps max of a smaller walk", () => {
    const after = foldNetWorthWalk({ walkCount: 1, walkTotalMs: 3100, walkMaxMs: 3100 }, 2400)
    expect(after).toEqual({ walkCount: 2, walkTotalMs: 5500, walkMaxMs: 3100 })
  })

  it("raises max when a later walk is slower", () => {
    const after = foldNetWorthWalk({ walkCount: 2, walkTotalMs: 5500, walkMaxMs: 3100 }, 4000)
    expect(after).toEqual({ walkCount: 3, walkTotalMs: 9500, walkMaxMs: 4000 })
  })

  it("counts a 0ms walk (sub-millisecond walks still count)", () => {
    const after = foldNetWorthWalk(emptyNetWorthStats(), 0)
    expect(after).toEqual({ walkCount: 1, walkTotalMs: 0, walkMaxMs: 0 })
  })
})

describe("foldBracket", () => {
  it("first fold seeds count/total/max from the empty bracket", () => {
    expect(foldBracket(emptyBracket(), 250)).toEqual({ count: 1, totalMs: 250, maxMs: 250 })
  })

  it("accumulates count and total, keeps max of a smaller entry", () => {
    const after = foldBracket({ count: 1, totalMs: 250, maxMs: 250 }, 100)
    expect(after).toEqual({ count: 2, totalMs: 350, maxMs: 250 })
  })

  it("raises max when a later entry is slower", () => {
    const after = foldBracket({ count: 2, totalMs: 350, maxMs: 250 }, 900)
    expect(after).toEqual({ count: 3, totalMs: 1250, maxMs: 900 })
  })

  it("counts a 0ms entry", () => {
    expect(foldBracket(emptyBracket(), 0)).toEqual({ count: 1, totalMs: 0, maxMs: 0 })
  })
})

describe("emptySettlingStats", () => {
  it("seeds all six in-addon brackets empty, no crafting, no remainder", () => {
    expect(emptySettlingStats()).toEqual({
      evaluateRules: { count: 0, totalMs: 0, maxMs: 0 },
      actionsChanged: { count: 0, totalMs: 0, maxMs: 0 },
      bankPanelRefresh: { count: 0, totalMs: 0, maxMs: 0 },
      slotUpdate: { count: 0, totalMs: 0, maxMs: 0 },
      fullUpdate: { count: 0, totalMs: 0, maxMs: 0 },
      scanCraftBag: { count: 0, totalMs: 0, maxMs: 0 },
    })
  })
})

describe("computeUnattributedMs", () => {
  it("subtracts open handler, net-worth walks, settling totals, and crafting from open→close", () => {
    expect(
      computeUnattributedMs({
        openToCloseMs: 17082,
        openHandlerMs: 629,
        netWorthWalkTotalMs: 3,
        settlingTotalsMs: 12000 + 1500 + 300,
        craftingTotalMs: 800,
      })
    ).toBe(1850)
  })

  it("treats a missing open handler bracket as 0 (partial trace stays honest)", () => {
    expect(
      computeUnattributedMs({
        openToCloseMs: 1000,
        openHandlerMs: undefined,
        netWorthWalkTotalMs: 100,
        settlingTotalsMs: 200,
        craftingTotalMs: 0,
      })
    ).toBe(700)
  })

  it("floors at 0 when tail folds push the bracketed sum past open→close", () => {
    expect(
      computeUnattributedMs({
        openToCloseMs: 1000,
        openHandlerMs: 600,
        netWorthWalkTotalMs: 300,
        settlingTotalsMs: 200,
        craftingTotalMs: 0,
      })
    ).toBe(0)
  })
})
