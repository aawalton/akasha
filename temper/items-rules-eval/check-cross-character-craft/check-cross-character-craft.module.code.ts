import type { CompiledOrderedRule } from "@akasha/temper-items-rules-core/inventory-rule-compiler-types"
import type { ConditionCheckResult } from "../check-result/check-result.module.code.ts"
import {
  getTraitMapForCraftingType,
  inferInspireCraftingType,
  inferResearchCraftingType,
} from "../craft-inference/craft-inference.module.code.ts"
import type { EvalContext } from "../eval-env/eval-env.module.code.ts"
import type { ItemFacts } from "../item-facts/item-facts.module.code.ts"

export function checkCrossCharacterCraft(
  rule: CompiledOrderedRule,
  facts: ItemFacts,
  ctx: EvalContext
): ConditionCheckResult {
  if (rule.canResearch === undefined && rule.canInspire === undefined) {
    return { kind: "skip" }
  }

  if (rule.canResearch !== undefined) {
    if (facts.traitType === undefined) {
      return {
        kind: "indeterminate",
        conditionKind: "canResearch",
        missingSignal: "traitType",
      }
    }

    const craftingType = inferResearchCraftingType(facts)
    const traitMap =
      craftingType !== undefined
        ? getTraitMapForCraftingType(craftingType, facts.armorType)
        : undefined
    const traitName = traitMap !== undefined ? traitMap[facts.traitType] : undefined

    if (craftingType === undefined || traitName === undefined) {
      if (rule.canResearch === "can-research") {
        return {
          kind: "fail",
          conditionKind: "canResearch",
          detail: "trait not researchable",
        }
      }
    } else {
      const characters = ctx.env.getAllCharacters()
      if (characters === "unknown") {
        return {
          kind: "indeterminate",
          conditionKind: "canResearch",
          missingSignal: "characters",
        }
      }

      const traitKey = traitName.toLowerCase()
      let canResearch = false
      for (const charId of characters) {
        const result = ctx.env.isTraitResearched(charId, craftingType, traitKey)
        if (result === "unknown") {
          return {
            kind: "indeterminate",
            conditionKind: "canResearch",
            missingSignal: `research:${charId}`,
          }
        }
        if (result === false) {
          canResearch = true
        }
      }

      if (rule.canResearch === "can-research" && !canResearch) {
        return { kind: "fail", conditionKind: "canResearch" }
      }
      if (rule.canResearch === "cannot-research" && canResearch) {
        return { kind: "fail", conditionKind: "canResearch" }
      }
    }
  }

  if (rule.canInspire !== undefined) {
    const craftingType = inferInspireCraftingType(facts)
    if (craftingType === 0) {
      if (rule.canInspire === "can-inspire") {
        return {
          kind: "fail",
          conditionKind: "canInspire",
          detail: "craft type uninferrable",
        }
      }
    } else {
      const characters = ctx.env.getAllCharacters()
      if (characters === "unknown") {
        return {
          kind: "indeterminate",
          conditionKind: "canInspire",
          missingSignal: "characters",
        }
      }

      let canInspire = false
      for (const charId of characters) {
        const result = ctx.env.isCraftingRankBelowCap(charId, craftingType)
        if (result === "unknown") {
          return {
            kind: "indeterminate",
            conditionKind: "canInspire",
            missingSignal: `crafting:${charId}`,
          }
        }
        if (result === true) {
          canInspire = true
        }
      }

      if (rule.canInspire === "can-inspire" && !canInspire) {
        return { kind: "fail", conditionKind: "canInspire" }
      }
      if (rule.canInspire === "cannot-inspire" && canInspire) {
        return { kind: "fail", conditionKind: "canInspire" }
      }
    }
  }

  return { kind: "pass" }
}
