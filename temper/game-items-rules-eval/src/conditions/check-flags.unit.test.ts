import { describe, expect, test } from "bun:test"
import type { CompiledOrderedRule } from "@temper/game-items-rules-core/inventory-rule-compiler-types"
import type { EvalContext, EvalEnv } from "../eval-env"
import type { ItemFacts } from "../item-facts"
import { checkFlags } from "./check-flags"

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

describe("checkFlags", () => {
  test("skip when rule declares no flag conditions", () => {
    const result = checkFlags(baseRule, baseFacts, stubCtx)
    expect(result.kind).toBe("skip")
  })

  describe("stolen", () => {
    test("pass when rule wants stolen and item is stolen", () => {
      const result = checkFlags(
        { ...baseRule, stolen: "stolen" },
        { ...baseFacts, isStolen: true },
        stubCtx
      )
      expect(result.kind).toBe("pass")
    })

    test("pass when rule wants not-stolen and item is not stolen", () => {
      const result = checkFlags(
        { ...baseRule, stolen: "not-stolen" },
        { ...baseFacts, isStolen: false },
        stubCtx
      )
      expect(result.kind).toBe("pass")
    })

    test("fail when rule wants stolen but item is not stolen", () => {
      const result = checkFlags(
        { ...baseRule, stolen: "stolen" },
        { ...baseFacts, isStolen: false },
        stubCtx
      )
      expect(result.kind).toBe("fail")
      if (result.kind === "fail") expect(result.conditionKind).toBe("stolen")
    })

    test("fail when rule wants not-stolen but item is stolen", () => {
      const result = checkFlags(
        { ...baseRule, stolen: "not-stolen" },
        { ...baseFacts, isStolen: true },
        stubCtx
      )
      expect(result.kind).toBe("fail")
      if (result.kind === "fail") expect(result.conditionKind).toBe("stolen")
    })

    test("indeterminate when isStolen is undefined", () => {
      const result = checkFlags({ ...baseRule, stolen: "stolen" }, baseFacts, stubCtx)
      expect(result.kind).toBe("indeterminate")
      if (result.kind === "indeterminate") {
        expect(result.conditionKind).toBe("stolen")
        expect(result.missingSignal).toBe("isStolen")
      }
    })
  })

  describe("bound", () => {
    test("pass when rule wants bound and item is bound", () => {
      const result = checkFlags(
        { ...baseRule, bound: "bound" },
        { ...baseFacts, isBound: true },
        stubCtx
      )
      expect(result.kind).toBe("pass")
    })

    test("pass when rule wants not-bound and item is not bound", () => {
      const result = checkFlags(
        { ...baseRule, bound: "not-bound" },
        { ...baseFacts, isBound: false },
        stubCtx
      )
      expect(result.kind).toBe("pass")
    })

    test("fail when rule wants bound but item is not bound", () => {
      const result = checkFlags(
        { ...baseRule, bound: "bound" },
        { ...baseFacts, isBound: false },
        stubCtx
      )
      expect(result.kind).toBe("fail")
      if (result.kind === "fail") expect(result.conditionKind).toBe("bound")
    })

    test("fail when rule wants not-bound but item is bound", () => {
      const result = checkFlags(
        { ...baseRule, bound: "not-bound" },
        { ...baseFacts, isBound: true },
        stubCtx
      )
      expect(result.kind).toBe("fail")
      if (result.kind === "fail") expect(result.conditionKind).toBe("bound")
    })

    test("indeterminate when isBound is undefined", () => {
      const result = checkFlags({ ...baseRule, bound: "not-bound" }, baseFacts, stubCtx)
      expect(result.kind).toBe("indeterminate")
      if (result.kind === "indeterminate") {
        expect(result.conditionKind).toBe("bound")
        expect(result.missingSignal).toBe("isBound")
      }
    })
  })

  describe("locked", () => {
    test("pass when rule wants locked and item is locked", () => {
      const result = checkFlags(
        { ...baseRule, locked: "locked" },
        { ...baseFacts, isLocked: true },
        stubCtx
      )
      expect(result.kind).toBe("pass")
    })

    test("pass when rule wants not-locked and item is not locked", () => {
      const result = checkFlags(
        { ...baseRule, locked: "not-locked" },
        { ...baseFacts, isLocked: false },
        stubCtx
      )
      expect(result.kind).toBe("pass")
    })

    test("fail when rule wants locked but item is not locked", () => {
      const result = checkFlags(
        { ...baseRule, locked: "locked" },
        { ...baseFacts, isLocked: false },
        stubCtx
      )
      expect(result.kind).toBe("fail")
      if (result.kind === "fail") expect(result.conditionKind).toBe("locked")
    })

    test("fail when rule wants not-locked but item is locked", () => {
      const result = checkFlags(
        { ...baseRule, locked: "not-locked" },
        { ...baseFacts, isLocked: true },
        stubCtx
      )
      expect(result.kind).toBe("fail")
      if (result.kind === "fail") expect(result.conditionKind).toBe("locked")
    })

    test("indeterminate when isLocked is undefined", () => {
      const result = checkFlags({ ...baseRule, locked: "not-locked" }, baseFacts, stubCtx)
      expect(result.kind).toBe("indeterminate")
      if (result.kind === "indeterminate") {
        expect(result.conditionKind).toBe("locked")
        expect(result.missingSignal).toBe("isLocked")
      }
    })
  })

  describe("reconstructed", () => {
    test("pass when rule wants reconstructed and item is reconstructed", () => {
      const result = checkFlags(
        { ...baseRule, reconstructed: "reconstructed" },
        { ...baseFacts, isReconstructed: true },
        stubCtx
      )
      expect(result.kind).toBe("pass")
    })

    test("pass when rule wants not-reconstructed and item is not reconstructed", () => {
      const result = checkFlags(
        { ...baseRule, reconstructed: "not-reconstructed" },
        { ...baseFacts, isReconstructed: false },
        stubCtx
      )
      expect(result.kind).toBe("pass")
    })

    test("fail when rule wants reconstructed but item is not reconstructed", () => {
      const result = checkFlags(
        { ...baseRule, reconstructed: "reconstructed" },
        { ...baseFacts, isReconstructed: false },
        stubCtx
      )
      expect(result.kind).toBe("fail")
      if (result.kind === "fail") expect(result.conditionKind).toBe("reconstructed")
    })

    test("fail when rule wants not-reconstructed but item is reconstructed", () => {
      const result = checkFlags(
        { ...baseRule, reconstructed: "not-reconstructed" },
        { ...baseFacts, isReconstructed: true },
        stubCtx
      )
      expect(result.kind).toBe("fail")
      if (result.kind === "fail") expect(result.conditionKind).toBe("reconstructed")
    })

    test("indeterminate when isReconstructed is undefined", () => {
      const result = checkFlags(
        { ...baseRule, reconstructed: "not-reconstructed" },
        baseFacts,
        stubCtx
      )
      expect(result.kind).toBe("indeterminate")
      if (result.kind === "indeterminate") {
        expect(result.conditionKind).toBe("reconstructed")
        expect(result.missingSignal).toBe("isReconstructed")
      }
    })
  })

  describe("transmuted", () => {
    test("pass when rule wants transmuted and item is transmuted", () => {
      const result = checkFlags(
        { ...baseRule, transmuted: "transmuted" },
        { ...baseFacts, isTransmuted: true },
        stubCtx
      )
      expect(result.kind).toBe("pass")
    })

    test("pass when rule wants not-transmuted and item is not transmuted", () => {
      const result = checkFlags(
        { ...baseRule, transmuted: "not-transmuted" },
        { ...baseFacts, isTransmuted: false },
        stubCtx
      )
      expect(result.kind).toBe("pass")
    })

    test("fail when rule wants transmuted but item is not transmuted", () => {
      const result = checkFlags(
        { ...baseRule, transmuted: "transmuted" },
        { ...baseFacts, isTransmuted: false },
        stubCtx
      )
      expect(result.kind).toBe("fail")
      if (result.kind === "fail") expect(result.conditionKind).toBe("transmuted")
    })

    test("fail when rule wants not-transmuted but item is transmuted", () => {
      const result = checkFlags(
        { ...baseRule, transmuted: "not-transmuted" },
        { ...baseFacts, isTransmuted: true },
        stubCtx
      )
      expect(result.kind).toBe("fail")
      if (result.kind === "fail") expect(result.conditionKind).toBe("transmuted")
    })

    test("indeterminate when isTransmuted is undefined", () => {
      const result = checkFlags({ ...baseRule, transmuted: "not-transmuted" }, baseFacts, stubCtx)
      expect(result.kind).toBe("indeterminate")
      if (result.kind === "indeterminate") {
        expect(result.conditionKind).toBe("transmuted")
        expect(result.missingSignal).toBe("isTransmuted")
      }
    })
  })

  describe("crafted", () => {
    test("pass when rule wants crafted and item is crafted", () => {
      const result = checkFlags(
        { ...baseRule, crafted: "crafted" },
        { ...baseFacts, isCrafted: true },
        stubCtx
      )
      expect(result.kind).toBe("pass")
    })

    test("pass when rule wants not-crafted and item is not crafted", () => {
      const result = checkFlags(
        { ...baseRule, crafted: "not-crafted" },
        { ...baseFacts, isCrafted: false },
        stubCtx
      )
      expect(result.kind).toBe("pass")
    })

    test("fail when rule wants crafted but item is not crafted", () => {
      const result = checkFlags(
        { ...baseRule, crafted: "crafted" },
        { ...baseFacts, isCrafted: false },
        stubCtx
      )
      expect(result.kind).toBe("fail")
      if (result.kind === "fail") expect(result.conditionKind).toBe("crafted")
    })

    test("fail when rule wants not-crafted but item is crafted", () => {
      const result = checkFlags(
        { ...baseRule, crafted: "not-crafted" },
        { ...baseFacts, isCrafted: true },
        stubCtx
      )
      expect(result.kind).toBe("fail")
      if (result.kind === "fail") expect(result.conditionKind).toBe("crafted")
    })

    test("indeterminate when isCrafted is undefined", () => {
      const result = checkFlags({ ...baseRule, crafted: "not-crafted" }, baseFacts, stubCtx)
      expect(result.kind).toBe("indeterminate")
      if (result.kind === "indeterminate") {
        expect(result.conditionKind).toBe("crafted")
        expect(result.missingSignal).toBe("isCrafted")
      }
    })
  })

  describe("multi-flag rules", () => {
    test("pass when not-stolen + not-locked both satisfied", () => {
      const result = checkFlags(
        { ...baseRule, stolen: "not-stolen", locked: "not-locked" },
        { ...baseFacts, isStolen: false, isLocked: false },
        stubCtx
      )
      expect(result.kind).toBe("pass")
    })

    test("stolen indeterminate short-circuits before locked is evaluated", () => {
      const result = checkFlags(
        { ...baseRule, stolen: "not-stolen", locked: "not-locked" },
        { ...baseFacts, isLocked: true },
        stubCtx
      )
      expect(result.kind).toBe("indeterminate")
      if (result.kind === "indeterminate") {
        expect(result.conditionKind).toBe("stolen")
        expect(result.missingSignal).toBe("isStolen")
      }
    })

    test("locked indeterminate when stolen passes deterministically", () => {
      const result = checkFlags(
        { ...baseRule, stolen: "not-stolen", locked: "not-locked" },
        { ...baseFacts, isStolen: false },
        stubCtx
      )
      expect(result.kind).toBe("indeterminate")
      if (result.kind === "indeterminate") {
        expect(result.conditionKind).toBe("locked")
        expect(result.missingSignal).toBe("isLocked")
      }
    })

    test("stolen passes, locked fails: returns locked fail", () => {
      const result = checkFlags(
        { ...baseRule, stolen: "not-stolen", locked: "not-locked" },
        { ...baseFacts, isStolen: false, isLocked: true },
        stubCtx
      )
      expect(result.kind).toBe("fail")
      if (result.kind === "fail") expect(result.conditionKind).toBe("locked")
    })

    test("all six flags satisfied returns pass", () => {
      const result = checkFlags(
        {
          ...baseRule,
          stolen: "not-stolen",
          bound: "bound",
          locked: "not-locked",
          reconstructed: "not-reconstructed",
          transmuted: "not-transmuted",
          crafted: "crafted",
        },
        {
          ...baseFacts,
          isStolen: false,
          isBound: true,
          isLocked: false,
          isReconstructed: false,
          isTransmuted: false,
          isCrafted: true,
        },
        stubCtx
      )
      expect(result.kind).toBe("pass")
    })
  })
})
