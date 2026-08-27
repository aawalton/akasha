import { describe, expect, test } from "bun:test"
import type { CompiledOrderedRule } from "@temper/game-items-rules-core/inventory-rule-compiler-types"
import type { EvalContext, EvalEnv, LookupResult } from "../eval-env"
import type { ItemFacts } from "../item-facts"
import { checkCrossCharacterCraft } from "./check-cross-character-craft"

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

const baseRule: CompiledOrderedRule = {
  categoryId: "all",
  action: "nothing",
}

const baseFacts: ItemFacts = {
  itemId: 100,
  itemName: "Sample Item",
  itemLink: "|H1:item:100:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0|h|h",
}

const heavyArmorFacts: ItemFacts = {
  ...baseFacts,
  equipType: 4,
  armorType: 3,
  traitType: 17,
}

const swordFacts: ItemFacts = {
  ...baseFacts,
  equipType: 6,
  armorType: 0,
  weaponType: 2,
  traitType: 4,
}

const bowFacts: ItemFacts = {
  ...baseFacts,
  equipType: 6,
  armorType: 0,
  weaponType: 8,
  traitType: 7,
}

const ringFacts: ItemFacts = {
  ...baseFacts,
  equipType: 12,
  traitType: 28,
}

const nonResearchableFacts: ItemFacts = {
  ...baseFacts,
  equipType: 4,
  armorType: 3,
  traitType: 0,
}

const uninferrableFacts: ItemFacts = {
  ...baseFacts,
  traitType: 17,
}

describe("checkCrossCharacterCraft", () => {
  test("skip when neither canResearch nor canInspire is set", () => {
    const result = checkCrossCharacterCraft(baseRule, heavyArmorFacts, makeCtx({}))
    expect(result.kind).toBe("skip")
  })

  describe("canResearch", () => {
    test("pass for can-research when at least one character still needs the trait", () => {
      const ctx = makeCtx({
        getAllCharacters: () => ["alice", "bob"],
        isTraitResearched: (charId): LookupResult<boolean> => charId === "alice",
      })
      const result = checkCrossCharacterCraft(
        { ...baseRule, canResearch: "can-research" },
        heavyArmorFacts,
        ctx
      )
      expect(result.kind).toBe("pass")
    })

    test("fail for can-research when all characters have it researched", () => {
      const ctx = makeCtx({
        getAllCharacters: () => ["alice", "bob"],
        isTraitResearched: () => true,
      })
      const result = checkCrossCharacterCraft(
        { ...baseRule, canResearch: "can-research" },
        heavyArmorFacts,
        ctx
      )
      expect(result.kind).toBe("fail")
      if (result.kind === "fail") expect(result.conditionKind).toBe("canResearch")
    })

    test("pass for cannot-research when all characters have it researched", () => {
      const ctx = makeCtx({
        getAllCharacters: () => ["alice", "bob"],
        isTraitResearched: () => true,
      })
      const result = checkCrossCharacterCraft(
        { ...baseRule, canResearch: "cannot-research" },
        heavyArmorFacts,
        ctx
      )
      expect(result.kind).toBe("pass")
    })

    test("fail for cannot-research when at least one character still needs the trait", () => {
      const ctx = makeCtx({
        getAllCharacters: () => ["alice", "bob"],
        isTraitResearched: (charId): LookupResult<boolean> => charId === "alice",
      })
      const result = checkCrossCharacterCraft(
        { ...baseRule, canResearch: "cannot-research" },
        heavyArmorFacts,
        ctx
      )
      expect(result.kind).toBe("fail")
      if (result.kind === "fail") expect(result.conditionKind).toBe("canResearch")
    })

    test("fail for can-research when trait is non-researchable (out-of-range traitType)", () => {
      const ctx = makeCtx({
        getAllCharacters: () => ["alice"],
        isTraitResearched: () => false,
      })
      const result = checkCrossCharacterCraft(
        { ...baseRule, canResearch: "can-research" },
        nonResearchableFacts,
        ctx
      )
      expect(result.kind).toBe("fail")
      if (result.kind === "fail") {
        expect(result.conditionKind).toBe("canResearch")
        expect(result.detail).toBe("trait not researchable")
      }
    })

    test("pass for cannot-research when trait is non-researchable", () => {
      const result = checkCrossCharacterCraft(
        { ...baseRule, canResearch: "cannot-research" },
        nonResearchableFacts,
        makeCtx({})
      )
      expect(result.kind).toBe("pass")
    })

    test("indeterminate when traitType is missing", () => {
      const result = checkCrossCharacterCraft(
        { ...baseRule, canResearch: "can-research" },
        baseFacts,
        makeCtx({})
      )
      expect(result.kind).toBe("indeterminate")
      if (result.kind === "indeterminate") {
        expect(result.conditionKind).toBe("canResearch")
        expect(result.missingSignal).toBe("traitType")
      }
    })

    test("indeterminate when getAllCharacters returns unknown", () => {
      const result = checkCrossCharacterCraft(
        { ...baseRule, canResearch: "can-research" },
        heavyArmorFacts,
        makeCtx({ getAllCharacters: () => "unknown" })
      )
      expect(result.kind).toBe("indeterminate")
      if (result.kind === "indeterminate") {
        expect(result.conditionKind).toBe("canResearch")
        expect(result.missingSignal).toBe("characters")
      }
    })

    test("indeterminate when isTraitResearched returns unknown for a char", () => {
      const ctx = makeCtx({
        getAllCharacters: () => ["alice"],
        isTraitResearched: () => "unknown",
      })
      const result = checkCrossCharacterCraft(
        { ...baseRule, canResearch: "can-research" },
        heavyArmorFacts,
        ctx
      )
      expect(result.kind).toBe("indeterminate")
      if (result.kind === "indeterminate") {
        expect(result.conditionKind).toBe("canResearch")
        expect(result.missingSignal).toBe("research:alice")
      }
    })

    test("uses correct trait name across craft types (sword → BS weapon line)", () => {
      const seen: { charId: string; craftingType: number; traitName: string }[] = []
      const ctx = makeCtx({
        getAllCharacters: () => ["alice"],
        isTraitResearched: (charId, craftingType, traitName): LookupResult<boolean> => {
          seen.push({ charId, craftingType, traitName })
          return false
        },
      })
      checkCrossCharacterCraft({ ...baseRule, canResearch: "can-research" }, swordFacts, ctx)
      expect(seen).toEqual([{ charId: "alice", craftingType: 1, traitName: "infused" }])
    })

    test("bow routes to woodworking line (craft type 6)", () => {
      const seen: { craftingType: number; traitName: string }[] = []
      const ctx = makeCtx({
        getAllCharacters: () => ["alice"],
        isTraitResearched: (_charId, craftingType, traitName): LookupResult<boolean> => {
          seen.push({ craftingType, traitName })
          return false
        },
      })
      checkCrossCharacterCraft({ ...baseRule, canResearch: "can-research" }, bowFacts, ctx)
      expect(seen).toEqual([{ craftingType: 6, traitName: "sharpened" }])
    })

    test("ring routes to jewelrycrafting line (craft type 7)", () => {
      const seen: { craftingType: number; traitName: string }[] = []
      const ctx = makeCtx({
        getAllCharacters: () => ["alice"],
        isTraitResearched: (_charId, craftingType, traitName): LookupResult<boolean> => {
          seen.push({ craftingType, traitName })
          return false
        },
      })
      checkCrossCharacterCraft({ ...baseRule, canResearch: "can-research" }, ringFacts, ctx)
      expect(seen).toEqual([{ craftingType: 7, traitName: "swift" }])
    })
  })

  describe("canInspire", () => {
    test("pass for can-inspire when at least one character is below cap", () => {
      const ctx = makeCtx({
        getAllCharacters: () => ["alice", "bob"],
        isCraftingRankBelowCap: (charId): LookupResult<boolean> => charId !== "alice",
      })
      const result = checkCrossCharacterCraft(
        { ...baseRule, canInspire: "can-inspire" },
        heavyArmorFacts,
        ctx
      )
      expect(result.kind).toBe("pass")
    })

    test("fail for can-inspire when all characters are capped", () => {
      const ctx = makeCtx({
        getAllCharacters: () => ["alice", "bob"],
        isCraftingRankBelowCap: () => false,
      })
      const result = checkCrossCharacterCraft(
        { ...baseRule, canInspire: "can-inspire" },
        heavyArmorFacts,
        ctx
      )
      expect(result.kind).toBe("fail")
      if (result.kind === "fail") expect(result.conditionKind).toBe("canInspire")
    })

    test("pass for cannot-inspire when all characters are capped", () => {
      const ctx = makeCtx({
        getAllCharacters: () => ["alice", "bob"],
        isCraftingRankBelowCap: () => false,
      })
      const result = checkCrossCharacterCraft(
        { ...baseRule, canInspire: "cannot-inspire" },
        heavyArmorFacts,
        ctx
      )
      expect(result.kind).toBe("pass")
    })

    test("fail for cannot-inspire when at least one character is below cap", () => {
      const ctx = makeCtx({
        getAllCharacters: () => ["alice"],
        isCraftingRankBelowCap: () => true,
      })
      const result = checkCrossCharacterCraft(
        { ...baseRule, canInspire: "cannot-inspire" },
        heavyArmorFacts,
        ctx
      )
      expect(result.kind).toBe("fail")
      if (result.kind === "fail") expect(result.conditionKind).toBe("canInspire")
    })

    test("fail for can-inspire when craft type is uninferrable", () => {
      const result = checkCrossCharacterCraft(
        { ...baseRule, canInspire: "can-inspire" },
        uninferrableFacts,
        makeCtx({})
      )
      expect(result.kind).toBe("fail")
      if (result.kind === "fail") {
        expect(result.conditionKind).toBe("canInspire")
        expect(result.detail).toBe("craft type uninferrable")
      }
    })

    test("pass for cannot-inspire when craft type is uninferrable", () => {
      const result = checkCrossCharacterCraft(
        { ...baseRule, canInspire: "cannot-inspire" },
        uninferrableFacts,
        makeCtx({})
      )
      expect(result.kind).toBe("pass")
    })

    test("indeterminate when getAllCharacters returns unknown", () => {
      const result = checkCrossCharacterCraft(
        { ...baseRule, canInspire: "can-inspire" },
        heavyArmorFacts,
        makeCtx({ getAllCharacters: () => "unknown" })
      )
      expect(result.kind).toBe("indeterminate")
      if (result.kind === "indeterminate") {
        expect(result.conditionKind).toBe("canInspire")
        expect(result.missingSignal).toBe("characters")
      }
    })

    test("indeterminate when isCraftingRankBelowCap returns unknown", () => {
      const ctx = makeCtx({
        getAllCharacters: () => ["alice"],
        isCraftingRankBelowCap: () => "unknown",
      })
      const result = checkCrossCharacterCraft(
        { ...baseRule, canInspire: "can-inspire" },
        heavyArmorFacts,
        ctx
      )
      expect(result.kind).toBe("indeterminate")
      if (result.kind === "indeterminate") {
        expect(result.conditionKind).toBe("canInspire")
        expect(result.missingSignal).toBe("crafting:alice")
      }
    })

    test("ring routes to jewelrycrafting line for inspire too", () => {
      const seenCraftTypes: number[] = []
      const ctx = makeCtx({
        getAllCharacters: () => ["alice"],
        isCraftingRankBelowCap: (_charId, craftingType): LookupResult<boolean> => {
          seenCraftTypes.push(craftingType)
          return true
        },
      })
      checkCrossCharacterCraft({ ...baseRule, canInspire: "can-inspire" }, ringFacts, ctx)
      expect(seenCraftTypes).toEqual([7])
    })
  })

  describe("both fields on the same rule", () => {
    test("canResearch passes, canInspire fails: returns canInspire fail", () => {
      const ctx = makeCtx({
        getAllCharacters: () => ["alice"],
        isTraitResearched: () => false,
        isCraftingRankBelowCap: () => false,
      })
      const result = checkCrossCharacterCraft(
        { ...baseRule, canResearch: "can-research", canInspire: "can-inspire" },
        heavyArmorFacts,
        ctx
      )
      expect(result.kind).toBe("fail")
      if (result.kind === "fail") expect(result.conditionKind).toBe("canInspire")
    })

    test("canResearch fails first; canInspire never evaluated (declaration order)", () => {
      let inspireCalls = 0
      const ctx = makeCtx({
        getAllCharacters: () => ["alice"],
        isTraitResearched: () => true,
        isCraftingRankBelowCap: (): LookupResult<boolean> => {
          inspireCalls += 1
          return true
        },
      })
      const result = checkCrossCharacterCraft(
        { ...baseRule, canResearch: "can-research", canInspire: "can-inspire" },
        heavyArmorFacts,
        ctx
      )
      expect(result.kind).toBe("fail")
      if (result.kind === "fail") expect(result.conditionKind).toBe("canResearch")
      expect(inspireCalls).toBe(0)
    })

    test("both pass returns pass", () => {
      const ctx = makeCtx({
        getAllCharacters: () => ["alice"],
        isTraitResearched: () => false,
        isCraftingRankBelowCap: () => true,
      })
      const result = checkCrossCharacterCraft(
        { ...baseRule, canResearch: "can-research", canInspire: "can-inspire" },
        heavyArmorFacts,
        ctx
      )
      expect(result.kind).toBe("pass")
    })
  })
})
