"use client"

import { ButtonBadge } from "akasha/design/interface/badge/modules/button-badge/button-badge.module.code.tsx"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "akasha/design/interface/primitive/modules/dropdown-menu/dropdown-menu.module.code.tsx"
import { titleIn } from "akasha/temper/items/core/modules/keyed-titles/keyed-titles.module.code.ts"
import { RuleCardFilterChip } from "akasha/temper/web/player-inventory-management-ui/modules/rule-card-filter-chip/rule-card-filter-chip.module.code.tsx"
import { useRuleCardPhrases } from "akasha/temper/web/player-inventory-management-ui/modules/rule-card-phrase/rule-card-phrase.module.code.tsx"
import type { useRuleCard } from "akasha/temper/web/player-inventory-management-ui/modules/use-rule-card/use-rule-card.module.code.ts"
import { ruleCardFiltersAddFilter } from "akasha/temper/web/player-inventory-management-ui/temper-rule-card-phrase/pages/rule-card-filters-add-filter.temper-rule-card-phrase.ts"
import { Plus } from "lucide-react"
import { Fragment } from "react"

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
    | "itemIdsValue"
    | "handleAddFilter"
    | "handleRemoveFilter"
  >
}

export function RuleCardFilters({ state }: RuleCardFiltersProps) {
  const { showFilter, filterOrder, availableFilters, handleAddFilter } = state
  const phrases = useRuleCardPhrases()

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
              {titleIn(phrases, ruleCardFiltersAddFilter.key)}
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
