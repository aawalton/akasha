import type { InventoryLocationConditionId } from "@akasha/temper-items-core/location-condition"
import type { ComparisonOpId } from "@akasha/temper-items-rules-core/comparison-op-data"
import type { CategoryRule } from "@akasha/temper-items-rules-core/inventory-rule-types"
import type { RequiredCurseStateCondition } from "@akasha/temper-items-rules-core/required-curse-state-filter-types"
import type { RequiredSkillLinesCondition } from "@akasha/temper-items-rules-core/required-skill-lines-filter-types"
import type { RuleConstantKey } from "@akasha/temper-items-rules-core/rule-constants"
import {
  buildConditions,
  resolveOptionalThreshold,
} from "../rule-card-conditions-build/rule-card-conditions-build.module.code.ts"

export function patchConditions(
  current: CategoryRule["conditions"],
  patch: {
    maxQuality?: number
    qualityOp?: ComparisonOpId
    traits?: readonly string[]
    setSourceTypes?: readonly string[]
    location?: readonly InventoryLocationConditionId[]
    maxLevel?: number
    levelOp?: ComparisonOpId
    stolen?: "stolen" | "not-stolen"
    crafted?: "crafted" | "not-crafted"
    bound?: "bound" | "not-bound"
    bopTradeable?: "bop-tradeable" | "not-bop-tradeable"
    questRelevant?: "quest-relevant" | "not-quest-relevant"
    locked?: "locked" | "not-locked"
    reconstructed?: "reconstructed" | "not-reconstructed"
    transmuted?: "transmuted" | "not-transmuted"
    known?: "known" | "not-known"
    canInspire?: "can-inspire" | "cannot-inspire"
    canResearch?: "can-research" | "cannot-research"
    canUnlock?: "can-unlock" | "cannot-unlock"
    canOpen?: "can-open"
    canSell?: "can-sell"
    canListAtGuildTrader?: "can-list-at-guild-trader"
    canGiveMaxRewards?: "can-give-max-rewards"
    canCompanionEquip?: "can-companion-equip" | "cannot-companion-equip"
    isTargetEquip?: "is-target-equip" | "not-target-equip"
    isTargetCompanionEquip?: "is-target-companion-equip" | "not-target-companion-equip"
    allStocked?: "all-stocked" | "not-all-stocked"
    stockThreshold?: number
    value?: number | RuleConstantKey
    valueOp?: ComparisonOpId
    marketValue?: number | RuleConstantKey
    marketValueOp?: ComparisonOpId
    merchantValue?: number | RuleConstantKey
    merchantValueOp?: ComparisonOpId
    replacementValue?: number | RuleConstantKey
    replacementValueOp?: ComparisonOpId
    keepQuantity?: number
    targetQuantity?: number
    itemNamePattern?: string
    requiredSkillLines?: RequiredSkillLinesCondition
    requiredCurseState?: RequiredCurseStateCondition
    stackFullness?: "full" | "partial"
    potionEffects?: readonly string[]
    potionEffectsMode?: "all" | "any"
  }
) {
  return buildConditions(
    "maxQuality" in patch ? patch.maxQuality : current?.maxQuality,
    "qualityOp" in patch ? patch.qualityOp : current?.qualityOp,
    "traits" in patch ? patch.traits : current?.traits,
    "setSourceTypes" in patch ? patch.setSourceTypes : current?.setSourceTypes,
    "location" in patch ? patch.location : current?.location,
    "maxLevel" in patch ? patch.maxLevel : current?.maxLevel,
    "levelOp" in patch ? patch.levelOp : current?.levelOp,
    "stolen" in patch ? patch.stolen : current?.stolen,
    "crafted" in patch ? patch.crafted : current?.crafted,
    "bound" in patch ? patch.bound : current?.bound,
    "bopTradeable" in patch ? patch.bopTradeable : current?.bopTradeable,
    "questRelevant" in patch ? patch.questRelevant : current?.questRelevant,
    "locked" in patch ? patch.locked : current?.locked,
    "reconstructed" in patch ? patch.reconstructed : current?.reconstructed,
    "transmuted" in patch ? patch.transmuted : current?.transmuted,
    "known" in patch ? patch.known : current?.known,
    "canInspire" in patch ? patch.canInspire : current?.canInspire,
    "canResearch" in patch ? patch.canResearch : current?.canResearch,
    "canUnlock" in patch ? patch.canUnlock : current?.canUnlock,
    "canOpen" in patch ? patch.canOpen : current?.canOpen,
    "canSell" in patch ? patch.canSell : current?.canSell,
    "canListAtGuildTrader" in patch ? patch.canListAtGuildTrader : current?.canListAtGuildTrader,
    "canGiveMaxRewards" in patch ? patch.canGiveMaxRewards : current?.canGiveMaxRewards,
    "canCompanionEquip" in patch ? patch.canCompanionEquip : current?.canCompanionEquip,
    "isTargetEquip" in patch ? patch.isTargetEquip : current?.isTargetEquip,
    "isTargetCompanionEquip" in patch
      ? patch.isTargetCompanionEquip
      : current?.isTargetCompanionEquip,
    "allStocked" in patch ? patch.allStocked : current?.allStocked,
    "stockThreshold" in patch ? patch.stockThreshold : current?.stockThreshold,
    resolveOptionalThreshold("value" in patch ? patch.value : current?.value),
    "valueOp" in patch ? patch.valueOp : current?.valueOp,
    "marketValue" in patch
      ? resolveOptionalThreshold(patch.marketValue)
      : (resolveOptionalThreshold(current?.marketValue) ?? current?.maxValue ?? current?.minValue),
    "marketValueOp" in patch
      ? patch.marketValueOp
      : (current?.marketValueOp ??
          (current?.minValue !== undefined && current?.marketValue === undefined
            ? ">="
            : current?.marketValueOp)),
    resolveOptionalThreshold(
      "merchantValue" in patch ? patch.merchantValue : current?.merchantValue
    ),
    "merchantValueOp" in patch ? patch.merchantValueOp : current?.merchantValueOp,
    resolveOptionalThreshold(
      "replacementValue" in patch ? patch.replacementValue : current?.replacementValue
    ),
    "replacementValueOp" in patch ? patch.replacementValueOp : current?.replacementValueOp,
    "keepQuantity" in patch ? patch.keepQuantity : current?.keepQuantity,
    "targetQuantity" in patch ? patch.targetQuantity : current?.targetQuantity,
    "itemNamePattern" in patch ? patch.itemNamePattern : current?.itemNamePattern,
    "requiredSkillLines" in patch ? patch.requiredSkillLines : current?.requiredSkillLines,
    "requiredCurseState" in patch ? patch.requiredCurseState : current?.requiredCurseState,
    "stackFullness" in patch ? patch.stackFullness : current?.stackFullness,
    "potionEffects" in patch ? patch.potionEffects : current?.potionEffects,
    "potionEffectsMode" in patch ? patch.potionEffectsMode : current?.potionEffectsMode
  )
}
