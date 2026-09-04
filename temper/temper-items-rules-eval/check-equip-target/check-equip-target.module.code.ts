import type { CompiledOrderedRule } from "@akasha/temper-items-rules-core/inventory-rule-compiler-types"
import type { ConditionCheckResult } from "../check-result/check-result.module.code.ts"
import type { EvalContext, WantedEquipmentFacts } from "../eval-env/eval-env.module.code.ts"
import type { ItemFacts } from "../item-facts/item-facts.module.code.ts"

export function checkEquipTarget(
  rule: CompiledOrderedRule,
  facts: ItemFacts,
  ctx: EvalContext
): ConditionCheckResult {
  if (rule.isTargetEquip === undefined && rule.isTargetCompanionEquip === undefined) {
    return { kind: "skip" }
  }

  const wantedFacts = buildWantedEquipmentFacts(facts)
  if (wantedFacts === undefined) {
    const conditionKind: "isTargetEquip" | "isTargetCompanionEquip" =
      rule.isTargetEquip !== undefined ? "isTargetEquip" : "isTargetCompanionEquip"
    let missingSignal: string
    if (facts.equipType === undefined) {
      missingSignal = "equipType"
    } else if (facts.traitType === undefined) {
      missingSignal = "traitType"
    } else {
      missingSignal = "quality"
    }
    return { kind: "indeterminate", conditionKind, missingSignal }
  }

  if (rule.isTargetEquip !== undefined) {
    const matches = ctx.env.matchesWantedEquipment(wantedFacts)
    if (matches === "unknown") {
      return {
        kind: "indeterminate",
        conditionKind: "isTargetEquip",
        missingSignal: "matchesWantedEquipment",
      }
    }
    if (rule.isTargetEquip === "is-target-equip" && !matches) {
      return { kind: "fail", conditionKind: "isTargetEquip" }
    }
    if (rule.isTargetEquip === "not-target-equip" && matches) {
      return { kind: "fail", conditionKind: "isTargetEquip" }
    }
  }

  if (rule.isTargetCompanionEquip !== undefined) {
    const matches = ctx.env.matchesWantedCompanionEquipment(wantedFacts)
    if (matches === "unknown") {
      return {
        kind: "indeterminate",
        conditionKind: "isTargetCompanionEquip",
        missingSignal: "matchesWantedCompanionEquipment",
      }
    }
    if (rule.isTargetCompanionEquip === "is-target-companion-equip" && !matches) {
      return { kind: "fail", conditionKind: "isTargetCompanionEquip" }
    }
    if (rule.isTargetCompanionEquip === "not-target-companion-equip" && matches) {
      return { kind: "fail", conditionKind: "isTargetCompanionEquip" }
    }
  }

  return { kind: "pass" }
}

export function buildWantedEquipmentFacts(facts: ItemFacts): WantedEquipmentFacts | undefined {
  if (facts.equipType === undefined) return undefined
  if (facts.traitType === undefined) return undefined
  if (facts.quality === undefined) return undefined
  return {
    equipType: facts.equipType,
    traitType: facts.traitType,
    quality: facts.quality,
    armorType: facts.armorType,
    weaponType: facts.weaponType,
  }
}
