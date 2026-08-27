import { describe, expect, test } from "bun:test"
import type { CompiledOrderedRule } from "@temper/game-items-rules-core/inventory-rule-compiler-types"
import type { ItemKey } from "@temper/game-items-rules-core/use-destination-types"
import type { EvalContext, EvalEnv } from "./eval-env"
import { walkRules } from "./evaluator"
import type { ItemFacts } from "./item-facts"

const recipeKey: ItemKey = { kind: "recipe", resultItemId: 68202 }

const recipeFacts: ItemFacts = {
  itemId: 68202,
  itemName: "Recipe: Garlic Cod with Potato Crust",
  itemLink: "|H1:item:68202:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0|h|h",
  itemKey: recipeKey,
  categoryNodeIds: ["food-recipes", "recipes", "knowledge", "all"],
}

const allKnowEnv: EvalEnv = {
  isKnownByCharacter: () => true,
  isKnownByAnyCharacter: () => true,
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
  getCharacterPriority: () => ["char-1", "char-2"],
  getCurrentCharacter: () => "char-1",
  getAllCharacters: () => ["char-1", "char-2"],
}

const allKnowCtx: EvalContext = { env: allKnowEnv }

const sellAllKnownRule: CompiledOrderedRule = {
  categoryId: "knowledge",
  action: "sell",
  known: "known",
}

const implicitTerminal: CompiledOrderedRule = {
  categoryId: "all",
  action: "nothing",
}

describe("recipe 68202 parity (project #9436 regression pin)", () => {
  test("walkRules yields matched 'sell' when every character knows the recipe", () => {
    const trace = walkRules([sellAllKnownRule, implicitTerminal], recipeFacts, allKnowCtx)

    expect(trace.outcome.kind).toBe("matched")
    if (trace.outcome.kind === "matched") {
      expect(trace.outcome.action).toBe("sell")
      expect(trace.outcome.rule.index).toBe(0)
      expect(trace.outcome.label).toBe("Sell")
    }
  })

  test("first rule matches; implicit terminal still appears in trace", () => {
    const trace = walkRules([sellAllKnownRule, implicitTerminal], recipeFacts, allKnowCtx)

    expect(trace.perRule).toHaveLength(2)
    expect(trace.perRule[0]?.verdict.kind).toBe("matched")
    expect(trace.perRule[1]?.action).toBe("nothing")
  })

  test("when no character knows the recipe, sell-all-known rule is rejected and Keep wins", () => {
    const noOneKnowsEnv: EvalEnv = {
      ...allKnowEnv,
      isKnownByCharacter: () => false,
      isKnownByAnyCharacter: () => false,
    }
    const trace = walkRules([sellAllKnownRule, implicitTerminal], recipeFacts, {
      env: noOneKnowsEnv,
    })

    expect(trace.outcome.kind).toBe("matched")
    if (trace.outcome.kind === "matched") {
      expect(trace.outcome.action).toBe("nothing")
      expect(trace.outcome.label).toBe("Keep")
    }
  })

  test("when one character has unknown knowledge state, outcome is indeterminate with provisional sell match", () => {
    const partialEnv: EvalEnv = {
      ...allKnowEnv,
      isKnownByCharacter: (_key, charId) => (charId === "char-1" ? true : "unknown"),
      isKnownByAnyCharacter: () => true,
    }
    const trace = walkRules([sellAllKnownRule, implicitTerminal], recipeFacts, { env: partialEnv })

    expect(trace.outcome.kind).toBe("indeterminate")
    if (trace.outcome.kind === "indeterminate") {
      expect(trace.outcome.indeterminateRules).toHaveLength(1)
      expect(trace.outcome.indeterminateRules[0]?.action).toBe("sell")
      expect(trace.outcome.provisionalMatch?.action).toBe("nothing")
    }
  })
})
