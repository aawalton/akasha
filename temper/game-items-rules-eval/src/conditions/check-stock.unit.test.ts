import { describe, expect, test } from "bun:test"
import type { CompiledOrderedRule } from "@temper/game-items-rules-core/inventory-rule-compiler-types"
import type { EvalContext, EvalEnv, LookupResult } from "../eval-env"
import type { ItemFacts } from "../item-facts"
import { checkStock } from "./check-stock"

const baseEnv: EvalEnv = {
  isKnownByCharacter: () => "unknown",
  isKnownByAnyCharacter: () => "unknown",
  isTraitResearched: () => "unknown",
  isCraftingRankBelowCap: () => "unknown",
  matchesWantedEquipment: () => "unknown",
  matchesWantedCompanionEquipment: () => "unknown",
  isCompanionWornSlotFilled: () => "unknown",
  findCharacterForWantedEquipment: () => "unknown",
  findCompanionForWantedEquipment: () => "unknown",
  getConsumableStock: () => "unknown",
  getConsumableWanters: () => "unknown",
  getBankStock: () => "unknown",
  getCooldownGroup: () => "unknown",
  isCooldownExpired: () => "unknown",
  getTransmuteCrystalAmount: () => "unknown",
  getTransmuteCrystalCap: () => "unknown",
  getKnownScripts: () => "unknown",
  getTotalScriptCount: () => "unknown",
  getCharacterPriority: () => "unknown",
  getCurrentCharacter: () => "unknown",
  getAllCharacters: () => "unknown",
}

function makeCtx(overrides: Partial<EvalEnv>): EvalContext {
  return { env: { ...baseEnv, ...overrides } }
}

function makeGroupCtx(
  overrides: Partial<EvalEnv>,
  group: { ruleId: string; itemIds: readonly number[] }
): EvalContext {
  return {
    env: { ...baseEnv, ...overrides },
    stockGroupByRuleId: new Map([[group.ruleId, new Set(group.itemIds)]]),
  }
}

const baseFacts: ItemFacts = {
  itemId: 100,
  itemName: "Sample Consumable",
  itemLink: "|H1:item:100:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0|h|h",
}

const baseRule: CompiledOrderedRule = {
  categoryId: "all",
  action: "nothing",
}

describe("checkStock", () => {
  test("skip when neither allStocked nor targetQuantity is set", () => {
    const ctx = makeCtx({})
    const result = checkStock(baseRule, baseFacts, ctx)
    expect(result.kind).toBe("skip")
  })

  describe("allStocked vacuous truth (no wanters)", () => {
    test("'all-stocked' passes when no characters want the item", () => {
      const ctx = makeCtx({ getConsumableWanters: () => [] })
      const result = checkStock({ ...baseRule, allStocked: "all-stocked" }, baseFacts, ctx)
      expect(result.kind).toBe("pass")
    })

    test("'not-all-stocked' fails when no characters want the item", () => {
      const ctx = makeCtx({ getConsumableWanters: () => [] })
      const result = checkStock({ ...baseRule, allStocked: "not-all-stocked" }, baseFacts, ctx)
      expect(result.kind).toBe("fail")
      if (result.kind === "fail") expect(result.conditionKind).toBe("allStocked")
    })
  })

  describe("allStocked with wanters", () => {
    test("'all-stocked' passes when every wanter has stock >= threshold (default 200)", () => {
      const ctx = makeCtx({
        getConsumableWanters: () => ["c1", "c2"],
        getConsumableStock: () => 250,
      })
      const result = checkStock({ ...baseRule, allStocked: "all-stocked" }, baseFacts, ctx)
      expect(result.kind).toBe("pass")
    })

    test("'not-all-stocked' fails when every wanter has stock >= threshold", () => {
      const ctx = makeCtx({
        getConsumableWanters: () => ["c1", "c2"],
        getConsumableStock: () => 250,
      })
      const result = checkStock({ ...baseRule, allStocked: "not-all-stocked" }, baseFacts, ctx)
      expect(result.kind).toBe("fail")
      if (result.kind === "fail") expect(result.conditionKind).toBe("allStocked")
    })

    test("'all-stocked' fails when one wanter is under threshold", () => {
      const ctx = makeCtx({
        getConsumableWanters: () => ["c1", "c2"],
        getConsumableStock: (_id, charId): LookupResult<number> => (charId === "c1" ? 250 : 50),
      })
      const result = checkStock({ ...baseRule, allStocked: "all-stocked" }, baseFacts, ctx)
      expect(result.kind).toBe("fail")
      if (result.kind === "fail") expect(result.conditionKind).toBe("allStocked")
    })

    test("'not-all-stocked' passes when one wanter is under threshold", () => {
      const ctx = makeCtx({
        getConsumableWanters: () => ["c1", "c2"],
        getConsumableStock: (_id, charId): LookupResult<number> => (charId === "c1" ? 250 : 50),
      })
      const result = checkStock({ ...baseRule, allStocked: "not-all-stocked" }, baseFacts, ctx)
      expect(result.kind).toBe("pass")
    })

    test("custom stockThreshold honored: stock=150, threshold=100 passes 'all-stocked'", () => {
      const ctx = makeCtx({
        getConsumableWanters: () => ["c1"],
        getConsumableStock: () => 150,
      })
      const result = checkStock(
        { ...baseRule, allStocked: "all-stocked", stockThreshold: 100 },
        baseFacts,
        ctx
      )
      expect(result.kind).toBe("pass")
    })

    test("custom stockThreshold honored: stock=150, threshold=300 fails 'all-stocked'", () => {
      const ctx = makeCtx({
        getConsumableWanters: () => ["c1"],
        getConsumableStock: () => 150,
      })
      const result = checkStock(
        { ...baseRule, allStocked: "all-stocked", stockThreshold: 300 },
        baseFacts,
        ctx
      )
      expect(result.kind).toBe("fail")
      if (result.kind === "fail") expect(result.conditionKind).toBe("allStocked")
    })
  })

  describe("allStocked indeterminate", () => {
    test("indeterminate when getConsumableWanters returns 'unknown'", () => {
      const ctx = makeCtx({ getConsumableWanters: () => "unknown" })
      const result = checkStock({ ...baseRule, allStocked: "all-stocked" }, baseFacts, ctx)
      expect(result.kind).toBe("indeterminate")
      if (result.kind === "indeterminate") {
        expect(result.conditionKind).toBe("allStocked")
        expect(result.missingSignal).toBe("wanters")
      }
    })

    test("indeterminate when getConsumableStock returns 'unknown' for some wanter", () => {
      const ctx = makeCtx({
        getConsumableWanters: () => ["c1", "c2"],
        getConsumableStock: (_id, charId): LookupResult<number> =>
          charId === "c1" ? 250 : "unknown",
      })
      const result = checkStock({ ...baseRule, allStocked: "all-stocked" }, baseFacts, ctx)
      expect(result.kind).toBe("indeterminate")
      if (result.kind === "indeterminate") {
        expect(result.conditionKind).toBe("allStocked")
        expect(result.missingSignal).toBe("stock:c2")
      }
    })
  })

  describe("targetQuantity", () => {
    test("fail when bank stock is at or above targetQuantity", () => {
      const ctx = makeCtx({ getBankStock: () => 500 })
      const result = checkStock({ ...baseRule, targetQuantity: 500 }, baseFacts, ctx)
      expect(result.kind).toBe("fail")
      if (result.kind === "fail") expect(result.conditionKind).toBe("targetQuantity")
    })

    test("fail when bank stock exceeds targetQuantity", () => {
      const ctx = makeCtx({ getBankStock: () => 800 })
      const result = checkStock({ ...baseRule, targetQuantity: 500 }, baseFacts, ctx)
      expect(result.kind).toBe("fail")
      if (result.kind === "fail") expect(result.conditionKind).toBe("targetQuantity")
    })

    test("pass when bank stock is below targetQuantity", () => {
      const ctx = makeCtx({ getBankStock: () => 100 })
      const result = checkStock({ ...baseRule, targetQuantity: 500 }, baseFacts, ctx)
      expect(result.kind).toBe("pass")
    })

    test("indeterminate when getBankStock returns 'unknown'", () => {
      const ctx = makeCtx({ getBankStock: () => "unknown" })
      const result = checkStock({ ...baseRule, targetQuantity: 500 }, baseFacts, ctx)
      expect(result.kind).toBe("indeterminate")
      if (result.kind === "indeterminate") {
        expect(result.conditionKind).toBe("targetQuantity")
        expect(result.missingSignal).toBe("bank")
      }
    })
  })

  describe("aggregate group semantics (#11910)", () => {
    function groupStock(per: Record<number, Record<string, number>>) {
      return (id: number, charId: string): LookupResult<number> => per[id]?.[charId] ?? 0
    }

    test("'all-stocked' passes when a wanter's AGGREGATE across the group >= threshold, even though no single item reaches it", () => {
      const ctx = makeGroupCtx(
        {
          getConsumableWanters: (id) => (id === 100 || id === 200 ? ["c1"] : []),
          getConsumableStock: groupStock({ 100: { c1: 120 }, 200: { c1: 130 } }),
        },
        { ruleId: "r1", itemIds: [100, 200] }
      )
      const result = checkStock(
        { ...baseRule, id: "r1", allStocked: "all-stocked" },
        baseFacts,
        ctx
      )
      expect(result.kind).toBe("pass")
    })

    test("'all-stocked' fails when a wanter's AGGREGATE across the group is under threshold", () => {
      const ctx = makeGroupCtx(
        {
          getConsumableWanters: (id) => (id === 100 || id === 200 ? ["c1"] : []),
          getConsumableStock: groupStock({ 100: { c1: 50 }, 200: { c1: 80 } }),
        },
        { ruleId: "r1", itemIds: [100, 200] }
      )
      const result = checkStock(
        { ...baseRule, id: "r1", allStocked: "all-stocked" },
        baseFacts,
        ctx
      )
      expect(result.kind).toBe("fail")
      if (result.kind === "fail") expect(result.conditionKind).toBe("allStocked")
    })

    test("wanters are the UNION across the group; every wanter's aggregate must reach threshold", () => {
      const ctx = makeGroupCtx(
        {
          getConsumableWanters: (id) => (id === 100 ? ["c1"] : id === 200 ? ["c2"] : []),
          getConsumableStock: groupStock({
            100: { c1: 200, c2: 0 },
            200: { c1: 0, c2: 100 },
          }),
        },
        { ruleId: "r1", itemIds: [100, 200] }
      )
      const result = checkStock(
        { ...baseRule, id: "r1", allStocked: "all-stocked" },
        baseFacts,
        ctx
      )
      expect(result.kind).toBe("fail")
      if (result.kind === "fail") expect(result.conditionKind).toBe("allStocked")
    })

    test("indeterminate when any group itemId's stock is 'unknown' for a wanter", () => {
      const ctx = makeGroupCtx(
        {
          getConsumableWanters: (id) => (id === 100 || id === 200 ? ["c1"] : []),
          getConsumableStock: (id, _charId): LookupResult<number> => (id === 100 ? 120 : "unknown"),
        },
        { ruleId: "r1", itemIds: [100, 200] }
      )
      const result = checkStock(
        { ...baseRule, id: "r1", allStocked: "all-stocked" },
        baseFacts,
        ctx
      )
      expect(result.kind).toBe("indeterminate")
      if (result.kind === "indeterminate") expect(result.conditionKind).toBe("allStocked")
    })

    test("targetQuantity aggregates bank stock across the group", () => {
      const ctx = makeGroupCtx(
        { getBankStock: (id): LookupResult<number> => (id === 100 ? 300 : id === 200 ? 250 : 0) },
        { ruleId: "r1", itemIds: [100, 200] }
      )
      const result = checkStock({ ...baseRule, id: "r1", targetQuantity: 500 }, baseFacts, ctx)
      expect(result.kind).toBe("fail")
      if (result.kind === "fail") expect(result.conditionKind).toBe("targetQuantity")
    })

    test("degenerate fallback: no group supplied -> single-itemId behavior unchanged", () => {
      const ctx = makeCtx({
        getConsumableWanters: (id) => (id === 100 ? ["c1"] : []),
        getConsumableStock: groupStock({ 100: { c1: 120 }, 200: { c1: 130 } }),
      })
      const result = checkStock(
        { ...baseRule, id: "r1", allStocked: "all-stocked" },
        baseFacts,
        ctx
      )
      expect(result.kind).toBe("fail")
    })

    test("skipStock=true short-circuits checkStock to skip (phase-1 stock-blind)", () => {
      const ctx: EvalContext = {
        env: { ...baseEnv, getConsumableWanters: () => ["c1"], getConsumableStock: () => 0 },
        skipStock: true,
      }
      const result = checkStock(
        { ...baseRule, id: "r1", allStocked: "all-stocked" },
        baseFacts,
        ctx
      )
      expect(result.kind).toBe("skip")
    })
  })

  describe("combined allStocked + targetQuantity", () => {
    test("allStocked passes, targetQuantity fails: returns targetQuantity fail", () => {
      const ctx = makeCtx({
        getConsumableWanters: () => ["c1"],
        getConsumableStock: () => 250,
        getBankStock: () => 1000,
      })
      const result = checkStock(
        { ...baseRule, allStocked: "all-stocked", targetQuantity: 500 },
        baseFacts,
        ctx
      )
      expect(result.kind).toBe("fail")
      if (result.kind === "fail") expect(result.conditionKind).toBe("targetQuantity")
    })

    test("allStocked fails, targetQuantity not even checked", () => {
      const ctx = makeCtx({
        getConsumableWanters: () => ["c1"],
        getConsumableStock: () => 50,
        getBankStock: () => 100,
      })
      const result = checkStock(
        { ...baseRule, allStocked: "all-stocked", targetQuantity: 500 },
        baseFacts,
        ctx
      )
      expect(result.kind).toBe("fail")
      if (result.kind === "fail") expect(result.conditionKind).toBe("allStocked")
    })

    test("both pass: allStocked satisfied, targetQuantity below", () => {
      const ctx = makeCtx({
        getConsumableWanters: () => ["c1"],
        getConsumableStock: () => 250,
        getBankStock: () => 100,
      })
      const result = checkStock(
        { ...baseRule, allStocked: "all-stocked", targetQuantity: 500 },
        baseFacts,
        ctx
      )
      expect(result.kind).toBe("pass")
    })
  })
})
