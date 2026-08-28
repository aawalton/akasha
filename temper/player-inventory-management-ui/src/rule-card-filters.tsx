"use client"

import { ButtonBadge } from "@shared/design-badges/components/button-badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@shared/design-primitives/components/dropdown-menu"
import { Plus } from "lucide-react"
import { Fragment } from "react"
import { RuleCardFilterChip } from "./rule-card-filter-chip"
import type { useRuleCard } from "./use-rule-card"

type RuleCardState = ReturnType<typeof useRuleCard>

interface RuleCardFiltersProps {
  state: Pick<
    RuleCardState,
    | "action"
    | "displayAction"
    | "showFilter"
    | "filterOrder"
    | "availableFilters"
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
    | "itemNamePatternValue"
    | "handleItemNamePatternChange"
    | "requiredSkillLinesValue"
    | "handleRequiredSkillLineIdsChange"
    | "handleRequiredSkillLinesModeChange"
    | "requiredCurseStateValue"
    | "handleRequiredCurseStateChange"
    | "potionEffectsValue"
    | "handlePotionEffectsChange"
    | "handlePotionEffectsModeChange"
    | "handleAddFilter"
    | "handleRemoveFilter"
  >
}

export function RuleCardFilters({ state }: RuleCardFiltersProps) {
  const { showFilter, filterOrder, availableFilters, handleAddFilter } = state

  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {filterOrder.map((id) => {
        if (!showFilter.get(id)) return null
        return (
          <Fragment key={id}>
            <RuleCardFilterChip id={id} state={state} />
          </Fragment>
        )
      })}

      {}
      {availableFilters.length > 0 && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <ButtonBadge variant="elevation-muted" className="shrink-0">
              <Plus className="size-3" />
              Filter
            </ButtonBadge>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            {availableFilters.map((filter) => (
              <DropdownMenuItem key={filter.id} onClick={() => handleAddFilter(filter.id)}>
                {filter.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  )
}
