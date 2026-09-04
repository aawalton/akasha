"use client"

import type { FilterId } from "@akasha/temper-items-rules-core/rule-filter-types"
import type { ReactNode } from "react"
import { RuleCardFilterChipCanLevelMorphs } from "../rule-card-filter-chip-can-level-morphs/rule-card-filter-chip-can-level-morphs.module.code.tsx"
import { RuleCardFilterChipPotionEffects } from "../rule-card-filter-chip-potion-effects/rule-card-filter-chip-potion-effects.module.code.tsx"
import { RuleCardFilterChipRequiredCurseState } from "../rule-card-filter-chip-required-curse-state/rule-card-filter-chip-required-curse-state.module.code.tsx"
import { RuleCardFilterChipRequiredSkillLines } from "../rule-card-filter-chip-required-skill-lines/rule-card-filter-chip-required-skill-lines.module.code.tsx"
import {
  type AbilityFilterId,
  RuleCardFilterChipAbility,
} from "../rule-card-filter-chips-ability/rule-card-filter-chips-ability.module.code.tsx"
import { RuleCardFilterChipItem } from "../rule-card-filter-chips-item/rule-card-filter-chips-item.module.code.tsx"
import type { ItemPropertyFilterId } from "../rule-card-filter-chips-item-filter-id/rule-card-filter-chips-item-filter-id.module.code.ts"
import {
  type QuantityFilterId,
  RuleCardFilterChipQuantity,
} from "../rule-card-filter-chips-quantity/rule-card-filter-chips-quantity.module.code.tsx"
import type { useRuleCard } from "../use-rule-card/use-rule-card.module.code.ts"

type RuleCardState = ReturnType<typeof useRuleCard>

const ITEM_PROPERTY_FILTER_IDS = new Set<string>([
  "quality",
  "traits",
  "set-sources",
  "location",
  "level",
  "stolen",
  "crafted",
  "bound",
  "bop-tradeable",
  "quest-relevant",
  "locked",
  "reconstructed",
  "transmuted",
  "known",
  "stack-fullness",
] satisfies ItemPropertyFilterId[])

const ABILITY_FILTER_IDS = new Set<string>([
  "can-inspire",
  "can-research",
  "can-unlock",
  "can-open",
  "can-sell",
  "can-list-at-guild-trader",
  "can-give-max-rewards",
  "can-companion-equip",
  "needed-for-target-character-build",
  "needed-for-target-companion-build",
] satisfies AbilityFilterId[])

function isItemPropertyFilterId(id: FilterId): id is ItemPropertyFilterId {
  return ITEM_PROPERTY_FILTER_IDS.has(id)
}

function isAbilityFilterId(id: FilterId): id is AbilityFilterId {
  return ABILITY_FILTER_IDS.has(id)
}

interface RuleCardFilterChipProps {
  id: FilterId
  state: Pick<
    RuleCardState,
    | "action"
    | "displayAction"
    | "qualityValue"
    | "qualityOption"
    | "qualityOp"
    | "levelValue"
    | "levelOp"
    | "stolenValue"
    | "craftedValue"
    | "boundValue"
    | "bopTradeableValue"
    | "questRelevantValue"
    | "lockedValue"
    | "reconstructedValue"
    | "transmutedValue"
    | "knownValue"
    | "stackFullnessValue"
    | "canInspireValue"
    | "canResearchValue"
    | "canUnlockValue"
    | "canOpenValue"
    | "canGiveMaxRewardsValue"
    | "canCompanionEquipValue"
    | "allStockedValue"
    | "stockThresholdValue"
    | "valueValue"
    | "valueOp"
    | "marketValueValue"
    | "marketValueOp"
    | "merchantValueValue"
    | "merchantValueOp"
    | "replacementValueValue"
    | "replacementValueOp"
    | "keepQuantityValue"
    | "targetQuantityValue"
    | "traitOptions"
    | "selectedTraitItems"
    | "selectedSetSourceItems"
    | "selectedLocationItems"
    | "itemNamePatternValue"
    | "requiredSkillLinesValue"
    | "requiredCurseStateValue"
    | "potionEffectsValue"
    | "handleQualityChange"
    | "handleQualityOpChange"
    | "handleTraitChange"
    | "handleSetSourceTypesChange"
    | "handleLocationChange"
    | "handleLevelChange"
    | "handleLevelOpChange"
    | "handleStolenChange"
    | "handleCraftedChange"
    | "handleBoundChange"
    | "handleBopTradeableChange"
    | "handleQuestRelevantChange"
    | "handleStackFullnessChange"
    | "handleLockedChange"
    | "handleReconstructedChange"
    | "handleTransmutedChange"
    | "handleKnownChange"
    | "handleCanInspireChange"
    | "handleCanUnlockChange"
    | "handleCanCompanionEquipChange"
    | "handleAllStockedChange"
    | "handleStockThresholdChange"
    | "handleCanResearchChange"
    | "handleValueChange"
    | "handleValueOpChange"
    | "handleMarketValueChange"
    | "handleMarketValueOpChange"
    | "handleMerchantValueChange"
    | "handleMerchantValueOpChange"
    | "handleReplacementValueChange"
    | "handleReplacementValueOpChange"
    | "handleKeepQuantityChange"
    | "handleTargetQuantityChange"
    | "handleItemNamePatternChange"
    | "handleRequiredSkillLineIdsChange"
    | "handleRequiredSkillLinesModeChange"
    | "handlePotionEffectsChange"
    | "handlePotionEffectsModeChange"
    | "handleRequiredCurseStateChange"
    | "handleRemoveFilter"
  >
}

export function RuleCardFilterChip({ id, state }: RuleCardFilterChipProps): ReactNode {
  if (isItemPropertyFilterId(id)) {
    return <RuleCardFilterChipItem id={id} state={state} />
  }
  if (isAbilityFilterId(id)) {
    return <RuleCardFilterChipAbility id={id} state={state} />
  }
  if (id === "required-skill-lines") {
    return <RuleCardFilterChipRequiredSkillLines state={state} />
  }
  if (id === "potion-effects") {
    return <RuleCardFilterChipPotionEffects state={state} />
  }
  if (id === "required-curse-state") {
    return <RuleCardFilterChipRequiredCurseState state={state} />
  }
  if (id === "can-level-morphs") {
    return <RuleCardFilterChipCanLevelMorphs state={state} />
  }
  return <RuleCardFilterChipQuantity id={id satisfies QuantityFilterId} state={state} />
}
