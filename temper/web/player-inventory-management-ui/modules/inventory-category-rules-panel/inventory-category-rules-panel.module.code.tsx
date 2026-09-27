"use client"

import { ButtonBadge } from "akasha/design/interface/badge/modules/button-badge/button-badge.module.code.tsx"
import { PanelCard } from "akasha/design/interface/layout/modules/panel-card/panel-card.module.code.tsx"
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "akasha/design/interface/pattern/modules/empty/empty.module.code.tsx"
import { Button } from "akasha/design/interface/primitive/modules/button/button.module.code.tsx"
import { CardTitleBadges } from "akasha/design/interface/primitive/modules/card/card.module.code.tsx"
import { titleIn } from "akasha/temper/items/core/modules/keyed-titles/keyed-titles.module.code.ts"
import type { AffectedItem } from "akasha/temper/items/rules/core/modules/inventory-rule-matcher-types/inventory-rule-matcher-types.module.code.ts"
import type { CategoryRule } from "akasha/temper/items/rules/core/modules/inventory-rule-types/inventory-rule-types.module.code.ts"
import { usePhrase } from "akasha/temper/web/modules/use-web-phrases/use-web-phrases.module.code.tsx"
import { inventoryCategoryRulesPanelAddRule } from "akasha/temper/web/phrase/pages/inventory-category-rules-panel-add-rule.temper-web-phrase.ts"
import { inventoryCategoryRulesPanelCollapseAll } from "akasha/temper/web/phrase/pages/inventory-category-rules-panel-collapse-all.temper-web-phrase.ts"
import { inventoryCategoryRulesPanelEmptyDescription } from "akasha/temper/web/phrase/pages/inventory-category-rules-panel-empty-description.temper-web-phrase.ts"
import { inventoryCategoryRulesPanelEmptyTitle } from "akasha/temper/web/phrase/pages/inventory-category-rules-panel-empty-title.temper-web-phrase.ts"
import { inventoryCategoryRulesPanelExpandAll } from "akasha/temper/web/phrase/pages/inventory-category-rules-panel-expand-all.temper-web-phrase.ts"
import { inventoryCategoryRulesPanelNoMatchDescription } from "akasha/temper/web/phrase/pages/inventory-category-rules-panel-no-match-description.temper-web-phrase.ts"
import { inventoryCategoryRulesPanelNoMatchTitle } from "akasha/temper/web/phrase/pages/inventory-category-rules-panel-no-match-title.temper-web-phrase.ts"
import { inventoryCategoryRulesPanelResetAll } from "akasha/temper/web/phrase/pages/inventory-category-rules-panel-reset-all.temper-web-phrase.ts"
import { inventoryCategoryRulesPanelResetKeepsLocked } from "akasha/temper/web/phrase/pages/inventory-category-rules-panel-reset-keeps-locked.temper-web-phrase.ts"
import { inventoryCategoryRulesPanelResetTitle } from "akasha/temper/web/phrase/pages/inventory-category-rules-panel-reset-title.temper-web-phrase.ts"
import { inventoryCategoryRulesPanelTitle } from "akasha/temper/web/phrase/pages/inventory-category-rules-panel-title.temper-web-phrase.ts"
import type {
  ActiveStatusFilter,
  LockStatusFilter,
} from "akasha/temper/web/player-inventory-management-ui/modules/inventory-filter-types/inventory-filter-types.module.code.ts"
import { ResetBadge } from "akasha/temper/web/player-inventory-management-ui/modules/inventory-reset-badge/inventory-reset-badge.module.code.tsx"
import type { InventoryRulesHandlers } from "akasha/temper/web/player-inventory-management-ui/modules/inventory-rules-handlers/inventory-rules-handlers.module.code.ts"
import { RuleBulkActionBadge } from "akasha/temper/web/player-inventory-management-ui/modules/rule-bulk-action-badge/rule-bulk-action-badge.module.code.tsx"
import { RuleCard } from "akasha/temper/web/player-inventory-management-ui/modules/rule-card/rule-card.module.code.tsx"
import { useRuleCardPhrases } from "akasha/temper/web/player-inventory-management-ui/modules/rule-card-phrase/rule-card-phrase.module.code.tsx"
import type { DestinationOptions } from "akasha/temper/web/player-inventory-management-ui/modules/use-destination-options/use-destination-options.module.code.ts"
import { ruleActive } from "akasha/temper/web/player-inventory-management-ui/temper-rule-card-phrase/pages/rule-active.temper-rule-card-phrase.ts"
import { ruleDuplicate } from "akasha/temper/web/player-inventory-management-ui/temper-rule-card-phrase/pages/rule-duplicate.temper-rule-card-phrase.ts"
import { ruleInactive } from "akasha/temper/web/player-inventory-management-ui/temper-rule-card-phrase/pages/rule-inactive.temper-rule-card-phrase.ts"
import { ruleLocked } from "akasha/temper/web/player-inventory-management-ui/temper-rule-card-phrase/pages/rule-locked.temper-rule-card-phrase.ts"
import { ruleUnlocked } from "akasha/temper/web/player-inventory-management-ui/temper-rule-card-phrase/pages/rule-unlocked.temper-rule-card-phrase.ts"
import { Plus } from "lucide-react"
import { useCallback, useState } from "react"

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

  const phrase = usePhrase()
  const statuses = useRuleCardPhrases()
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
      title={phrase(inventoryCategoryRulesPanelTitle.slug)}
      headerSubtitle={
        <CardTitleBadges className="w-full flex-wrap">
          {activeCategoryRuleIds.length > 0 && (
            <RuleBulkActionBadge
              label={titleIn(statuses, ruleActive.key)}
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
              label={titleIn(statuses, ruleInactive.key)}
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
              label={titleIn(statuses, ruleDuplicate.key)}
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
              label={titleIn(statuses, ruleLocked.key)}
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
              label={titleIn(statuses, ruleUnlocked.key)}
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
                {phrase(
                  allExpanded
                    ? inventoryCategoryRulesPanelCollapseAll.slug
                    : inventoryCategoryRulesPanelExpandAll.slug
                )}
              </ButtonBadge>
              <ResetBadge
                title={phrase(inventoryCategoryRulesPanelResetTitle.slug)}
                description={phrase(
                  rules.some((r) => r.locked)
                    ? inventoryCategoryRulesPanelResetKeepsLocked.slug
                    : inventoryCategoryRulesPanelResetAll.slug
                )}
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
            <EmptyTitle>{phrase(inventoryCategoryRulesPanelEmptyTitle.slug)}</EmptyTitle>
            <EmptyDescription>
              {phrase(inventoryCategoryRulesPanelEmptyDescription.slug)}
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
            {phrase(inventoryCategoryRulesPanelAddRule.slug)}
          </Button>
        </Empty>
      ) : (
        <div className="flex flex-col gap-3">
          {filteredCategoryRules.length === 0 && (
            <Empty>
              <EmptyHeader>
                <EmptyTitle>{phrase(inventoryCategoryRulesPanelNoMatchTitle.slug)}</EmptyTitle>
                <EmptyDescription>
                  {phrase(inventoryCategoryRulesPanelNoMatchDescription.slug)}
                </EmptyDescription>
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
            {phrase(inventoryCategoryRulesPanelAddRule.slug)}
          </button>
        </div>
      )}
    </PanelCard>
  )
}
