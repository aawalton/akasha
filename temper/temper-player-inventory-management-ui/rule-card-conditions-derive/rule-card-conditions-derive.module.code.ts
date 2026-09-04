import type { ComparisonOpId } from "@akasha/temper-items-rules-core/comparison-op-data"
import type { CategoryRule } from "@akasha/temper-items-rules-core/inventory-rule-types"
import type { RequiredCurseStateCondition } from "@akasha/temper-items-rules-core/required-curse-state-filter-types"
import type { RequiredSkillLinesCondition } from "@akasha/temper-items-rules-core/required-skill-lines-filter-types"
import { resolveThreshold } from "@akasha/temper-items-rules-core/rule-constants"
import { QUALITY_OPTIONS } from "@akasha/temper-items-rules-core/rule-quality-filter"
import { requireFirst } from "@akasha/utils-narrow/require-first"

export function deriveConditionValues(conditions: CategoryRule["conditions"]) {
  const qualityValue = conditions?.maxQuality != null ? String(conditions.maxQuality) : "1"
  const qualityOption =
    QUALITY_OPTIONS.find((o) => o.value === qualityValue) ??
    requireFirst(QUALITY_OPTIONS, "QUALITY_OPTIONS")
  const qualityOp: ComparisonOpId = conditions?.qualityOp ?? "<="

  const levelValue = conditions?.maxLevel != null ? String(conditions.maxLevel) : "65"
  const levelOp: ComparisonOpId = conditions?.levelOp ?? "<="

  const stolenValue = conditions?.stolen ?? "stolen"
  const craftedValue = conditions?.crafted ?? "crafted"
  const boundValue = conditions?.bound ?? "bound"
  const bopTradeableValue = conditions?.bopTradeable ?? "bop-tradeable"
  const questRelevantValue = conditions?.questRelevant ?? "quest-relevant"
  const lockedValue = conditions?.locked ?? "locked"
  const reconstructedValue = conditions?.reconstructed ?? "reconstructed"
  const transmutedValue = conditions?.transmuted ?? "transmuted"
  const knownValue = conditions?.known ?? "known"
  const stackFullnessValue = conditions?.stackFullness ?? "full"
  const canInspireValue = conditions?.canInspire ?? "can-inspire"
  const canResearchValue = conditions?.canResearch ?? "can-research"
  const canUnlockValue = conditions?.canUnlock ?? "can-unlock"
  const canOpenValue = conditions?.canOpen ?? "can-open"
  const canSellValue = conditions?.canSell ?? "can-sell"
  const canListAtGuildTraderValue = conditions?.canListAtGuildTrader ?? "can-list-at-guild-trader"
  const canGiveMaxRewardsValue = conditions?.canGiveMaxRewards ?? "can-give-max-rewards"
  const canCompanionEquipValue = conditions?.canCompanionEquip ?? "can-companion-equip"
  const allStockedValue = conditions?.allStocked ?? "all-stocked"
  const stockThresholdValue =
    conditions?.stockThreshold != null ? String(conditions.stockThreshold) : "200"

  const valueValue = conditions?.value != null ? String(resolveThreshold(conditions.value)) : "500"
  const valueOp: ComparisonOpId = conditions?.valueOp ?? "<="

  const rawMarketValue = conditions?.marketValue ?? conditions?.maxValue ?? conditions?.minValue
  const marketValueValue = rawMarketValue != null ? String(resolveThreshold(rawMarketValue)) : "500"
  const marketValueOp: ComparisonOpId =
    conditions?.marketValueOp ??
    (conditions?.minValue !== undefined && conditions?.marketValue === undefined ? ">=" : "<=")

  const merchantValueValue =
    conditions?.merchantValue != null ? String(resolveThreshold(conditions.merchantValue)) : "50"
  const merchantValueOp: ComparisonOpId = conditions?.merchantValueOp ?? "<="

  const replacementValueValue =
    conditions?.replacementValue != null
      ? String(resolveThreshold(conditions.replacementValue))
      : "500"
  const replacementValueOp: ComparisonOpId = conditions?.replacementValueOp ?? "<="

  const keepQuantityValue =
    conditions?.keepQuantity != null ? String(conditions.keepQuantity) : "100"
  const targetQuantityValue =
    conditions?.targetQuantity != null ? String(conditions.targetQuantity) : "200"

  const itemNamePatternValue = conditions?.itemNamePattern ?? ""

  const requiredSkillLinesValue: RequiredSkillLinesCondition = conditions?.requiredSkillLines ?? {
    skillLineIds: [],
    mode: "all-maxed",
  }

  const requiredCurseStateValue: RequiredCurseStateCondition | undefined =
    conditions?.requiredCurseState

  const potionEffectsValue: { effects: readonly string[]; mode: "all" | "any" } = {
    effects: conditions?.potionEffects ?? [],
    mode: conditions?.potionEffectsMode ?? "any",
  }

  return {
    qualityValue,
    qualityOption,
    qualityOp,
    levelValue,
    levelOp,
    stolenValue,
    craftedValue,
    boundValue,
    bopTradeableValue,
    questRelevantValue,
    lockedValue,
    reconstructedValue,
    transmutedValue,
    knownValue,
    stackFullnessValue,
    canInspireValue,
    canResearchValue,
    canUnlockValue,
    canOpenValue,
    canSellValue,
    canListAtGuildTraderValue,
    canGiveMaxRewardsValue,
    canCompanionEquipValue,
    allStockedValue,
    stockThresholdValue,
    valueValue,
    valueOp,
    marketValueValue,
    marketValueOp,
    merchantValueValue,
    merchantValueOp,
    replacementValueValue,
    replacementValueOp,
    keepQuantityValue,
    targetQuantityValue,
    itemNamePatternValue,
    requiredSkillLinesValue,
    requiredCurseStateValue,
    potionEffectsValue,
  }
}
