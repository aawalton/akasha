import { describe, expect, test } from "bun:test"
import type { CompiledOrderedRule } from "@temper/game-items-rules-core/inventory-rule-compiler-types"
import type { EvalContext, EvalEnv } from "../eval-env"
import type { ItemFacts } from "../item-facts"
import { checkNumeric } from "./check-numeric"

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

const ctx: EvalContext = { env: stubEnv }

const baseFacts: ItemFacts = {
  itemId: 100,
  itemName: "Sample",
  itemLink: "|H1:item:100:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0|h|h",
}

function rule(overrides: Partial<CompiledOrderedRule>): CompiledOrderedRule {
  return { categoryId: "all", action: "nothing", ...overrides }
}

describe("checkNumeric — named rule constant threshold", () => {
  test("marketValue 'MIN_LISTING_VALUE' >= matches literal 5000 (item value 6000 passes both)", () => {
    const facts = { ...baseFacts, estimatedValue: 6000 }
    const constantVerdict = checkNumeric(
      rule({ marketValue: "MIN_LISTING_VALUE", marketValueOp: ">=" }),
      facts,
      ctx
    )
    const literalVerdict = checkNumeric(
      rule({ marketValue: 5000, marketValueOp: ">=" }),
      facts,
      ctx
    )
    expect(constantVerdict).toEqual(literalVerdict)
    expect(constantVerdict.kind).toBe("pass")
  })

  test("marketValue 'MIN_LISTING_VALUE' >= matches literal 5000 (item value 4000 fails both)", () => {
    const facts = { ...baseFacts, estimatedValue: 4000 }
    const constantVerdict = checkNumeric(
      rule({ marketValue: "MIN_LISTING_VALUE", marketValueOp: ">=" }),
      facts,
      ctx
    )
    const literalVerdict = checkNumeric(
      rule({ marketValue: 5000, marketValueOp: ">=" }),
      facts,
      ctx
    )
    expect(constantVerdict).toEqual(literalVerdict)
    expect(constantVerdict.kind).toBe("fail")
  })
})
