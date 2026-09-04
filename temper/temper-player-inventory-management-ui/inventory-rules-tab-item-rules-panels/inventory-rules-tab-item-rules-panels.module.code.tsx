"use client"

import type { BuyRule } from "@akasha/temper-items-rules-core/buy-rule-types"
import type { AffectedItem } from "@akasha/temper-items-rules-core/inventory-rule-matcher-types"
import type { CategoryRule, ItemRule } from "@akasha/temper-items-rules-core/inventory-rule-types"
import type * as React from "react"
import { BuyRulesPanel } from "../inventory-buy-rules-panel/inventory-buy-rules-panel.module.code.tsx"
import { CategoryRulesPanel } from "../inventory-category-rules-panel/inventory-category-rules-panel.module.code.tsx"
import type {
  ActiveStatusFilter,
  LockStatusFilter,
} from "../inventory-filter-types/inventory-filter-types.module.code.ts"
import { ItemRulesPanel } from "../inventory-item-rules-panel/inventory-item-rules-panel.module.code.tsx"
import type { InventoryRulesHandlers } from "../inventory-rules-handlers/inventory-rules-handlers.module.code.ts"
import type { DestinationOptions } from "../use-destination-options/use-destination-options.module.code.ts"

interface RulePartition {
  active: readonly string[]
  inactive: readonly string[]
  duplicate: readonly string[]
  locked: readonly string[]
  unlocked: readonly string[]
}

interface ItemRulesPanelsProps {
  sortedCategoryRules: readonly CategoryRule[]
  filteredCategoryRules: readonly CategoryRule[]
  visibleCategoryRuleIds: Set<string> | null
  categoryPartition: RulePartition
  categoryActiveDescriptions: readonly string[]
  categoryInactiveDescriptions: readonly string[]
  categoryDuplicateDescriptions: readonly string[]
  categoryUnlockedDescriptions: readonly string[]
  sortedItemRules: readonly ItemRule[]
  filteredItemRules: readonly ItemRule[]
  visibleItemRuleIds: Set<string> | null
  activeItemRuleIds: readonly string[]
  inactiveItemRuleIds: readonly string[]
  lockedItemRuleIds: readonly string[]
  unlockedItemRuleIds: readonly string[]
  itemActiveDescriptions: readonly string[]
  itemInactiveDescriptions: readonly string[]
  itemUnlockedDescriptions: readonly string[]
  buyRules: readonly BuyRule[]
  globalPriorityMap: Map<string, number>
  totalRules: number
  controlledRulesCount: number
  duplicateRuleIds: Set<string>
  affectedItemsMap: Map<string, readonly AffectedItem[]> | null
  destinationOptions: DestinationOptions
  onRuleStatusChange: (status: readonly ActiveStatusFilter[]) => void
  onRuleLockChange: (lock: readonly LockStatusFilter[]) => void
  handlers: InventoryRulesHandlers
  isSortActive: boolean
  hideCategoryPanel: boolean
  hideItemPanel: boolean
}

export function ItemRulesPanels({
  sortedCategoryRules,
  filteredCategoryRules,
  visibleCategoryRuleIds,
  categoryPartition,
  categoryActiveDescriptions,
  categoryInactiveDescriptions,
  categoryDuplicateDescriptions,
  categoryUnlockedDescriptions,
  sortedItemRules,
  filteredItemRules,
  visibleItemRuleIds,
  activeItemRuleIds,
  inactiveItemRuleIds,
  lockedItemRuleIds,
  unlockedItemRuleIds,
  itemActiveDescriptions,
  itemInactiveDescriptions,
  itemUnlockedDescriptions,
  buyRules,
  globalPriorityMap,
  totalRules,
  controlledRulesCount,
  duplicateRuleIds,
  affectedItemsMap,
  destinationOptions,
  onRuleStatusChange,
  onRuleLockChange,
  handlers,
  isSortActive,
  hideCategoryPanel,
  hideItemPanel,
}: ItemRulesPanelsProps): readonly React.ReactNode[] {
  return [
    <div key="category-rules" hidden={hideCategoryPanel}>
      <CategoryRulesPanel
        rules={sortedCategoryRules}
        globalPriorityMap={globalPriorityMap}
        totalRules={totalRules}
        controlledRulesCount={controlledRulesCount}
        filteredCategoryRules={filteredCategoryRules}
        visibleCategoryRuleIds={visibleCategoryRuleIds}
        duplicateRuleIds={duplicateRuleIds}
        affectedItemsMap={affectedItemsMap}
        destinationOptions={destinationOptions}
        activeCategoryRuleIds={categoryPartition.active}
        inactiveCategoryRuleIds={categoryPartition.inactive}
        duplicateCategoryRuleIds={categoryPartition.duplicate}
        lockedCategoryRuleIds={categoryPartition.locked}
        unlockedCategoryRuleIds={categoryPartition.unlocked}
        activeDescriptions={categoryActiveDescriptions}
        inactiveDescriptions={categoryInactiveDescriptions}
        duplicateDescriptions={categoryDuplicateDescriptions}
        unlockedDescriptions={categoryUnlockedDescriptions}
        onRuleStatusChange={onRuleStatusChange}
        onRuleLockChange={onRuleLockChange}
        handlers={handlers}
        isSortActive={isSortActive}
      />
    </div>,
    <div key="item-rules" hidden={hideItemPanel}>
      <ItemRulesPanel
        itemRules={sortedItemRules}
        filteredItemRules={filteredItemRules}
        visibleItemRuleIds={visibleItemRuleIds}
        destinationOptions={destinationOptions}
        activeItemRuleIds={activeItemRuleIds}
        inactiveItemRuleIds={inactiveItemRuleIds}
        lockedItemRuleIds={lockedItemRuleIds}
        unlockedItemRuleIds={unlockedItemRuleIds}
        activeDescriptions={itemActiveDescriptions}
        inactiveDescriptions={itemInactiveDescriptions}
        unlockedDescriptions={itemUnlockedDescriptions}
        onRuleStatusChange={onRuleStatusChange}
        onRuleLockChange={onRuleLockChange}
        handlers={handlers}
      />
    </div>,
    <BuyRulesPanel key="buy-rules" buyRules={buyRules} handlers={handlers} />,
  ]
}
