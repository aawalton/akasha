"use client"

import { PanelCard } from "akasha/design/interface/layout/modules/panel-card/panel-card.module.code.tsx"
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "akasha/design/interface/pattern/modules/empty/empty.module.code.tsx"
import { Button } from "akasha/design/interface/primitive/modules/button/button.module.code.tsx"
import type { MinedItemSearchResult } from "akasha/temper/items/core/modules/item-tooltip-types/item-tooltip-types.module.code.ts"
import type { BuyRule } from "akasha/temper/items/rules/core/modules/buy-rule-types/buy-rule-types.module.code.ts"
import { usePhrase } from "akasha/temper/web/modules/use-web-phrases/use-web-phrases.module.code.tsx"
import { inventoryBuyRulesPanelAddBuyRule } from "akasha/temper/web/phrase/pages/inventory-buy-rules-panel-add-buy-rule.temper-web-phrase.ts"
import { inventoryBuyRulesPanelEmptyDescription } from "akasha/temper/web/phrase/pages/inventory-buy-rules-panel-empty-description.temper-web-phrase.ts"
import { inventoryBuyRulesPanelEmptyTitle } from "akasha/temper/web/phrase/pages/inventory-buy-rules-panel-empty-title.temper-web-phrase.ts"
import { inventoryBuyRulesPanelTitle } from "akasha/temper/web/phrase/pages/inventory-buy-rules-panel-title.temper-web-phrase.ts"
import { BuyRuleCard } from "akasha/temper/web/player-inventory-management-ui/modules/buy-rule-card/buy-rule-card.module.code.tsx"
import type { InventoryRulesHandlers } from "akasha/temper/web/player-inventory-management-ui/modules/inventory-rules-handlers/inventory-rules-handlers.module.code.ts"
import { ItemSearchDialog } from "akasha/temper/web/player-inventory-management-ui/modules/item-search-dialog/item-search-dialog.module.code.tsx"
import { Plus } from "lucide-react"
import { useState } from "react"

interface BuyRulesPanelProps {
  buyRules: readonly BuyRule[]
  handlers: InventoryRulesHandlers
}

export function BuyRulesPanel({ buyRules, handlers }: BuyRulesPanelProps) {
  const {
    handleAddBuyRule,
    handleUpdateBuyRule,
    handleRemoveBuyRule,
    handleDuplicateBuyRule,
    handleLockBuyRule,
  } = handlers

  const phrase = usePhrase()
  const [searchOpen, setSearchOpen] = useState(false)
  const buyRuleCount = buyRules.length

  const handleItemSelect = (item: MinedItemSearchResult) => {
    handleAddBuyRule({ itemId: item.itemId, itemName: item.name })
  }

  return (
    <PanelCard
      collapsible
      forceMount
      id="buy-rules"
      title={phrase(inventoryBuyRulesPanelTitle.slug)}
    >
      <ItemSearchDialog
        open={searchOpen}
        onOpenChange={setSearchOpen}
        onSelect={handleItemSelect}
        title={phrase(inventoryBuyRulesPanelAddBuyRule.slug)}
      />
      {buyRuleCount === 0 ? (
        <Empty>
          <EmptyHeader>
            <EmptyTitle>{phrase(inventoryBuyRulesPanelEmptyTitle.slug)}</EmptyTitle>
            <EmptyDescription>
              {phrase(inventoryBuyRulesPanelEmptyDescription.slug)}
            </EmptyDescription>
          </EmptyHeader>
          <Button variant="secondary" size="sm" onClick={() => setSearchOpen(true)}>
            <Plus className="size-3.5" />
            {phrase(inventoryBuyRulesPanelAddBuyRule.slug)}
          </Button>
        </Empty>
      ) : (
        <div className="flex flex-col gap-3">
          {buyRules.map((rule) => (
            <BuyRuleCard
              key={rule.id}
              rule={rule}
              onUpdate={handleUpdateBuyRule}
              onRemove={handleRemoveBuyRule}
              onDuplicate={handleDuplicateBuyRule}
              onLock={handleLockBuyRule}
            />
          ))}
          <button
            type="button"
            className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-md border border-white/10 border-dashed p-3 text-sm text-tertiary transition-colors hover:bg-primary/8 hover:text-secondary"
            onClick={() => setSearchOpen(true)}
          >
            <Plus className="size-3.5" />
            {phrase(inventoryBuyRulesPanelAddBuyRule.slug)}
          </button>
        </div>
      )}
    </PanelCard>
  )
}
