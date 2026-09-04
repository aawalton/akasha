"use client"

import { ButtonBadge } from "@akasha/design-badges/button-badge"
import { PanelCard } from "@akasha/design-layout/panel-card"
import { Empty, EmptyDescription, EmptyHeader, EmptyTitle } from "@akasha/design-patterns/empty"
import { Button } from "@akasha/design-primitives/button"
import { CardTitleBadges } from "@akasha/design-primitives/card"
import type { AffectedItem } from "@akasha/temper-items-rules-core/inventory-rule-matcher-types"
import type { CategoryRule } from "@akasha/temper-items-rules-core/inventory-rule-types"
import { Plus } from "lucide-react"
import { useCallback, useState } from "react"
import type {
  ActiveStatusFilter,
  LockStatusFilter,
} from "../inventory-filter-types/inventory-filter-types.module.code.ts"
import { ResetBadge } from "../inventory-reset-badge/inventory-reset-badge.module.code.tsx"
import type { InventoryRulesHandlers } from "../inventory-rules-handlers/inventory-rules-handlers.module.code.ts"
import { RuleBulkActionBadge } from "../rule-bulk-action-badge/rule-bulk-action-badge.module.code.tsx"
import { RuleCard } from "../rule-card/rule-card.module.code.tsx"
import type { DestinationOptions } from "../use-destination-options/use-destination-options.module.code.ts"

const EMPTY_AFFECTED_ITEMS: AffectedItem[] = []

interface CategoryRulesPanelProps {
  rules: readonly CategoryRule[]
  globalPriorityMap: Map<string, number>
  totalRules: number
  controlledRulesCount: number
  filteredCategoryRules: readonly CategoryRule[]
  visibleCategoryRuleIds: Set<string> | null
  duplicateRuleIds: Set<string>
  affectedItemsMap: Map<string, readonly AffectedItem[]> | null
  destinationOptions: DestinationOptions
  activeCategoryRuleIds: readonly string[]
  inactiveCategoryRuleIds: readonly string[]
  duplicateCategoryRuleIds: readonly string[]
  lockedCategoryRuleIds: readonly string[]
  unlockedCategoryRuleIds: readonly string[]
  activeDescriptions: readonly string[]
  inactiveDescriptions: readonly string[]
  duplicateDescriptions: readonly string[]
  unlockedDescriptions: readonly string[]
  onRuleStatusChange: (status: readonly ActiveStatusFilter[]) => void
  onRuleLockChange: (lock: readonly LockStatusFilter[]) => void
  handlers: InventoryRulesHandlers
  isSortActive?: boolean
}

export function CategoryRulesPanel({
  rules,
  globalPriorityMap,
  totalRules,
  controlledRulesCount,
  filteredCategoryRules,
  visibleCategoryRuleIds,
  duplicateRuleIds,
  affectedItemsMap,
  destinationOptions,
  activeCategoryRuleIds,
  inactiveCategoryRuleIds,
  duplicateCategoryRuleIds,
  lockedCategoryRuleIds,
  unlockedCategoryRuleIds,
  activeDescriptions,
  inactiveDescriptions,
  duplicateDescriptions,
  unlockedDescriptions,
  onRuleStatusChange,
  onRuleLockChange,
  handlers,
  isSortActive = false,
}: CategoryRulesPanelProps) {
  const {
    handleAddRule,
    handleUpdateRule,
    handleRemoveRule,
    handleReorderRule,
    handleDuplicateRule,
    handleLockRule,
    handleResetCategoryRules,
    handleBulkSetCategoryActive,
    handleBulkSetCategoryInactive,
    handleBulkDeleteCategoryRules,
    handleBulkLockCategoryRules,
    handleBulkUnlockCategoryRules,
    handleBulkForceSetCategoryActive,
    handleBulkForceSetCategoryInactive,
  } = handlers

  const ruleCount = rules.length
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set())
  const allExpanded = ruleCount > 0 && expandedIds.size >= ruleCount

  const toggleExpand = useCallback((ruleId: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev)
      if (next.has(ruleId)) next.delete(ruleId)
      else next.add(ruleId)
      return next
    })
  }, [])

  return (
    <PanelCard
      collapsible
      forceMount
      id="category-rules"
      title="Category Rules"
      headerSubtitle={
        <CardTitleBadges className="w-full flex-wrap">
          {activeCategoryRuleIds.length > 0 && (
            <RuleBulkActionBadge
              label="Active"
              count={activeCategoryRuleIds.length}
              variant="accent"
              ruleDescriptions={activeDescriptions}
              onShow={() => onRuleStatusChange(["active"])}
              onSetInactive={() => handleBulkSetCategoryInactive(activeCategoryRuleIds)}
              onLock={() => handleBulkLockCategoryRules(activeCategoryRuleIds)}
              onUnlock={() => handleBulkUnlockCategoryRules(activeCategoryRuleIds)}
              onDelete={() => handleBulkDeleteCategoryRules(activeCategoryRuleIds)}
            />
          )}
          {inactiveCategoryRuleIds.length > 0 && (
            <RuleBulkActionBadge
              label="Inactive"
              count={inactiveCategoryRuleIds.length}
              variant="elevation-muted"
              ruleDescriptions={inactiveDescriptions}
              onShow={() => onRuleStatusChange(["inactive"])}
              onSetActive={() => handleBulkSetCategoryActive(inactiveCategoryRuleIds)}
              onLock={() => handleBulkLockCategoryRules(inactiveCategoryRuleIds)}
              onUnlock={() => handleBulkUnlockCategoryRules(inactiveCategoryRuleIds)}
              onDelete={() => handleBulkDeleteCategoryRules(inactiveCategoryRuleIds)}
            />
          )}
          {duplicateCategoryRuleIds.length > 0 && (
            <RuleBulkActionBadge
              label="Duplicate"
              count={duplicateCategoryRuleIds.length}
              variant="elevation-muted"
              ruleDescriptions={duplicateDescriptions}
              onShow={() => onRuleStatusChange(["duplicate"])}
              onSetActive={() => handleBulkSetCategoryActive(duplicateCategoryRuleIds)}
              onSetInactive={() => handleBulkSetCategoryInactive(duplicateCategoryRuleIds)}
              onDelete={() => handleBulkDeleteCategoryRules(duplicateCategoryRuleIds)}
            />
          )}
          {lockedCategoryRuleIds.length > 0 && (
            <RuleBulkActionBadge
              label="Locked"
              count={lockedCategoryRuleIds.length}
              variant="elevation-muted"
              onShow={() => onRuleLockChange(["locked"])}
              onSetActive={() => handleBulkForceSetCategoryActive(lockedCategoryRuleIds)}
              onSetInactive={() => handleBulkForceSetCategoryInactive(lockedCategoryRuleIds)}
              onUnlock={() => handleBulkUnlockCategoryRules(lockedCategoryRuleIds)}
            />
          )}
          {unlockedCategoryRuleIds.length > 0 && (
            <RuleBulkActionBadge
              label="Unlocked"
              count={unlockedCategoryRuleIds.length}
              variant="elevation-muted"
              ruleDescriptions={unlockedDescriptions}
              onShow={() => onRuleLockChange(["unlocked"])}
              onSetActive={() => handleBulkSetCategoryActive(unlockedCategoryRuleIds)}
              onSetInactive={() => handleBulkSetCategoryInactive(unlockedCategoryRuleIds)}
              onLock={() => handleBulkLockCategoryRules(unlockedCategoryRuleIds)}
              onDelete={() => handleBulkDeleteCategoryRules(unlockedCategoryRuleIds)}
            />
          )}
          {ruleCount > 0 && (
            <div className="ml-auto flex shrink-0 items-center gap-1.5">
              <ButtonBadge
                variant="elevation-muted"
                className="active:opacity-70"
                onClick={(e) => {
                  e.stopPropagation()
                  if (allExpanded) {
                    setExpandedIds(new Set())
                  } else {
                    setExpandedIds(new Set(rules.map((r) => r.id)))
                  }
                }}
              >
                {allExpanded ? "Collapse All" : "Expand All"}
              </ButtonBadge>
              <ResetBadge
                title="Reset Category Rules?"
                description={
                  rules.some((r) => r.locked)
                    ? "This will reset all unlocked category rules to their defaults. Locked rules will be preserved."
                    : "This will reset all category rules to their defaults. Custom rules will be lost."
                }
                onReset={handleResetCategoryRules}
              />
            </div>
          )}
        </CardTitleBadges>
      }
    >
      {ruleCount === 0 ? (
        <Empty>
          <EmptyHeader>
            <EmptyTitle>No rules yet</EmptyTitle>
            <EmptyDescription>
              Add rules to automatically sort inventory items into bank, list for sale, or sell.
            </EmptyDescription>
          </EmptyHeader>
          <Button
            variant="secondary"
            size="sm"
            onClick={() =>
              handleAddRule((id: string) => setExpandedIds((prev) => new Set([...prev, id])))
            }
          >
            <Plus className="size-3.5" />
            Add Rule
          </Button>
        </Empty>
      ) : (
        <div className="flex flex-col gap-3">
          {filteredCategoryRules.length === 0 && (
            <Empty>
              <EmptyHeader>
                <EmptyTitle>No matching rules</EmptyTitle>
                <EmptyDescription>No category rules match the current filter.</EmptyDescription>
              </EmptyHeader>
            </Empty>
          )}
          {rules.map((rule) => {
            const isHidden = visibleCategoryRuleIds !== null && !visibleCategoryRuleIds.has(rule.id)
            const priorityIndex = globalPriorityMap.get(rule.id) ?? 0
            return (
              <div key={rule.id} hidden={isHidden}>
                <RuleCard
                  rule={rule}
                  priorityIndex={priorityIndex}
                  totalRules={totalRules}
                  controlledRulesCount={controlledRulesCount}
                  isDuplicate={duplicateRuleIds.has(rule.id)}
                  affectedItems={affectedItemsMap?.get(rule.id) ?? EMPTY_AFFECTED_ITEMS}
                  destinationOptions={destinationOptions}
                  isExpanded={expandedIds.has(rule.id)}
                  onToggleExpand={toggleExpand}
                  onUpdate={handleUpdateRule}
                  onRemove={handleRemoveRule}
                  onReorder={handleReorderRule}
                  onDuplicate={handleDuplicateRule}
                  onLock={handleLockRule}
                  isSortActive={isSortActive}
                />
              </div>
            )
          })}
          <button
            type="button"
            className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-md border border-white/10 border-dashed p-3 text-sm text-tertiary transition-colors hover:bg-primary/8 hover:text-secondary"
            onClick={() =>
              handleAddRule((id: string) => setExpandedIds((prev) => new Set([...prev, id])))
            }
          >
            <Plus className="size-3.5" />
            Add Rule
          </button>
        </div>
      )}
    </PanelCard>
  )
}
