import { describe, expect, test } from "bun:test"
import type { CompiledOrderedRule } from "@temper/game-items-rules-core/inventory-rule-compiler-types"
import type { EvalContext, EvalEnv } from "../eval-env"
import type { ItemFacts } from "../item-facts"
import { checkClassification } from "./check-classification"

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
  categoryNodeIds: ["all"],
}

const ruleAll: CompiledOrderedRule = { categoryId: "all", action: "nothing" }

describe("checkClassification", () => {
  test("skip when no classification conditions are declared", () => {
    const result = checkClassification(ruleAll, baseFacts, stubCtx)
    expect(result.kind).toBe("skip")
  })

  describe("canSell", () => {
    test("pass when merchantValue > 0", () => {
      const result = checkClassification(
        { ...ruleAll, canSell: "can-sell" },
        { ...baseFacts, merchantValue: 50 },
        stubCtx
      )
      expect(result.kind).toBe("pass")
    })

    test("fail when merchantValue is 0", () => {
      const result = checkClassification(
        { ...ruleAll, canSell: "can-sell" },
        { ...baseFacts, merchantValue: 0 },
        stubCtx
      )
      expect(result.kind).toBe("fail")
      if (result.kind === "fail") expect(result.conditionKind).toBe("canSell")
    })

    test("fail when merchantValue is undefined (web canonical: ?? 0 <= 0)", () => {
      const result = checkClassification({ ...ruleAll, canSell: "can-sell" }, baseFacts, stubCtx)
      expect(result.kind).toBe("fail")
      if (result.kind === "fail") expect(result.conditionKind).toBe("canSell")
    })
  })

  describe("itemNamePattern", () => {
    test("pass on simple AND match (multi-token)", () => {
      const result = checkClassification(
        { ...ruleAll, itemNamePattern: "ancient elf" },
        { ...baseFacts, itemName: "Ancient Elf Greaves" },
        stubCtx
      )
      expect(result.kind).toBe("pass")
    })

    test("fail when one term is missing", () => {
      const result = checkClassification(
        { ...ruleAll, itemNamePattern: "ancient orc" },
        { ...baseFacts, itemName: "Ancient Elf Greaves" },
        stubCtx
      )
      expect(result.kind).toBe("fail")
      if (result.kind === "fail") expect(result.conditionKind).toBe("itemNamePattern")
    })

    test("pass on quoted phrase", () => {
      const result = checkClassification(
        { ...ruleAll, itemNamePattern: '"ancient elf"' },
        { ...baseFacts, itemName: "Ancient Elf Greaves" },
        stubCtx
      )
      expect(result.kind).toBe("pass")
    })

    test("fail when quoted phrase order differs", () => {
      const result = checkClassification(
        { ...ruleAll, itemNamePattern: '"elf ancient"' },
        { ...baseFacts, itemName: "Ancient Elf Greaves" },
        stubCtx
      )
      expect(result.kind).toBe("fail")
    })

    test("pass on negation when excluded term is absent", () => {
      const result = checkClassification(
        { ...ruleAll, itemNamePattern: "ancient -orc" },
        { ...baseFacts, itemName: "Ancient Elf Greaves" },
        stubCtx
      )
      expect(result.kind).toBe("pass")
    })

    test("fail on negation when excluded term is present", () => {
      const result = checkClassification(
        { ...ruleAll, itemNamePattern: "ancient -elf" },
        { ...baseFacts, itemName: "Ancient Elf Greaves" },
        stubCtx
      )
      expect(result.kind).toBe("fail")
    })
  })

  describe("canCompanionEquip", () => {
    test("pass when traitType is in companion range", () => {
      const result = checkClassification(
        { ...ruleAll, canCompanionEquip: "can-companion-equip" },
        { ...baseFacts, traitType: 40 },
        stubCtx
      )
      expect(result.kind).toBe("pass")
    })

    test("fail can-companion-equip when traitType is in player range", () => {
      const result = checkClassification(
        { ...ruleAll, canCompanionEquip: "can-companion-equip" },
        { ...baseFacts, traitType: 5 },
        stubCtx
      )
      expect(result.kind).toBe("fail")
      if (result.kind === "fail") expect(result.conditionKind).toBe("canCompanionEquip")
    })

    test("fail cannot-companion-equip when traitType is in companion range", () => {
      const result = checkClassification(
        { ...ruleAll, canCompanionEquip: "cannot-companion-equip" },
        { ...baseFacts, traitType: 40 },
        stubCtx
      )
      expect(result.kind).toBe("fail")
    })

    test("indeterminate when traitType is undefined", () => {
      const result = checkClassification(
        { ...ruleAll, canCompanionEquip: "can-companion-equip" },
        baseFacts,
        stubCtx
      )
      expect(result.kind).toBe("indeterminate")
      if (result.kind === "indeterminate") {
        expect(result.conditionKind).toBe("canCompanionEquip")
        expect(result.missingSignal).toBe("traitType")
      }
    })

    test("fail can-companion-equip deterministically when traitType is 0 (authoritative ITEM_TRAIT_TYPE_NONE sentinel)", () => {
      const result = checkClassification(
        { ...ruleAll, canCompanionEquip: "can-companion-equip" },
        { ...baseFacts, traitType: 0 },
        stubCtx
      )
      expect(result.kind).toBe("fail")
      if (result.kind === "fail") expect(result.conditionKind).toBe("canCompanionEquip")
    })
  })

  describe("traits", () => {
    test("pass when mapped Temper id is in allowed list (weapon, no equipType)", () => {
      const result = checkClassification(
        { ...ruleAll, traits: ["powered"] },
        { ...baseFacts, traitType: 1 },
        stubCtx
      )
      expect(result.kind).toBe("pass")
    })

    test("fail when ESO traitType has no Temper mapping", () => {
      const result = checkClassification(
        { ...ruleAll, traits: ["powered"] },
        { ...baseFacts, traitType: 99 },
        stubCtx
      )
      expect(result.kind).toBe("fail")
      if (result.kind === "fail") {
        expect(result.conditionKind).toBe("traits")
        expect(result.detail).toBe("no-temper-id")
      }
    })

    test("fail when mapped Temper id is not in allowed list", () => {
      const result = checkClassification(
        { ...ruleAll, traits: ["charged"] },
        { ...baseFacts, traitType: 1 },
        stubCtx
      )
      expect(result.kind).toBe("fail")
      if (result.kind === "fail") {
        expect(result.conditionKind).toBe("traits")
        expect(result.detail).toBe("powered")
      }
    })

    test("indeterminate when traitType is undefined", () => {
      const result = checkClassification({ ...ruleAll, traits: ["powered"] }, baseFacts, stubCtx)
      expect(result.kind).toBe("indeterminate")
      if (result.kind === "indeterminate") {
        expect(result.conditionKind).toBe("traits")
        expect(result.missingSignal).toBe("traitType")
      }
    })
  })

  describe("setSourceTypes", () => {
    test("pass when setId maps to allowed category", () => {
      const result = checkClassification(
        { ...ruleAll, setSourceTypes: ["crafted"] },
        { ...baseFacts, setId: 765 },
        stubCtx
      )
      expect(result.kind).toBe("pass")
    })

    test("fail when setId maps to a different category", () => {
      const result = checkClassification(
        { ...ruleAll, setSourceTypes: ["arena"] },
        { ...baseFacts, setId: 765 },
        stubCtx
      )
      expect(result.kind).toBe("fail")
      if (result.kind === "fail") {
        expect(result.conditionKind).toBe("setSourceTypes")
        expect(result.detail).toBe("crafted")
      }
    })

    test("pass-through when setId is undefined (web canonical: hasSet=false bypass)", () => {
      const result = checkClassification(
        { ...ruleAll, setSourceTypes: ["arena"] },
        baseFacts,
        stubCtx
      )
      expect(result.kind).toBe("pass")
    })
  })
})
