import { describe, expect, test } from "bun:test"
import type { CompiledOrderedRule } from "@temper/game-items-rules-core/inventory-rule-compiler-types"
import type { EvalContext, EvalEnv } from "../eval-env"
import type { ItemFacts } from "../item-facts"
import { checkLocation } from "./check-location"

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
  itemName: "Sample Item",
  itemLink: "|H1:item:100:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0|h|h",
}

const baseRule: CompiledOrderedRule = {
  categoryId: "all",
  action: "nothing",
}

describe("checkLocation", () => {
  test("skip when rule declares no location condition", () => {
    const result = checkLocation(baseRule, baseFacts, stubCtx)
    expect(result.kind).toBe("skip")
  })

  test("skip when rule declares an empty location set", () => {
    const result = checkLocation(
      { ...baseRule, location: [] },
      { ...baseFacts, location: "bank" },
      stubCtx
    )
    expect(result.kind).toBe("skip")
  })

  test("pass when facts.location is in the rule's set", () => {
    const result = checkLocation(
      { ...baseRule, location: ["bank", "craftbag"] },
      { ...baseFacts, location: "bank" },
      stubCtx
    )
    expect(result.kind).toBe("pass")
  })

  test("fail when facts.location is not in the rule's set", () => {
    const result = checkLocation(
      { ...baseRule, location: ["bank", "craftbag"] },
      { ...baseFacts, location: "worn" },
      stubCtx
    )
    expect(result.kind).toBe("fail")
    if (result.kind === "fail") {
      expect(result.conditionKind).toBe("location")
      expect(result.detail).toBe("worn")
    }
  })

  test("indeterminate when facts.location is undefined", () => {
    const result = checkLocation({ ...baseRule, location: ["bank"] }, baseFacts, stubCtx)
    expect(result.kind).toBe("indeterminate")
    if (result.kind === "indeterminate") {
      expect(result.conditionKind).toBe("location")
      expect(result.missingSignal).toBe("location")
    }
  })
})
