import { describe, expect, test } from "bun:test"
import type { CompiledOrderedRule } from "@temper/game-items-rules-core/inventory-rule-compiler-types"
import type { EvalContext, EvalEnv } from "../eval-env"
import type { ItemFacts } from "../item-facts"
import { checkStackFullness } from "./check-stack-fullness"

const stubEnv: EvalEnv = {
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

const stubCtx: EvalContext = { env: stubEnv }

const baseFacts: ItemFacts = {
  itemId: 100,
  itemName: "Sample Container",
  itemLink: "|H1:item:100:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0|h|h",
}

const baseRule: CompiledOrderedRule = {
  categoryId: "all",
  action: "nothing",
}

describe("checkStackFullness", () => {
  test("skip when rule declares no stackFullness condition", () => {
    const result = checkStackFullness(
      baseRule,
      { ...baseFacts, stackCount: 200, maxStackSize: 200 },
      stubCtx
    )
    expect(result.kind).toBe("skip")
  })

  describe("full", () => {
    test("pass when stack is at max (200/200)", () => {
      const result = checkStackFullness(
        { ...baseRule, stackFullness: "full" },
        { ...baseFacts, stackCount: 200, maxStackSize: 200 },
        stubCtx
      )
      expect(result.kind).toBe("pass")
    })

    test("fail when stack is below max (137/200)", () => {
      const result = checkStackFullness(
        { ...baseRule, stackFullness: "full" },
        { ...baseFacts, stackCount: 137, maxStackSize: 200 },
        stubCtx
      )
      expect(result.kind).toBe("fail")
    })

    test("pass when stackCount exceeds maxStackSize (defensive >=)", () => {
      const result = checkStackFullness(
        { ...baseRule, stackFullness: "full" },
        { ...baseFacts, stackCount: 250, maxStackSize: 200 },
        stubCtx
      )
      expect(result.kind).toBe("pass")
    })

    test("non-stackable item (1/1) counts as full", () => {
      const result = checkStackFullness(
        { ...baseRule, stackFullness: "full" },
        { ...baseFacts, stackCount: 1, maxStackSize: 1 },
        stubCtx
      )
      expect(result.kind).toBe("pass")
    })
  })

  describe("partial", () => {
    test("pass when stack is below max (137/200)", () => {
      const result = checkStackFullness(
        { ...baseRule, stackFullness: "partial" },
        { ...baseFacts, stackCount: 137, maxStackSize: 200 },
        stubCtx
      )
      expect(result.kind).toBe("pass")
    })

    test("fail when stack is at max (200/200)", () => {
      const result = checkStackFullness(
        { ...baseRule, stackFullness: "partial" },
        { ...baseFacts, stackCount: 200, maxStackSize: 200 },
        stubCtx
      )
      expect(result.kind).toBe("fail")
    })
  })

  describe("fail-closed on missing signals", () => {
    test("indeterminate when stackCount is undefined", () => {
      const result = checkStackFullness(
        { ...baseRule, stackFullness: "full" },
        { ...baseFacts, maxStackSize: 200 },
        stubCtx
      )
      expect(result.kind).toBe("indeterminate")
      if (result.kind === "indeterminate") {
        expect(result.missingSignal).toBe("stackCount")
      }
    })

    test("indeterminate when maxStackSize is undefined", () => {
      const result = checkStackFullness(
        { ...baseRule, stackFullness: "full" },
        { ...baseFacts, stackCount: 200 },
        stubCtx
      )
      expect(result.kind).toBe("indeterminate")
      if (result.kind === "indeterminate") {
        expect(result.missingSignal).toBe("maxStackSize")
      }
    })
  })
})
