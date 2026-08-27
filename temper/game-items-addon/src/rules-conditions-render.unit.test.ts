import { describe, expect, test } from "bun:test"
import type { CompiledOrderedRule } from "./generated/rule-types.generated"
import { describeInlineConditions, type MatchContext } from "./rules-conditions-render"

function makeRule(over: Partial<CompiledOrderedRule>): CompiledOrderedRule {
  return { categoryId: "misc", action: "nothing", ...over }
}

function makeCtx(over: Partial<MatchContext>): MatchContext {
  return {
    quality: 1,
    itemLink: "",
    bagId: 0,
    slotIndex: 0,
    itemType: 0,
    traitType: 0,
    equipType: 0,
    armorType: 0,
    weaponType: 0,
    deconCraftingType: 0,
    isStolenVal: false,
    isBoundVal: false,
    isBoPTradeableVal: false,
    isQuestRelevantVal: false,
    isCraftedVal: false,
    isReconstructedVal: false,
    isTransmutedVal: false,
    isLocked: false,
    temperTraitId: undefined,
    itemId: 1,
    itemName: "Test",
    saleAvg: undefined,
    minPrice: undefined,
    amountCount: undefined,
    saleAmountCount: undefined,
    estimatedValue: undefined,
    merchantValue: undefined,
    replacementCost: undefined,
    ...over,
  }
}

const FULL_TTC = {
  saleAvg: 6500,
  minPrice: 6000,
  amountCount: 10,
  saleAmountCount: 2,
  estimatedValue: 6100,
  merchantValue: 48,
}

describe("describeInlineConditions — marketValue", () => {
  test("renders ✗ + TTC blend when estimatedValue exceeds a <= threshold", () => {
    const out = describeInlineConditions(
      makeRule({ marketValue: 500, marketValueOp: "<=" }),
      makeCtx(FULL_TTC)
    )
    expect(out).toBe("marketValue<=500 ✗ [TTC SA=6500 Min=6000 AC=10 SAC=2 STR=0.20 est=6100]")
  })

  test("renders ✓ when estimatedValue satisfies a >= threshold", () => {
    const out = describeInlineConditions(
      makeRule({ marketValue: 5000, marketValueOp: ">=" }),
      makeCtx(FULL_TTC)
    )
    expect(out).toBe("marketValue>=5000 ✓ [TTC SA=6500 Min=6000 AC=10 SAC=2 STR=0.20 est=6100]")
  })

  test("estimatedValue undefined → fail (non-vacuous) + empty blend", () => {
    const out = describeInlineConditions(
      makeRule({ marketValue: 500, marketValueOp: "<=" }),
      makeCtx({})
    )
    expect(out).toBe("marketValue<=500 ✗")
  })

  test("STR = ? when there are no sales (SAC === 0)", () => {
    const out = describeInlineConditions(
      makeRule({ marketValue: 5000, marketValueOp: ">=" }),
      makeCtx({
        saleAvg: 6500,
        minPrice: 6000,
        amountCount: 10,
        saleAmountCount: 0,
        estimatedValue: undefined,
      })
    )
    expect(out).toBe("marketValue>=5000 ✗ [TTC SA=6500 Min=6000 AC=10 SAC=0 STR=? est=?]")
  })

  test("legacy maxValue renders marketValue<= with ? when estimatedValue is unknown", () => {
    const out = describeInlineConditions(makeRule({ maxValue: 500 }), makeCtx({}))
    expect(out).toBe("marketValue<=500 ?")
  })
})

describe("describeInlineConditions — combined value / merchant / replacement", () => {
  test("combined value renders cv = max(est, merchant, replacement)", () => {
    const out = describeInlineConditions(
      makeRule({ value: 5000, valueOp: ">=" }),
      makeCtx({ estimatedValue: 6100, merchantValue: 48, replacementCost: undefined })
    )
    expect(out).toBe("value>=5000 ✓ (cv=6100)")
  })

  test("combined value undefined → cv=?", () => {
    const out = describeInlineConditions(makeRule({ value: 5000, valueOp: ">=" }), makeCtx({}))
    expect(out).toBe("value>=5000 ✗ (cv=?)")
  })

  test("merchantValue defaults to 0 when unknown", () => {
    const out = describeInlineConditions(
      makeRule({ merchantValue: 100, merchantValueOp: "<=" }),
      makeCtx({})
    )
    expect(out).toBe("merchantValue<=100 ✓ (sell=0)")
  })

  test("replacementValue reads replacementCost", () => {
    const out = describeInlineConditions(
      makeRule({ replacementValue: 5000, replacementValueOp: ">=" }),
      makeCtx({ replacementCost: 6100 })
    )
    expect(out).toBe("replacementValue>=5000 ✓ (rc=6100)")
  })
})

describe("describeInlineConditions — composition", () => {
  test("value condition appends after the boolean conditions", () => {
    const out = describeInlineConditions(
      makeRule({ stolen: "not-stolen", marketValue: 500, marketValueOp: "<=" }),
      makeCtx({ ...FULL_TTC, isStolenVal: false })
    )
    expect(out).toBe(
      "stolen=not-stolen ✓, marketValue<=500 ✗ [TTC SA=6500 Min=6000 AC=10 SAC=2 STR=0.20 est=6100]"
    )
  })

  test("no value conditions → unchanged behavior", () => {
    const out = describeInlineConditions(makeRule({ known: "known" }), makeCtx({}))
    expect(out).toBe("known=known")
  })
})
