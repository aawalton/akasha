"use client"

import { PanelCard } from "akasha/design/interface/layout/modules/panel-card/panel-card.module.code.tsx"
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "akasha/design/interface/pattern/modules/empty/empty.module.code.tsx"
import { Button } from "akasha/design/interface/primitive/modules/button/button.module.code.tsx"
import { CardTitleBadges } from "akasha/design/interface/primitive/modules/card/card.module.code.tsx"
import type { MinedItemSearchResult } from "akasha/temper/items/core/modules/item-tooltip-types/item-tooltip-types.module.code.ts"
import { titleIn } from "akasha/temper/items/core/modules/keyed-titles/keyed-titles.module.code.ts"
import type { ItemRule } from "akasha/temper/items/rules/core/modules/inventory-rule-types/inventory-rule-types.module.code.ts"
import { usePhrase } from "akasha/temper/web/modules/use-web-phrases/use-web-phrases.module.code.tsx"
import { inventoryItemRulesPanelAddItemRule } from "akasha/temper/web/phrase/pages/inventory-item-rules-panel-add-item-rule.temper-web-phrase.ts"
import { inventoryItemRulesPanelEmptyDescription } from "akasha/temper/web/phrase/pages/inventory-item-rules-panel-empty-description.temper-web-phrase.ts"
import { inventoryItemRulesPanelEmptyTitle } from "akasha/temper/web/phrase/pages/inventory-item-rules-panel-empty-title.temper-web-phrase.ts"
import { inventoryItemRulesPanelNoMatchDescription } from "akasha/temper/web/phrase/pages/inventory-item-rules-panel-no-match-description.temper-web-phrase.ts"
import { inventoryItemRulesPanelNoMatchTitle } from "akasha/temper/web/phrase/pages/inventory-item-rules-panel-no-match-title.temper-web-phrase.ts"
import { inventoryItemRulesPanelResetAll } from "akasha/temper/web/phrase/pages/inventory-item-rules-panel-reset-all.temper-web-phrase.ts"
import { inventoryItemRulesPanelResetKeepsLocked } from "akasha/temper/web/phrase/pages/inventory-item-rules-panel-reset-keeps-locked.temper-web-phrase.ts"
import { inventoryItemRulesPanelResetTitle } from "akasha/temper/web/phrase/pages/inventory-item-rules-panel-reset-title.temper-web-phrase.ts"
import { inventoryItemRulesPanelTitle } from "akasha/temper/web/phrase/pages/inventory-item-rules-panel-title.temper-web-phrase.ts"
import type {
  ActiveStatusFilter,
  LockStatusFilter,
} from "akasha/temper/web/player-inventory-management-ui/modules/inventory-filter-types/inventory-filter-types.module.code.ts"
import { ResetBadge } from "akasha/temper/web/player-inventory-management-ui/modules/inventory-reset-badge/inventory-reset-badge.module.code.tsx"
import type { InventoryRulesHandlers } from "akasha/temper/web/player-inventory-management-ui/modules/inventory-rules-handlers/inventory-rules-handlers.module.code.ts"
import { ItemRuleCard } from "akasha/temper/web/player-inventory-management-ui/modules/item-rule-card/item-rule-card.module.code.tsx"
import { ItemSearchDialog } from "akasha/temper/web/player-inventory-management-ui/modules/item-search-dialog/item-search-dialog.module.code.tsx"
import { RuleBulkActionBadge } from "akasha/temper/web/player-inventory-management-ui/modules/rule-bulk-action-badge/rule-bulk-action-badge.module.code.tsx"
import { useRuleCardPhrases } from "akasha/temper/web/player-inventory-management-ui/modules/rule-card-phrase/rule-card-phrase.module.code.tsx"
import type { DestinationOptions } from "akasha/temper/web/player-inventory-management-ui/modules/use-destination-options/use-destination-options.module.code.ts"
import { ruleActive } from "akasha/temper/web/player-inventory-management-ui/temper-rule-card-phrase/pages/rule-active.temper-rule-card-phrase.ts"
import { ruleInactive } from "akasha/temper/web/player-inventory-management-ui/temper-rule-card-phrase/pages/rule-inactive.temper-rule-card-phrase.ts"
import { ruleLocked } from "akasha/temper/web/player-inventory-management-ui/temper-rule-card-phrase/pages/rule-locked.temper-rule-card-phrase.ts"
import { ruleUnlocked } from "akasha/temper/web/player-inventory-management-ui/temper-rule-card-phrase/pages/rule-unlocked.temper-rule-card-phrase.ts"
import { Plus } from "lucide-react"
import { useState } from "react"

interface ItemRulesPanelProps {
  itemRules: readonly ItemRule[]
  filteredItemRules: readonly ItemRule[]
  visibleItemRuleIds: Set<string> | null
  destinationOptions: DestinationOptions
  activeItemRuleIds: readonly string[]
  inactiveItemRuleIds: readonly string[]
  lockedItemRuleIds: readonly string[]
  unlockedItemRuleIds: readonly string[]
  activeDescriptions: readonly string[]
  inactiveDescriptions: readonly string[]
  unlockedDescriptions: readonly string[]
  onRuleStatusChange: (status: readonly ActiveStatusFilter[]) => void
  onRuleLockChange: (lock: readonly LockStatusFilter[]) => void
  handlers: InventoryRulesHandlers
}

export function ItemRulesPanel({
  itemRules,
  filteredItemRules,
  visibleItemRuleIds,
  destinationOptions,
  activeItemRuleIds,
  inactiveItemRuleIds,
  lockedItemRuleIds,
  unlockedItemRuleIds,
  activeDescriptions,
  inactiveDescriptions,
  unlockedDescriptions,
  onRuleStatusChange,
  onRuleLockChange,
  handlers,
}: ItemRulesPanelProps) {
  const {
    handleAddItemRule,
    handleUpdateItemRule,
    handleRemoveItemRule,
    handleDuplicateItemRule,
    handleLockItemRule,
    handleResetItemRules,
    handleBulkSetItemActive,
    handleBulkSetItemInactive,
    handleBulkDeleteItemRules,
    handleBulkLockItemRules,
    handleBulkUnlockItemRules,
    handleBulkForceSetItemActive,
    handleBulkForceSetItemInactive,
  } = handlers

  const phrase = usePhrase()
  const statuses = useRuleCardPhrases()
  const [searchOpen, setSearchOpen] = useState(false)
  const itemRuleCount = itemRules.length

  const handleItemSelect = (item: MinedItemSearchResult) => {
    handleAddItemRule({ itemId: item.itemId, itemName: item.name })
  }

  return (
    <PanelCard
      collapsible
      forceMount
      id="item-rules"
      title={phrase(inventoryItemRulesPanelTitle.slug)}
      headerSubtitle={
        <CardTitleBadges className="w-full">
          {activeItemRuleIds.length > 0 && (
            <RuleBulkActionBadge
              label={titleIn(statuses, ruleActive.key)}
              count={activeItemRuleIds.length}
              variant="accent"
              ruleDescriptions={activeDescriptions}
              onShow={() => onRuleStatusChange(["active"])}
              onSetInactive={() => handleBulkSetItemInactive(activeItemRuleIds)}
              onLock={() => handleBulkLockItemRules(activeItemRuleIds)}
              onUnlock={() => handleBulkUnlockItemRules(activeItemRuleIds)}
              onDelete={() => handleBulkDeleteItemRules(activeItemRuleIds)}
            />
          )}
          {inactiveItemRuleIds.length > 0 && (
            <RuleBulkActionBadge
              label={titleIn(statuses, ruleInactive.key)}
              count={inactiveItemRuleIds.length}
              variant="elevation-muted"
              ruleDescriptions={inactiveDescriptions}
              onShow={() => onRuleStatusChange(["inactive"])}
              onSetActive={() => handleBulkSetItemActive(inactiveItemRuleIds)}
              onLock={() => handleBulkLockItemRules(inactiveItemRuleIds)}
              onUnlock={() => handleBulkUnlockItemRules(inactiveItemRuleIds)}
              onDelete={() => handleBulkDeleteItemRules(inactiveItemRuleIds)}
            />
          )}
          {lockedItemRuleIds.length > 0 && (
            <RuleBulkActionBadge
              label={titleIn(statuses, ruleLocked.key)}
              count={lockedItemRuleIds.length}
              variant="elevation-muted"
              onShow={() => onRuleLockChange(["locked"])}
              onSetActive={() => handleBulkForceSetItemActive(lockedItemRuleIds)}
              onSetInactive={() => handleBulkForceSetItemInactive(lockedItemRuleIds)}
              onUnlock={() => handleBulkUnlockItemRules(lockedItemRuleIds)}
            />
          )}
          {unlockedItemRuleIds.length > 0 && (
            <RuleBulkActionBadge
              label={titleIn(statuses, ruleUnlocked.key)}
              count={unlockedItemRuleIds.length}
              variant="elevation-muted"
              ruleDescriptions={unlockedDescriptions}
              onShow={() => onRuleLockChange(["unlocked"])}
              onSetActive={() => handleBulkSetItemActive(unlockedItemRuleIds)}
              onSetInactive={() => handleBulkSetItemInactive(unlockedItemRuleIds)}
              onLock={() => handleBulkLockItemRules(unlockedItemRuleIds)}
              onDelete={() => handleBulkDeleteItemRules(unlockedItemRuleIds)}
            />
          )}
          {itemRuleCount > 0 && (
            <div className="ml-auto shrink-0">
              <ResetBadge
                title={phrase(inventoryItemRulesPanelResetTitle.slug)}
                description={phrase(
                  itemRules.some((r) => r.locked)
                    ? inventoryItemRulesPanelResetKeepsLocked.slug
                    : inventoryItemRulesPanelResetAll.slug
                )}
                onReset={handleResetItemRules}
              />
            </div>
          )}
        </CardTitleBadges>
      }
    >
      <ItemSearchDialog
        open={searchOpen}
        onOpenChange={setSearchOpen}
        onSelect={handleItemSelect}
        title={phrase(inventoryItemRulesPanelAddItemRule.slug)}
      />
      {itemRuleCount === 0 ? (
        <Empty>
          <EmptyHeader>
            <EmptyTitle>{phrase(inventoryItemRulesPanelEmptyTitle.slug)}</EmptyTitle>
            <EmptyDescription>
              {phrase(inventoryItemRulesPanelEmptyDescription.slug)}
            </EmptyDescription>
          </EmptyHeader>
          <Button variant="secondary" size="sm" onClick={() => setSearchOpen(true)}>
            <Plus className="size-3.5" />
            {phrase(inventoryItemRulesPanelAddItemRule.slug)}
          </Button>
        </Empty>
      ) : (
        <div className="flex flex-col gap-3">
          {filteredItemRules.length === 0 && (
            <Empty>
              <EmptyHeader>
                <EmptyTitle>{phrase(inventoryItemRulesPanelNoMatchTitle.slug)}</EmptyTitle>
                <EmptyDescription>
                  {phrase(inventoryItemRulesPanelNoMatchDescription.slug)}
                </EmptyDescription>
              </EmptyHeader>
            </Empty>
          )}
          {itemRules.map((rule) => {
            const isHidden = visibleItemRuleIds !== null && !visibleItemRuleIds.has(rule.id)
            return (
              <div key={rule.id} hidden={isHidden}>
                <ItemRuleCard
                  rule={rule}
                  destinationOptions={destinationOptions}
                  onUpdate={handleUpdateItemRule}
                  onRemove={handleRemoveItemRule}
                  onDuplicate={handleDuplicateItemRule}
                  onLock={handleLockItemRule}
                />
              </div>
            )
          })}
          <button
            type="button"
            className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-md border border-white/10 border-dashed p-3 text-sm text-tertiary transition-colors hover:bg-primary/8 hover:text-secondary"
            onClick={() => setSearchOpen(true)}
          >
            <Plus className="size-3.5" />
            {phrase(inventoryItemRulesPanelAddItemRule.slug)}
          </button>
        </div>
      )}
    </PanelCard>
  )
}
