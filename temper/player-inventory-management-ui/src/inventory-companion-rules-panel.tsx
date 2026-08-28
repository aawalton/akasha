"use client"

import { ButtonBadge } from "@shared/design-badges/components/button-badge"
import { PanelCard } from "@shared/design-layout/components/panel-card"
import { CardTitleBadges } from "@shared/design-primitives/components/card"
import { Empty, EmptyDescription, EmptyHeader, EmptyTitle } from "@shared/design-patterns/components/empty"
import type { ControlledRule } from "@temper/game-items-rules-core/inventory-rule-controlled"
import type { AffectedItem } from "@temper/game-items-rules-core/inventory-rule-matcher-types"
import type { CategoryRule } from "@temper/game-items-rules-core/inventory-rule-types"
import { useCallback, useState } from "react"
import type { ActiveStatusFilter, LockStatusFilter } from "./inventory-filter-types"
import type { InventoryRulesHandlers } from "./inventory-rules-handlers"
import { RuleBulkActionBadge } from "./rule-bulk-action-badge"
import { RuleCard } from "./rule-card"
import type { DestinationOptions } from "./use-destination-options"

const EMPTY_AFFECTED_ITEMS: AffectedItem[] = []

interface CompanionRulesPanelProps {
  companionRules: readonly CategoryRule[]
  controlledRules: readonly ControlledRule[]
  controlledAffectedItems: Map<string, readonly AffectedItem[]>
  globalPriorityMap: Map<string, number>
  totalRules: number
  controlledRulesCount: number
  filteredCompanionRules: readonly CategoryRule[]
  visibleCompanionRuleIds: Set<string> | null
  visibleControlledCompanionRuleIds: Set<string> | null
  duplicateRuleIds: Set<string>
  affectedItemsMap: Map<string, readonly AffectedItem[]> | null
  destinationOptions: DestinationOptions
  activeCompanionRuleIds: readonly string[]
  inactiveCompanionRuleIds: readonly string[]
  duplicateCompanionRuleIds: readonly string[]
  lockedCompanionRuleIds: readonly string[]
  unlockedCompanionRuleIds: readonly string[]
  activeDescriptions: readonly string[]
  inactiveDescriptions: readonly string[]
  duplicateDescriptions: readonly string[]
  unlockedDescriptions: readonly string[]
  onRuleStatusChange: (status: readonly ActiveStatusFilter[]) => void
  onRuleLockChange: (lock: readonly LockStatusFilter[]) => void
  handlers: InventoryRulesHandlers
  isSortActive?: boolean
}

export function CompanionRulesPanel({
  companionRules,
  controlledRules,
  controlledAffectedItems,
  globalPriorityMap,
  totalRules,
  controlledRulesCount,
  filteredCompanionRules,
  visibleCompanionRuleIds,
  visibleControlledCompanionRuleIds,
  duplicateRuleIds,
  affectedItemsMap,
  destinationOptions,
  activeCompanionRuleIds,
  inactiveCompanionRuleIds,
  duplicateCompanionRuleIds,
  lockedCompanionRuleIds,
  unlockedCompanionRuleIds,
  activeDescriptions,
  inactiveDescriptions,
  duplicateDescriptions,
  unlockedDescriptions,
  onRuleStatusChange,
  onRuleLockChange,
  handlers,
  isSortActive = false,
}: CompanionRulesPanelProps) {
  const {
    handleUpdateRule,
    handleRemoveRule,
    handleReorderRule,
    handleDuplicateRule,
    handleLockRule,
    handleBulkSetCategoryActive,
    handleBulkSetCategoryInactive,
    handleBulkDeleteCategoryRules,
    handleBulkLockCategoryRules,
    handleBulkUnlockCategoryRules,
    handleBulkForceSetCategoryActive,
    handleBulkForceSetCategoryInactive,
  } = handlers

  const ruleCount = companionRules.length
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set())
  const allIds = ruleCount + controlledRules.length
  const allExpanded = allIds > 0 && expandedIds.size >= allIds

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
      id="companion-rules"
      title="Companion Automations"
      headerSubtitle={
        <CardTitleBadges className="w-full">
          {activeCompanionRuleIds.length > 0 && (
            <RuleBulkActionBadge
              label="Active"
              count={activeCompanionRuleIds.length}
              variant="accent"
              ruleDescriptions={activeDescriptions}
              onShow={() => onRuleStatusChange(["active"])}
              onSetInactive={() => handleBulkSetCategoryInactive(activeCompanionRuleIds)}
              onLock={() => handleBulkLockCategoryRules(activeCompanionRuleIds)}
              onUnlock={() => handleBulkUnlockCategoryRules(activeCompanionRuleIds)}
              onDelete={() => handleBulkDeleteCategoryRules(activeCompanionRuleIds)}
            />
          )}
          {inactiveCompanionRuleIds.length > 0 && (
            <RuleBulkActionBadge
              label="Inactive"
              count={inactiveCompanionRuleIds.length}
              variant="elevation-muted"
              ruleDescriptions={inactiveDescriptions}
              onShow={() => onRuleStatusChange(["inactive"])}
              onSetActive={() => handleBulkSetCategoryActive(inactiveCompanionRuleIds)}
              onLock={() => handleBulkLockCategoryRules(inactiveCompanionRuleIds)}
              onUnlock={() => handleBulkUnlockCategoryRules(inactiveCompanionRuleIds)}
              onDelete={() => handleBulkDeleteCategoryRules(inactiveCompanionRuleIds)}
            />
          )}
          {duplicateCompanionRuleIds.length > 0 && (
            <RuleBulkActionBadge
              label="Duplicate"
              count={duplicateCompanionRuleIds.length}
              variant="elevation-muted"
              ruleDescriptions={duplicateDescriptions}
              onShow={() => onRuleStatusChange(["duplicate"])}
              onSetActive={() => handleBulkSetCategoryActive(duplicateCompanionRuleIds)}
              onSetInactive={() => handleBulkSetCategoryInactive(duplicateCompanionRuleIds)}
              onDelete={() => handleBulkDeleteCategoryRules(duplicateCompanionRuleIds)}
            />
          )}
          {lockedCompanionRuleIds.length > 0 && (
            <RuleBulkActionBadge
              label="Locked"
              count={lockedCompanionRuleIds.length}
              variant="elevation-muted"
              onShow={() => onRuleLockChange(["locked"])}
              onSetActive={() => handleBulkForceSetCategoryActive(lockedCompanionRuleIds)}
              onSetInactive={() => handleBulkForceSetCategoryInactive(lockedCompanionRuleIds)}
              onUnlock={() => handleBulkUnlockCategoryRules(lockedCompanionRuleIds)}
            />
          )}
          {unlockedCompanionRuleIds.length > 0 && (
            <RuleBulkActionBadge
              label="Unlocked"
              count={unlockedCompanionRuleIds.length}
              variant="elevation-muted"
              ruleDescriptions={unlockedDescriptions}
              onShow={() => onRuleLockChange(["unlocked"])}
              onSetActive={() => handleBulkSetCategoryActive(unlockedCompanionRuleIds)}
              onSetInactive={() => handleBulkSetCategoryInactive(unlockedCompanionRuleIds)}
              onLock={() => handleBulkLockCategoryRules(unlockedCompanionRuleIds)}
              onDelete={() => handleBulkDeleteCategoryRules(unlockedCompanionRuleIds)}
            />
          )}
          {allIds > 0 && (
            <div className="ml-auto flex shrink-0 items-center gap-1.5">
              <ButtonBadge
                variant="elevation-muted"
                className="active:opacity-70"
                onClick={(e) => {
                  e.stopPropagation()
                  if (allExpanded) {
                    setExpandedIds(new Set())
                  } else {
                    setExpandedIds(
                      new Set([
                        ...controlledRules.map((r) => r.id),
                        ...companionRules.map((r) => r.id),
                      ])
                    )
                  }
                }}
              >
                {allExpanded ? "Collapse All" : "Expand All"}
              </ButtonBadge>
            </div>
          )}
        </CardTitleBadges>
      }
    >
      <div className="flex flex-col gap-3">
        {controlledRules.map((rule) => (
          <div
            key={rule.id}
            hidden={
              visibleControlledCompanionRuleIds !== null &&
              !visibleControlledCompanionRuleIds.has(rule.id)
            }
          >
            <RuleCard
              rule={rule}
              controlled={rule}
              priorityIndex={globalPriorityMap.get(rule.id) ?? 0}
              affectedItems={controlledAffectedItems.get(rule.id) ?? EMPTY_AFFECTED_ITEMS}
              isExpanded={expandedIds.has(rule.id)}
              onToggleExpand={toggleExpand}
            />
          </div>
        ))}
        {filteredCompanionRules.length === 0 && ruleCount > 0 && (
          <Empty>
            <EmptyHeader>
              <EmptyTitle>No matching rules</EmptyTitle>
              <EmptyDescription>No companion rules match the current filter.</EmptyDescription>
            </EmptyHeader>
          </Empty>
        )}
        {companionRules.map((rule) => {
          const isHidden = visibleCompanionRuleIds !== null && !visibleCompanionRuleIds.has(rule.id)
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
      </div>
    </PanelCard>
  )
}
