"use client"

import { useAuth } from "@shared/auth/use-auth"
import { LayoutLink } from "@shared/design-layout/router-context"
import type { SortDirection } from "@shared/design-patterns/utils/sort-types"
import { ResponsiveColumns } from "@shared/design-layout/components/responsive-columns"
import { Alert, AlertDescription, AlertTitle } from "@shared/design-primitives/components/alert"
import { partitionUnmanagedGuildBanks } from "@temper/game-items-core/inventory-guild-bank-filter"
import type { AffectedItem } from "@temper/game-items-rules-core/inventory-rule-matcher-types"
import { classifyAllInventoryItems } from "@temper/game-items-rules-matcher/inventory-item-classifier"
import { Package } from "lucide-react"
import { useMemo, useRef } from "react"
import { useInventory } from "./hooks-inventory"
import {
  useAutomationSettings,
  useBackpackSettings,
  useManagedGuildBanks,
} from "./hooks-inventory-settings"
import type { ActiveStatusFilter, LockStatusFilter, RuleSortField } from "./inventory-filter-types"
import { InventoryRulesFilterBar } from "./inventory-rules-filter-bar"
import { entityRulesPanels } from "./inventory-rules-tab/entity-rules-panels"
import { itemRulesPanels } from "./inventory-rules-tab/item-rules-panels"
import { inventoryRulePanelVisibility } from "./inventory-rules-tab/panel-visibility"
import { useAssembledInventoryRules } from "./inventory-rules-tab/rule-assembly"
import { InventoryScopeNote } from "./inventory-scope-note"
import { ManagementPlanPanelCard } from "./management-plan-panel-card"
import { UnmappedItemsPanelCard } from "./unmapped-items-panel-card"
import { useDestinationOptions } from "./use-destination-options"
import { type DeferredRuleFilters, useInventoryRulesFilter } from "./use-inventory-rules-filter"
import { useInventoryRulesSettingsState } from "./use-inventory-rules-settings-state"
import { useInventoryRulesTabAffectedItems } from "./use-inventory-rules-tab-affected-items"
import { useInventoryRulesTabDescriptions } from "./use-inventory-rules-tab-descriptions"
import { useRuleMatcherContext } from "./use-rule-matcher-context"

interface InventoryRulesTabProps {
  ruleStatus: readonly ActiveStatusFilter[]
  ruleLock: readonly LockStatusFilter[]
  ruleGoal: readonly string[]
  ruleAction: string | null
  ruleCategory: string
  ruleLocation: string | null
  ruleSearch: string
  ruleSortBy: RuleSortField
  ruleSortDir: SortDirection
  onRuleStatusChange: (status: readonly ActiveStatusFilter[]) => void
  onRuleLockChange: (lock: readonly LockStatusFilter[]) => void
  onRuleGoalChange: (goals: readonly string[]) => void
  onRuleActionChange: (action: string | null) => void
  onRuleCategoryChange: (id: string) => void
  onRuleLocationChange: (location: string | null) => void
  onRuleSearchChange: (search: string) => void
  onRuleSortChange: (sortBy: RuleSortField, sortDir: SortDirection) => void
  deferred: DeferredRuleFilters
}

export function InventoryRulesTab({
  ruleStatus,
  ruleLock,
  ruleGoal,
  ruleAction,
  ruleCategory = "",
  ruleLocation,
  ruleSearch,
  ruleSortBy,
  ruleSortDir,
  onRuleStatusChange,
  onRuleLockChange,
  onRuleGoalChange,
  onRuleActionChange,
  onRuleCategoryChange,
  onRuleLocationChange,
  onRuleSearchChange,
  onRuleSortChange,
  deferred,
}: InventoryRulesTabProps) {
  const { userId } = useAuth()
  const { localSettings, handlers } = useInventoryRulesSettingsState()
  const { inventory: rawInventory, isLoading: isInventoryLoading } = useInventory(userId)
  const { managedSet } = useManagedGuildBanks()
  const { automationSettings } = useAutomationSettings()
  const { backpackSettings } = useBackpackSettings()
  const destinationOptions = useDestinationOptions()

  const { inventory, excluded } = useMemo(
    () =>
      rawInventory
        ? partitionUnmanagedGuildBanks(rawInventory, managedSet)
        : { inventory: null, excluded: [] },
    [rawInventory, managedSet]
  )
  const classifiedItems = useMemo(
    () => (inventory ? classifyAllInventoryItems(inventory) : null),
    [inventory]
  )

  const automationSettingsFingerprintRef = useRef<string | null>(null)
  const stableAutomationSettingsRef = useRef(automationSettings)
  const automationSettingsFingerprint = JSON.stringify(automationSettings)
  if (automationSettingsFingerprint !== automationSettingsFingerprintRef.current) {
    automationSettingsFingerprintRef.current = automationSettingsFingerprint
    stableAutomationSettingsRef.current = automationSettings
  }
  const stableAutomationSettings = stableAutomationSettingsRef.current

  const matcherContext = useRuleMatcherContext(inventory, stableAutomationSettings)

  const {
    controlledCharacterRules,
    controlledCompanionRules,
    controlledRulesCount,
    allRulesForMatching,
    globalPriorityMap,
    deferredItemRules,
    deferredBuyRules,
    deferredAllRulesForMatching,
    duplicateRuleIds,
    itemRules,
    characterRules,
    companionRules,
    categoryRules,
  } = useAssembledInventoryRules(localSettings, stableAutomationSettings)

  const { affectedItemsMap, unmappedItems, managementPlan } = useInventoryRulesTabAffectedItems({
    inventory,
    classifiedItems,
    matcherContext,
    deferredAllRulesForMatching,
    deferredItemRules,
    bufferSlots: backpackSettings.bufferSlots,
    buyRules: deferredBuyRules,
  })

  const {
    hasAnyFilter,
    hasSortActive,
    hasLocationFilter,
    filteredCharacterRules,
    filteredCompanionRules,
    filteredCategoryRules,
    filteredItemRules,
    sortedCharacterRules,
    sortedCompanionRules,
    sortedCategoryRules,
    sortedItemRules,
    visibleCharacterRuleIds,
    visibleCompanionRuleIds,
    visibleControlledCharacterRuleIds,
    visibleControlledCompanionRuleIds,
    visibleCategoryRuleIds,
    visibleItemRuleIds,
    characterPartition,
    companionPartition,
    categoryPartition,
    activeItemRuleIds,
    inactiveItemRuleIds,
    lockedItemRuleIds,
    unlockedItemRuleIds,
    matchItemLocation,
  } = useInventoryRulesFilter(
    deferred,
    { ruleSortBy, ruleSortDir },
    characterRules,
    companionRules,
    categoryRules,
    itemRules,
    controlledCharacterRules,
    controlledCompanionRules,
    duplicateRuleIds,
    affectedItemsMap
  )

  const {
    characterActiveDescriptions,
    characterInactiveDescriptions,
    characterDuplicateDescriptions,
    characterUnlockedDescriptions,
    companionActiveDescriptions,
    companionInactiveDescriptions,
    companionDuplicateDescriptions,
    companionUnlockedDescriptions,
    categoryActiveDescriptions,
    categoryInactiveDescriptions,
    categoryDuplicateDescriptions,
    categoryUnlockedDescriptions,
    itemActiveDescriptions,
    itemInactiveDescriptions,
    itemUnlockedDescriptions,
  } = useInventoryRulesTabDescriptions({
    rules: localSettings.rules,
    itemRules,
    characterPartition,
    companionPartition,
    categoryPartition,
    activeItemRuleIds,
    inactiveItemRuleIds,
    unlockedItemRuleIds,
  })

  const displayAffectedItemsMap = useMemo(() => {
    if (!hasLocationFilter || !affectedItemsMap) return affectedItemsMap
    const filtered = new Map<string, AffectedItem[]>()
    for (const [ruleId, items] of affectedItemsMap) {
      filtered.set(
        ruleId,
        items.filter((item) => matchItemLocation(item.locationKey))
      )
    }
    return filtered
  }, [hasLocationFilter, affectedItemsMap, matchItemLocation])

  const { hideCharacterPanel, hideCompanionPanel, hideCategoryPanel, hideItemPanel } =
    inventoryRulePanelVisibility({
      hasAnyFilter,
      visibleCharacterRuleIds,
      visibleControlledCharacterRuleIds,
      visibleCompanionRuleIds,
      visibleControlledCompanionRuleIds,
      visibleCategoryRuleIds,
      visibleItemRuleIds,
    })

  return (
    <div className="flex flex-col gap-6">
      {inventory == null && !isInventoryLoading && (
        <Alert>
          <Package />
          <AlertTitle>No inventory has reached this page</AlertTitle>
          <AlertDescription>
            <p>
              Inventory comes from the file the TemperInventory add-on writes while you play — the
              Watcher syncs that file for you, or you can upload it by hand. The starter rules below
              are inactive; enable the ones you want once your inventory arrives.{" "}
              <LayoutLink href="/watcher" className="font-medium underline">
                Check sync status
              </LayoutLink>{" "}
              or{" "}
              <LayoutLink href="/import" className="font-medium underline">
                upload a file
              </LayoutLink>
              .
            </p>
          </AlertDescription>
        </Alert>
      )}
      <InventoryRulesFilterBar
        ruleStatus={ruleStatus}
        ruleLock={ruleLock}
        ruleGoal={ruleGoal}
        ruleAction={ruleAction}
        ruleCategory={ruleCategory}
        ruleLocation={ruleLocation}
        ruleSearch={ruleSearch}
        ruleSortBy={ruleSortBy}
        ruleSortDir={ruleSortDir}
        hasDuplicates={duplicateRuleIds.size > 0}
        inventory={inventory}
        onRuleStatusChange={onRuleStatusChange}
        onRuleLockChange={onRuleLockChange}
        onRuleGoalChange={onRuleGoalChange}
        onRuleActionChange={onRuleActionChange}
        onRuleCategoryChange={onRuleCategoryChange}
        onRuleLocationChange={onRuleLocationChange}
        onRuleSearchChange={onRuleSearchChange}
        onRuleSortChange={onRuleSortChange}
      />
      {}
      {inventory != null && <InventoryScopeNote excluded={excluded} includesCurrencies={false} />}
      <ResponsiveColumns sortChildren={false}>
        <ManagementPlanPanelCard
          plan={managementPlan}
          isInventoryLoading={isInventoryLoading}
          hasInventory={inventory != null}
        />
        <UnmappedItemsPanelCard
          items={
            hasLocationFilter
              ? unmappedItems.filter((item) => matchItemLocation(item.locationKey))
              : unmappedItems
          }
          totalCount={unmappedItems.length}
          isInventoryLoading={isInventoryLoading}
          hasInventory={inventory != null}
        />
        {entityRulesPanels({
          companionRules,
          sortedCharacterRules,
          sortedCompanionRules,
          filteredCharacterRules,
          filteredCompanionRules,
          controlledCharacterRules,
          controlledCompanionRules,
          controlledRulesCount,
          globalPriorityMap,
          totalRules: allRulesForMatching.length,
          visibleCharacterRuleIds,
          visibleCompanionRuleIds,
          visibleControlledCharacterRuleIds,
          visibleControlledCompanionRuleIds,
          duplicateRuleIds,
          affectedItemsMap: displayAffectedItemsMap,
          destinationOptions,
          characterPartition,
          companionPartition,
          characterActiveDescriptions,
          characterInactiveDescriptions,
          characterDuplicateDescriptions,
          characterUnlockedDescriptions,
          companionActiveDescriptions,
          companionInactiveDescriptions,
          companionDuplicateDescriptions,
          companionUnlockedDescriptions,
          onRuleStatusChange,
          onRuleLockChange,
          handlers,
          isSortActive: hasSortActive,
          hideCharacterPanel,
          hideCompanionPanel,
        })}
        {itemRulesPanels({
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
          buyRules: localSettings.buyRules ?? [],
          globalPriorityMap,
          totalRules: allRulesForMatching.length,
          controlledRulesCount,
          duplicateRuleIds,
          affectedItemsMap: displayAffectedItemsMap,
          destinationOptions,
          onRuleStatusChange,
          onRuleLockChange,
          handlers,
          isSortActive: hasSortActive,
          hideCategoryPanel,
          hideItemPanel,
        })}
      </ResponsiveColumns>
    </div>
  )
}
