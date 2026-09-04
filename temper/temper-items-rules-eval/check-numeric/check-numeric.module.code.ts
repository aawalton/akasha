import { computeValue } from "@akasha/temper-items-core/inventory-display-value"
import { compareWithOp } from "@akasha/temper-items-rules-core/comparison-op"
import type { CompiledOrderedRule } from "@akasha/temper-items-rules-core/inventory-rule-compiler-types"
import { resolveThreshold } from "@akasha/temper-items-rules-core/rule-constants"
import type { ConditionCheckResult } from "../check-result/check-result.module.code.ts"
import type { EvalContext } from "../eval-env/eval-env.module.code.ts"
import type { ItemFacts } from "../item-facts/item-facts.module.code.ts"

export function checkNumeric(
  rule: CompiledOrderedRule,
  facts: ItemFacts,
  _ctx: EvalContext
): ConditionCheckResult {
  const hasAny =
    rule.maxQuality !== undefined ||
    rule.maxLevel !== undefined ||
    rule.value !== undefined ||
    rule.marketValue !== undefined ||
    rule.maxValue !== undefined ||
    rule.minValue !== undefined ||
    rule.merchantValue !== undefined ||
    rule.replacementValue !== undefined
  if (!hasAny) return { kind: "skip" }

  if (rule.maxQuality !== undefined) {
    if (facts.quality === undefined) {
      return { kind: "indeterminate", conditionKind: "maxQuality", missingSignal: "quality" }
    }
    const op = rule.qualityOp ?? "<="
    if (!compareWithOp(op, facts.quality, rule.maxQuality)) {
      return {
        kind: "fail",
        conditionKind: "maxQuality",
        detail: `${facts.quality} ${op} ${rule.maxQuality}`,
      }
    }
  }

  if (rule.maxLevel !== undefined) {
    if (facts.requiredLevel === undefined) {
      return { kind: "indeterminate", conditionKind: "maxLevel", missingSignal: "requiredLevel" }
    }
    if (facts.requiredCP === undefined) {
      return { kind: "indeterminate", conditionKind: "maxLevel", missingSignal: "requiredCP" }
    }
    const level =
      facts.requiredCP > 0 ? 50 + Math.floor(facts.requiredCP / 10) : facts.requiredLevel
    const op = rule.levelOp ?? "<="
    if (!compareWithOp(op, level, rule.maxLevel)) {
      return { kind: "fail", conditionKind: "maxLevel", detail: `${level} ${op} ${rule.maxLevel}` }
    }
  }

  if (rule.value !== undefined) {
    const ruleValue = resolveThreshold(rule.value)
    const cv = computeValue(facts.estimatedValue, facts.merchantValue, facts.replacementCost)
    const op = rule.valueOp ?? "<="
    if (cv === undefined) {
      if (!(ruleValue === 0 && op === "<=")) {
        return { kind: "fail", conditionKind: "value", detail: "all value signals undefined" }
      }
    } else if (!compareWithOp(op, cv, ruleValue)) {
      return { kind: "fail", conditionKind: "value", detail: `${cv} ${op} ${ruleValue}` }
    }
  }

  if (rule.marketValue !== undefined) {
    const ruleMarketValue = resolveThreshold(rule.marketValue)
    const ev = facts.estimatedValue
    const op = rule.marketValueOp ?? "<="
    if (ev === undefined) {
      if (!(ruleMarketValue === 0 && op === "<=")) {
        return { kind: "fail", conditionKind: "marketValue", detail: "estimatedValue undefined" }
      }
    } else if (!compareWithOp(op, ev, ruleMarketValue)) {
      return {
        kind: "fail",
        conditionKind: "marketValue",
        detail: `${ev} ${op} ${ruleMarketValue}`,
      }
    }
  } else if (rule.maxValue !== undefined || rule.minValue !== undefined) {
    const ev = facts.estimatedValue
    if (ev === undefined) {
      return {
        kind: "indeterminate",
        conditionKind: "marketValue",
        missingSignal: "estimatedValue",
      }
    }
    if (rule.maxValue !== undefined && ev > rule.maxValue) {
      return {
        kind: "fail",
        conditionKind: "marketValue",
        detail: `${ev} > maxValue ${rule.maxValue}`,
      }
    }
    if (rule.minValue !== undefined && ev < rule.minValue) {
      return {
        kind: "fail",
        conditionKind: "marketValue",
        detail: `${ev} < minValue ${rule.minValue}`,
      }
    }
  }

  if (rule.merchantValue !== undefined) {
    const ruleMerchantValue = resolveThreshold(rule.merchantValue)
    const sellPrice = facts.merchantValue ?? 0
    const op = rule.merchantValueOp ?? "<="
    if (!compareWithOp(op, sellPrice, ruleMerchantValue)) {
      return {
        kind: "fail",
        conditionKind: "merchantValue",
        detail: `${sellPrice} ${op} ${ruleMerchantValue}`,
      }
    }
  }

  if (rule.replacementValue !== undefined) {
    const ruleReplacementValue = resolveThreshold(rule.replacementValue)
    const rc = facts.replacementCost ?? 0
    const op = rule.replacementValueOp ?? "<="
    if (!compareWithOp(op, rc, ruleReplacementValue)) {
      return {
        kind: "fail",
        conditionKind: "replacementValue",
        detail: `${rc} ${op} ${ruleReplacementValue}`,
      }
    }
  }

  return { kind: "pass" }
}
