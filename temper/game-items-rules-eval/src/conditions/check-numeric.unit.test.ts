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

describe("checkNumeric", () => {
  test("skip when no numeric condition is set", () => {
    expect(checkNumeric(rule({}), baseFacts, ctx)).toEqual({ kind: "skip" })
  })

  test("maxQuality default op '<=' passes", () => {
    const r = rule({ maxQuality: 3 })
    expect(checkNumeric(r, { ...baseFacts, quality: 3 }, ctx)).toEqual({ kind: "pass" })
    expect(checkNumeric(r, { ...baseFacts, quality: 2 }, ctx)).toEqual({ kind: "pass" })
  })

  test("maxQuality default op '<=' fails when greater", () => {
    const result = checkNumeric(rule({ maxQuality: 3 }), { ...baseFacts, quality: 4 }, ctx)
    expect(result.kind).toBe("fail")
    if (result.kind === "fail") expect(result.conditionKind).toBe("maxQuality")
  })

  test("maxQuality with each comparator op", () => {
    const facts = { ...baseFacts, quality: 3 }
    expect(checkNumeric(rule({ maxQuality: 3, qualityOp: "<" }), facts, ctx).kind).toBe("fail")
    expect(checkNumeric(rule({ maxQuality: 4, qualityOp: "<" }), facts, ctx).kind).toBe("pass")
    expect(checkNumeric(rule({ maxQuality: 3, qualityOp: ">=" }), facts, ctx).kind).toBe("pass")
    expect(checkNumeric(rule({ maxQuality: 4, qualityOp: ">=" }), facts, ctx).kind).toBe("fail")
    expect(checkNumeric(rule({ maxQuality: 2, qualityOp: ">" }), facts, ctx).kind).toBe("pass")
    expect(checkNumeric(rule({ maxQuality: 3, qualityOp: ">" }), facts, ctx).kind).toBe("fail")
    expect(checkNumeric(rule({ maxQuality: 3, qualityOp: "=" }), facts, ctx).kind).toBe("pass")
    expect(checkNumeric(rule({ maxQuality: 4, qualityOp: "=" }), facts, ctx).kind).toBe("fail")
    expect(checkNumeric(rule({ maxQuality: 3, qualityOp: "!=" }), facts, ctx).kind).toBe("fail")
    expect(checkNumeric(rule({ maxQuality: 4, qualityOp: "!=" }), facts, ctx).kind).toBe("pass")
  })

  test("maxQuality indeterminate when quality undefined", () => {
    const result = checkNumeric(rule({ maxQuality: 3 }), baseFacts, ctx)
    expect(result).toEqual({
      kind: "indeterminate",
      conditionKind: "maxQuality",
      missingSignal: "quality",
    })
  })

  test("maxLevel uses requiredLevel when CP is 0", () => {
    const facts = { ...baseFacts, requiredLevel: 30, requiredCP: 0 }
    expect(checkNumeric(rule({ maxLevel: 30 }), facts, ctx).kind).toBe("pass")
    expect(checkNumeric(rule({ maxLevel: 29 }), facts, ctx).kind).toBe("fail")
  })

  test("maxLevel uses combined CP scale when CP > 0 (CP160 -> 66)", () => {
    const facts = { ...baseFacts, requiredLevel: 50, requiredCP: 160 }
    expect(checkNumeric(rule({ maxLevel: 66 }), facts, ctx).kind).toBe("pass")
    expect(checkNumeric(rule({ maxLevel: 65 }), facts, ctx).kind).toBe("fail")
  })

  test("maxLevel respects levelOp", () => {
    const facts = { ...baseFacts, requiredLevel: 30, requiredCP: 0 }
    expect(checkNumeric(rule({ maxLevel: 30, levelOp: ">=" }), facts, ctx).kind).toBe("pass")
    expect(checkNumeric(rule({ maxLevel: 31, levelOp: ">=" }), facts, ctx).kind).toBe("fail")
  })

  test("maxLevel indeterminate when requiredLevel undefined", () => {
    const result = checkNumeric(rule({ maxLevel: 30 }), { ...baseFacts, requiredCP: 0 }, ctx)
    expect(result).toEqual({
      kind: "indeterminate",
      conditionKind: "maxLevel",
      missingSignal: "requiredLevel",
    })
  })

  test("maxLevel indeterminate when requiredCP undefined", () => {
    const result = checkNumeric(rule({ maxLevel: 30 }), { ...baseFacts, requiredLevel: 30 }, ctx)
    expect(result).toEqual({
      kind: "indeterminate",
      conditionKind: "maxLevel",
      missingSignal: "requiredCP",
    })
  })

  test("value passes via max of three signals", () => {
    const facts = { ...baseFacts, estimatedValue: 100, merchantValue: 50, replacementCost: 75 }
    expect(checkNumeric(rule({ value: 200 }), facts, ctx).kind).toBe("pass")
    expect(checkNumeric(rule({ value: 99 }), facts, ctx).kind).toBe("fail")
  })

  test("value uses default '<='", () => {
    const facts = { ...baseFacts, estimatedValue: 100, merchantValue: 0, replacementCost: 0 }
    expect(checkNumeric(rule({ value: 100 }), facts, ctx).kind).toBe("pass")
    expect(checkNumeric(rule({ value: 99 }), facts, ctx).kind).toBe("fail")
  })

  test("value with valueOp '>=' applied to combined", () => {
    const facts = { ...baseFacts, estimatedValue: 0, merchantValue: 0, replacementCost: 500 }
    expect(checkNumeric(rule({ value: 100, valueOp: ">=" }), facts, ctx).kind).toBe("pass")
    expect(checkNumeric(rule({ value: 600, valueOp: ">=" }), facts, ctx).kind).toBe("fail")
  })

  test("value=0 op '<=' passes when all value signals undefined (edge case)", () => {
    expect(checkNumeric(rule({ value: 0 }), baseFacts, ctx)).toEqual({ kind: "pass" })
    expect(checkNumeric(rule({ value: 0, valueOp: "<=" }), baseFacts, ctx)).toEqual({
      kind: "pass",
    })
  })

  test("value undefined-signals fails for any other rule shape", () => {
    expect(checkNumeric(rule({ value: 100 }), baseFacts, ctx).kind).toBe("fail")
    expect(checkNumeric(rule({ value: 0, valueOp: ">=" }), baseFacts, ctx).kind).toBe("fail")
    expect(checkNumeric(rule({ value: 0, valueOp: "=" }), baseFacts, ctx).kind).toBe("fail")
  })

  test("marketValue uses estimatedValue (default '<=')", () => {
    const facts = { ...baseFacts, estimatedValue: 50 }
    expect(checkNumeric(rule({ marketValue: 100 }), facts, ctx).kind).toBe("pass")
    expect(checkNumeric(rule({ marketValue: 49 }), facts, ctx).kind).toBe("fail")
  })

  test("marketValue with marketValueOp '>'", () => {
    const facts = { ...baseFacts, estimatedValue: 100 }
    expect(checkNumeric(rule({ marketValue: 50, marketValueOp: ">" }), facts, ctx).kind).toBe(
      "pass"
    )
    expect(checkNumeric(rule({ marketValue: 100, marketValueOp: ">" }), facts, ctx).kind).toBe(
      "fail"
    )
  })

  test("marketValue=0 op '<=' passes when estimatedValue undefined", () => {
    expect(checkNumeric(rule({ marketValue: 0 }), baseFacts, ctx)).toEqual({ kind: "pass" })
  })

  test("marketValue with undefined estimatedValue and non-vacuous shape fails", () => {
    expect(checkNumeric(rule({ marketValue: 100 }), baseFacts, ctx).kind).toBe("fail")
    expect(checkNumeric(rule({ marketValue: 0, marketValueOp: ">=" }), baseFacts, ctx).kind).toBe(
      "fail"
    )
  })

  test("maxValue legacy fallback when marketValue unset", () => {
    expect(
      checkNumeric(rule({ maxValue: 100 }), { ...baseFacts, estimatedValue: 50 }, ctx).kind
    ).toBe("pass")
    expect(
      checkNumeric(rule({ maxValue: 100 }), { ...baseFacts, estimatedValue: 200 }, ctx).kind
    ).toBe("fail")
  })

  test("minValue legacy fallback when marketValue unset", () => {
    expect(
      checkNumeric(rule({ minValue: 50 }), { ...baseFacts, estimatedValue: 100 }, ctx).kind
    ).toBe("pass")
    expect(
      checkNumeric(rule({ minValue: 50 }), { ...baseFacts, estimatedValue: 10 }, ctx).kind
    ).toBe("fail")
  })

  test("maxValue legacy indeterminate when estimatedValue undefined", () => {
    const result = checkNumeric(rule({ maxValue: 100 }), baseFacts, ctx)
    expect(result).toEqual({
      kind: "indeterminate",
      conditionKind: "marketValue",
      missingSignal: "estimatedValue",
    })
  })

  test("legacy maxValue/minValue NOT consulted when marketValue is set", () => {
    const facts = { ...baseFacts, estimatedValue: 50 }
    expect(checkNumeric(rule({ marketValue: 100, maxValue: 10 }), facts, ctx).kind).toBe("pass")
  })

  test("merchantValue defaults missing merchantValue facts to 0", () => {
    expect(checkNumeric(rule({ merchantValue: 0 }), baseFacts, ctx).kind).toBe("pass")
    expect(checkNumeric(rule({ merchantValue: 5 }), baseFacts, ctx).kind).toBe("pass")
    expect(
      checkNumeric(rule({ merchantValue: 0, merchantValueOp: ">" }), baseFacts, ctx).kind
    ).toBe("fail")
  })

  test("merchantValue with each op via supplied signal", () => {
    const facts = { ...baseFacts, merchantValue: 25 }
    expect(checkNumeric(rule({ merchantValue: 25 }), facts, ctx).kind).toBe("pass")
    expect(checkNumeric(rule({ merchantValue: 24 }), facts, ctx).kind).toBe("fail")
    expect(checkNumeric(rule({ merchantValue: 25, merchantValueOp: "=" }), facts, ctx).kind).toBe(
      "pass"
    )
    expect(checkNumeric(rule({ merchantValue: 25, merchantValueOp: "!=" }), facts, ctx).kind).toBe(
      "fail"
    )
  })

  test("replacementValue defaults missing replacementCost to 0", () => {
    expect(checkNumeric(rule({ replacementValue: 0 }), baseFacts, ctx).kind).toBe("pass")
    expect(
      checkNumeric(rule({ replacementValue: 0, replacementValueOp: ">" }), baseFacts, ctx).kind
    ).toBe("fail")
  })

  test("replacementValue with supplied signal and op", () => {
    const facts = { ...baseFacts, replacementCost: 1000 }
    expect(checkNumeric(rule({ replacementValue: 1000 }), facts, ctx).kind).toBe("pass")
    expect(
      checkNumeric(rule({ replacementValue: 500, replacementValueOp: ">=" }), facts, ctx).kind
    ).toBe("pass")
    expect(
      checkNumeric(rule({ replacementValue: 2000, replacementValueOp: ">=" }), facts, ctx).kind
    ).toBe("fail")
  })

  test("first failing condition wins (declared order)", () => {
    const facts = { ...baseFacts, quality: 5, requiredLevel: 99, requiredCP: 0 }
    const result = checkNumeric(rule({ maxQuality: 3, maxLevel: 50 }), facts, ctx)
    expect(result.kind).toBe("fail")
    if (result.kind === "fail") expect(result.conditionKind).toBe("maxQuality")
  })

  test("all conditions pass yields pass", () => {
    const facts = {
      ...baseFacts,
      quality: 2,
      requiredLevel: 30,
      requiredCP: 0,
      estimatedValue: 50,
      merchantValue: 10,
      replacementCost: 20,
    }
    const r = rule({
      maxQuality: 3,
      maxLevel: 50,
      value: 100,
      marketValue: 100,
      merchantValue: 100,
      replacementValue: 100,
    })
    expect(checkNumeric(r, facts, ctx)).toEqual({ kind: "pass" })
  })
})
