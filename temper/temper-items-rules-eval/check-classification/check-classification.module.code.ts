import { esoTraitToTemperId } from "@akasha/temper-items-core/eso-trait-reverse-map"
import { itemNameMatchesPattern } from "@akasha/temper-items-core/item-name-pattern"
import { SET_ESO_ID_TO_CATEGORY } from "@akasha/temper-items-core/set-category-mappings"
import type { CompiledOrderedRule } from "@akasha/temper-items-rules-core/inventory-rule-compiler-types"
import type { ConditionCheckResult } from "../check-result/check-result.module.code.ts"
import type { EvalContext } from "../eval-env/eval-env.module.code.ts"
import type { ItemFacts } from "../item-facts/item-facts.module.code.ts"

export function checkClassification(
  rule: CompiledOrderedRule,
  facts: ItemFacts,
  _ctx: EvalContext
): ConditionCheckResult {
  if (
    rule.canSell === undefined &&
    rule.itemNamePattern === undefined &&
    rule.canCompanionEquip === undefined &&
    rule.traits === undefined &&
    rule.setSourceTypes === undefined
  ) {
    return { kind: "skip" }
  }

  if (rule.canSell === "can-sell") {
    if ((facts.merchantValue ?? 0) <= 0) {
      return { kind: "fail", conditionKind: "canSell" }
    }
  }

  if (rule.itemNamePattern !== undefined) {
    if (!itemNameMatchesPattern(facts.itemName, rule.itemNamePattern)) {
      return { kind: "fail", conditionKind: "itemNamePattern" }
    }
  }

  if (rule.canCompanionEquip !== undefined) {
    if (facts.traitType === undefined) {
      return {
        kind: "indeterminate",
        conditionKind: "canCompanionEquip",
        missingSignal: "traitType",
      }
    }
    const isCompanionEquippable = facts.traitType >= 34 && facts.traitType <= 60
    if (rule.canCompanionEquip === "can-companion-equip" && !isCompanionEquippable) {
      return { kind: "fail", conditionKind: "canCompanionEquip" }
    }
    if (rule.canCompanionEquip === "cannot-companion-equip" && isCompanionEquippable) {
      return { kind: "fail", conditionKind: "canCompanionEquip" }
    }
  }

  if (rule.traits !== undefined && rule.traits.length > 0) {
    if (facts.traitType === undefined) {
      return { kind: "indeterminate", conditionKind: "traits", missingSignal: "traitType" }
    }
    const temperId = esoTraitToTemperId(facts.traitType, facts.equipType)
    if (temperId === undefined) {
      return { kind: "fail", conditionKind: "traits", detail: "no-temper-id" }
    }
    if (!rule.traits.includes(temperId)) {
      return { kind: "fail", conditionKind: "traits", detail: temperId }
    }
  }

  if (rule.setSourceTypes !== undefined && rule.setSourceTypes.length > 0) {
    if (facts.setId !== undefined) {
      const category = SET_ESO_ID_TO_CATEGORY[facts.setId] ?? "no-type"
      if (!rule.setSourceTypes.includes(category)) {
        return { kind: "fail", conditionKind: "setSourceTypes", detail: category }
      }
    }
  }

  return { kind: "pass" }
}
