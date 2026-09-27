"use client"

import { ButtonBadge } from "akasha/design/interface/badge/modules/button-badge/button-badge.module.code.tsx"
import { PanelCard } from "akasha/design/interface/layout/modules/panel-card/panel-card.module.code.tsx"
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "akasha/design/interface/pattern/modules/empty/empty.module.code.tsx"
import { CardTitleBadges } from "akasha/design/interface/primitive/modules/card/card.module.code.tsx"
import { titleIn } from "akasha/temper/items/core/modules/keyed-titles/keyed-titles.module.code.ts"
import type { ControlledRule } from "akasha/temper/items/rules/core/modules/inventory-rule-controlled/inventory-rule-controlled.module.code.ts"
import type { AffectedItem } from "akasha/temper/items/rules/core/modules/inventory-rule-matcher-types/inventory-rule-matcher-types.module.code.ts"
import type { CategoryRule } from "akasha/temper/items/rules/core/modules/inventory-rule-types/inventory-rule-types.module.code.ts"
import { usePhrase } from "akasha/temper/web/modules/use-web-phrases/use-web-phrases.module.code.tsx"
import { inventoryCharacterRulesPanelCollapseAll } from "akasha/temper/web/phrase/pages/inventory-character-rules-panel-collapse-all.temper-web-phrase.ts"
import { inventoryCharacterRulesPanelEmptyDescription } from "akasha/temper/web/phrase/pages/inventory-character-rules-panel-empty-description.temper-web-phrase.ts"
import { inventoryCharacterRulesPanelEmptyTitle } from "akasha/temper/web/phrase/pages/inventory-character-rules-panel-empty-title.temper-web-phrase.ts"
import { inventoryCharacterRulesPanelExpandAll } from "akasha/temper/web/phrase/pages/inventory-character-rules-panel-expand-all.temper-web-phrase.ts"
import { inventoryCharacterRulesPanelNoMatchDescription } from "akasha/temper/web/phrase/pages/inventory-character-rules-panel-no-match-description.temper-web-phrase.ts"
import { inventoryCharacterRulesPanelNoMatchTitle } from "akasha/temper/web/phrase/pages/inventory-character-rules-panel-no-match-title.temper-web-phrase.ts"
import { inventoryCharacterRulesPanelTitle } from "akasha/temper/web/phrase/pages/inventory-character-rules-panel-title.temper-web-phrase.ts"
import type {
  ActiveStatusFilter,
  LockStatusFilter,
} from "akasha/temper/web/player-inventory-management-ui/modules/inventory-filter-types/inventory-filter-types.module.code.ts"
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
import { useCallback, useState } from "react"

const EMPTY_AFFECTED_ITEMS: AffectedItem[] = []

interface CharacterRulesPanelProps {
  characterRules: readonly CategoryRule[]
  controlledRules: readonly ControlledRule[]
  controlledAffectedItems: Map<string, readonly AffectedItem[]>
  globalPriorityMap: Map<string, number>
  totalRules: number
  controlledRulesCount: number
  filteredCharacterRules: readonly CategoryRule[]
  visibleCharacterRuleIds: Set<string> | null
  visibleControlledCharacterRuleIds: Set<string> | null
  duplicateRuleIds: Set<string>
  affectedItemsMap: Map<string, readonly AffectedItem[]> | null
  destinationOptions: DestinationOptions
  activeCharacterRuleIds: readonly string[]
  inactiveCharacterRuleIds: readonly string[]
  duplicateCharacterRuleIds: readonly string[]
  lockedCharacterRuleIds: readonly string[]
  unlockedCharacterRuleIds: readonly string[]
  activeDescriptions: readonly string[]
  inactiveDescriptions: readonly string[]
  duplicateDescriptions: readonly string[]
  unlockedDescriptions: readonly string[]
  onRuleStatusChange: (status: readonly ActiveStatusFilter[]) => void
  onRuleLockChange: (lock: readonly LockStatusFilter[]) => void
  handlers: InventoryRulesHandlers
  isSortActive?: boolean
}

export function CharacterRulesPanel({
  characterRules,
  controlledRules,
  controlledAffectedItems,
  globalPriorityMap,
  totalRules,
  controlledRulesCount,
  filteredCharacterRules,
  visibleCharacterRuleIds,
  visibleControlledCharacterRuleIds,
  duplicateRuleIds,
  affectedItemsMap,
  destinationOptions,
  activeCharacterRuleIds,
  inactiveCharacterRuleIds,
  duplicateCharacterRuleIds,
  lockedCharacterRuleIds,
  unlockedCharacterRuleIds,
  activeDescriptions,
  inactiveDescriptions,
  duplicateDescriptions,
  unlockedDescriptions,
  onRuleStatusChange,
  onRuleLockChange,
  handlers,
  isSortActive = false,
}: CharacterRulesPanelProps) {
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

  const phrase = usePhrase()
  const statuses = useRuleCardPhrases()
  const ruleCount = characterRules.length
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
      id="character-rules"
      title={phrase(inventoryCharacterRulesPanelTitle.slug)}
      headerSubtitle={
        <CardTitleBadges className="w-full">
          {activeCharacterRuleIds.length > 0 && (
            <RuleBulkActionBadge
              label={titleIn(statuses, ruleActive.key)}
              count={activeCharacterRuleIds.length}
              variant="accent"
              ruleDescriptions={activeDescriptions}
              onShow={() => onRuleStatusChange(["active"])}
              onSetInactive={() => handleBulkSetCategoryInactive(activeCharacterRuleIds)}
              onLock={() => handleBulkLockCategoryRules(activeCharacterRuleIds)}
              onUnlock={() => handleBulkUnlockCategoryRules(activeCharacterRuleIds)}
              onDelete={() => handleBulkDeleteCategoryRules(activeCharacterRuleIds)}
            />
          )}
          {inactiveCharacterRuleIds.length > 0 && (
            <RuleBulkActionBadge
              label={titleIn(statuses, ruleInactive.key)}
              count={inactiveCharacterRuleIds.length}
              variant="elevation-muted"
              ruleDescriptions={inactiveDescriptions}
              onShow={() => onRuleStatusChange(["inactive"])}
              onSetActive={() => handleBulkSetCategoryActive(inactiveCharacterRuleIds)}
              onLock={() => handleBulkLockCategoryRules(inactiveCharacterRuleIds)}
              onUnlock={() => handleBulkUnlockCategoryRules(inactiveCharacterRuleIds)}
              onDelete={() => handleBulkDeleteCategoryRules(inactiveCharacterRuleIds)}
            />
          )}
          {duplicateCharacterRuleIds.length > 0 && (
            <RuleBulkActionBadge
              label={titleIn(statuses, ruleDuplicate.key)}
              count={duplicateCharacterRuleIds.length}
              variant="elevation-muted"
              ruleDescriptions={duplicateDescriptions}
              onShow={() => onRuleStatusChange(["duplicate"])}
              onSetActive={() => handleBulkSetCategoryActive(duplicateCharacterRuleIds)}
              onSetInactive={() => handleBulkSetCategoryInactive(duplicateCharacterRuleIds)}
              onDelete={() => handleBulkDeleteCategoryRules(duplicateCharacterRuleIds)}
            />
          )}
          {lockedCharacterRuleIds.length > 0 && (
            <RuleBulkActionBadge
              label={titleIn(statuses, ruleLocked.key)}
              count={lockedCharacterRuleIds.length}
              variant="elevation-muted"
              onShow={() => onRuleLockChange(["locked"])}
              onSetActive={() => handleBulkForceSetCategoryActive(lockedCharacterRuleIds)}
              onSetInactive={() => handleBulkForceSetCategoryInactive(lockedCharacterRuleIds)}
              onUnlock={() => handleBulkUnlockCategoryRules(lockedCharacterRuleIds)}
            />
          )}
          {unlockedCharacterRuleIds.length > 0 && (
            <RuleBulkActionBadge
              label={titleIn(statuses, ruleUnlocked.key)}
              count={unlockedCharacterRuleIds.length}
              variant="elevation-muted"
              ruleDescriptions={unlockedDescriptions}
              onShow={() => onRuleLockChange(["unlocked"])}
              onSetActive={() => handleBulkSetCategoryActive(unlockedCharacterRuleIds)}
              onSetInactive={() => handleBulkSetCategoryInactive(unlockedCharacterRuleIds)}
              onLock={() => handleBulkLockCategoryRules(unlockedCharacterRuleIds)}
              onDelete={() => handleBulkDeleteCategoryRules(unlockedCharacterRuleIds)}
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
                        ...characterRules.map((r) => r.id),
                      ])
                    )
                  }
                }}
              >
                {phrase(
                  allExpanded
                    ? inventoryCharacterRulesPanelCollapseAll.slug
                    : inventoryCharacterRulesPanelExpandAll.slug
                )}
              </ButtonBadge>
            </div>
          )}
        </CardTitleBadges>
      }
    >
      {ruleCount === 0 && controlledRules.length === 0 ? (
        <Empty>
          <EmptyHeader>
            <EmptyTitle>{phrase(inventoryCharacterRulesPanelEmptyTitle.slug)}</EmptyTitle>
            <EmptyDescription>
              {phrase(inventoryCharacterRulesPanelEmptyDescription.slug)}
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      ) : (
        <div className="flex flex-col gap-3">
          {controlledRules.map((rule, i) => (
            <div
              key={rule.id}
              hidden={
                visibleControlledCharacterRuleIds !== null &&
                !visibleControlledCharacterRuleIds.has(rule.id)
              }
            >
              <RuleCard
                rule={rule}
                controlled={rule}
                priorityIndex={i + 1}
                affectedItems={controlledAffectedItems.get(rule.id) ?? EMPTY_AFFECTED_ITEMS}
                isExpanded={expandedIds.has(rule.id)}
                onToggleExpand={toggleExpand}
              />
            </div>
          ))}
          {filteredCharacterRules.length === 0 && ruleCount > 0 && (
            <Empty>
              <EmptyHeader>
                <EmptyTitle>{phrase(inventoryCharacterRulesPanelNoMatchTitle.slug)}</EmptyTitle>
                <EmptyDescription>
                  {phrase(inventoryCharacterRulesPanelNoMatchDescription.slug)}
                </EmptyDescription>
              </EmptyHeader>
            </Empty>
          )}
          {characterRules.map((rule) => {
            const isHidden =
              visibleCharacterRuleIds !== null && !visibleCharacterRuleIds.has(rule.id)
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
      )}
    </PanelCard>
  )
}
