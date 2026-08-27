import { describe, expect, test } from "bun:test"
import type { CompiledOrderedRule } from "@temper/game-items-rules-core/inventory-rule-compiler-types"
import type { EvalContext, EvalEnv } from "../eval-env"
import type { ItemFacts } from "../item-facts"
import { checkEquipTarget } from "./check-equip-target"

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

function makeCtx(overrides: Partial<EvalEnv> = {}): EvalContext {
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
  equipType: 2,
  traitType: 5,
  quality: 4,
}

describe("checkEquipTarget", () => {
  test("skip when neither isTargetEquip nor isTargetCompanionEquip is set", () => {
    const result = checkEquipTarget(baseRule, baseFacts, makeCtx())
    expect(result.kind).toBe("skip")
  })

  describe("isTargetEquip", () => {
    test("pass when rule wants is-target-equip and env returns true", () => {
      const result = checkEquipTarget(
        { ...baseRule, isTargetEquip: "is-target-equip" },
        baseFacts,
        makeCtx({ matchesWantedEquipment: () => true })
      )
      expect(result.kind).toBe("pass")
    })

    test("fail when rule wants is-target-equip but env returns false", () => {
      const result = checkEquipTarget(
        { ...baseRule, isTargetEquip: "is-target-equip" },
        baseFacts,
        makeCtx({ matchesWantedEquipment: () => false })
      )
      expect(result.kind).toBe("fail")
      if (result.kind === "fail") expect(result.conditionKind).toBe("isTargetEquip")
    })

    test("pass when rule wants not-target-equip and env returns false", () => {
      const result = checkEquipTarget(
        { ...baseRule, isTargetEquip: "not-target-equip" },
        baseFacts,
        makeCtx({ matchesWantedEquipment: () => false })
      )
      expect(result.kind).toBe("pass")
    })

    test("fail when rule wants not-target-equip but env returns true", () => {
      const result = checkEquipTarget(
        { ...baseRule, isTargetEquip: "not-target-equip" },
        baseFacts,
        makeCtx({ matchesWantedEquipment: () => true })
      )
      expect(result.kind).toBe("fail")
      if (result.kind === "fail") expect(result.conditionKind).toBe("isTargetEquip")
    })

    test("indeterminate when env returns 'unknown'", () => {
      const result = checkEquipTarget(
        { ...baseRule, isTargetEquip: "is-target-equip" },
        baseFacts,
        makeCtx({ matchesWantedEquipment: () => "unknown" })
      )
      expect(result.kind).toBe("indeterminate")
      if (result.kind === "indeterminate") {
        expect(result.conditionKind).toBe("isTargetEquip")
        expect(result.missingSignal).toBe("matchesWantedEquipment")
      }
    })
  })

  describe("isTargetCompanionEquip", () => {
    test("pass when rule wants is-target-companion-equip and env returns true", () => {
      const result = checkEquipTarget(
        { ...baseRule, isTargetCompanionEquip: "is-target-companion-equip" },
        baseFacts,
        makeCtx({ matchesWantedCompanionEquipment: () => true })
      )
      expect(result.kind).toBe("pass")
    })

    test("fail when rule wants is-target-companion-equip but env returns false", () => {
      const result = checkEquipTarget(
        { ...baseRule, isTargetCompanionEquip: "is-target-companion-equip" },
        baseFacts,
        makeCtx({ matchesWantedCompanionEquipment: () => false })
      )
      expect(result.kind).toBe("fail")
      if (result.kind === "fail") expect(result.conditionKind).toBe("isTargetCompanionEquip")
    })

    test("pass when rule wants not-target-companion-equip and env returns false", () => {
      const result = checkEquipTarget(
        { ...baseRule, isTargetCompanionEquip: "not-target-companion-equip" },
        baseFacts,
        makeCtx({ matchesWantedCompanionEquipment: () => false })
      )
      expect(result.kind).toBe("pass")
    })

    test("fail when rule wants not-target-companion-equip but env returns true", () => {
      const result = checkEquipTarget(
        { ...baseRule, isTargetCompanionEquip: "not-target-companion-equip" },
        baseFacts,
        makeCtx({ matchesWantedCompanionEquipment: () => true })
      )
      expect(result.kind).toBe("fail")
      if (result.kind === "fail") expect(result.conditionKind).toBe("isTargetCompanionEquip")
    })

    test("indeterminate when env returns 'unknown'", () => {
      const result = checkEquipTarget(
        { ...baseRule, isTargetCompanionEquip: "is-target-companion-equip" },
        baseFacts,
        makeCtx({ matchesWantedCompanionEquipment: () => "unknown" })
      )
      expect(result.kind).toBe("indeterminate")
      if (result.kind === "indeterminate") {
        expect(result.conditionKind).toBe("isTargetCompanionEquip")
        expect(result.missingSignal).toBe("matchesWantedCompanionEquipment")
      }
    })
  })

  describe("both fields together", () => {
    test("pass when both isTargetEquip and isTargetCompanionEquip are satisfied", () => {
      const result = checkEquipTarget(
        {
          ...baseRule,
          isTargetEquip: "is-target-equip",
          isTargetCompanionEquip: "is-target-companion-equip",
        },
        baseFacts,
        makeCtx({
          matchesWantedEquipment: () => true,
          matchesWantedCompanionEquipment: () => true,
        })
      )
      expect(result.kind).toBe("pass")
    })

    test("isTargetEquip evaluated first; failure short-circuits before isTargetCompanionEquip", () => {
      const result = checkEquipTarget(
        {
          ...baseRule,
          isTargetEquip: "is-target-equip",
          isTargetCompanionEquip: "is-target-companion-equip",
        },
        baseFacts,
        makeCtx({
          matchesWantedEquipment: () => false,
          matchesWantedCompanionEquipment: () => false,
        })
      )
      expect(result.kind).toBe("fail")
      if (result.kind === "fail") expect(result.conditionKind).toBe("isTargetEquip")
    })

    test("isTargetEquip passes, isTargetCompanionEquip fails: returns companion fail", () => {
      const result = checkEquipTarget(
        {
          ...baseRule,
          isTargetEquip: "is-target-equip",
          isTargetCompanionEquip: "is-target-companion-equip",
        },
        baseFacts,
        makeCtx({
          matchesWantedEquipment: () => true,
          matchesWantedCompanionEquipment: () => false,
        })
      )
      expect(result.kind).toBe("fail")
      if (result.kind === "fail") expect(result.conditionKind).toBe("isTargetCompanionEquip")
    })
  })

  describe("missing facts", () => {
    test("indeterminate when facts.equipType is undefined", () => {
      const result = checkEquipTarget(
        { ...baseRule, isTargetEquip: "is-target-equip" },
        { ...baseFacts, equipType: undefined },
        makeCtx({ matchesWantedEquipment: () => true })
      )
      expect(result.kind).toBe("indeterminate")
      if (result.kind === "indeterminate") {
        expect(result.conditionKind).toBe("isTargetEquip")
        expect(result.missingSignal).toBe("equipType")
      }
    })

    test("indeterminate when facts.traitType is undefined", () => {
      const result = checkEquipTarget(
        { ...baseRule, isTargetEquip: "is-target-equip" },
        { ...baseFacts, traitType: undefined },
        makeCtx({ matchesWantedEquipment: () => true })
      )
      expect(result.kind).toBe("indeterminate")
      if (result.kind === "indeterminate") {
        expect(result.conditionKind).toBe("isTargetEquip")
        expect(result.missingSignal).toBe("traitType")
      }
    })

    test("indeterminate when facts.quality is undefined", () => {
      const result = checkEquipTarget(
        { ...baseRule, isTargetEquip: "is-target-equip" },
        { ...baseFacts, quality: undefined },
        makeCtx({ matchesWantedEquipment: () => true })
      )
      expect(result.kind).toBe("indeterminate")
      if (result.kind === "indeterminate") {
        expect(result.conditionKind).toBe("isTargetEquip")
        expect(result.missingSignal).toBe("quality")
      }
    })

    test("indeterminate cites isTargetCompanionEquip when only that field is set", () => {
      const result = checkEquipTarget(
        { ...baseRule, isTargetCompanionEquip: "is-target-companion-equip" },
        { ...baseFacts, equipType: undefined },
        makeCtx({ matchesWantedCompanionEquipment: () => true })
      )
      expect(result.kind).toBe("indeterminate")
      if (result.kind === "indeterminate") {
        expect(result.conditionKind).toBe("isTargetCompanionEquip")
        expect(result.missingSignal).toBe("equipType")
      }
    })
  })
})
