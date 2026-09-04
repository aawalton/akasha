"use client"

import { PanelCard } from "@akasha/design-layout/panel-card"
import { Empty, EmptyDescription, EmptyHeader, EmptyTitle } from "@akasha/design-patterns/empty"
import { Button } from "@akasha/design-primitives/button"
import type { MinedItemSearchResult } from "@akasha/temper-items-core/item-tooltip-types"
import type { BuyRule } from "@akasha/temper-items-rules-core/buy-rule-types"
import { Plus } from "lucide-react"
import { useState } from "react"
import { BuyRuleCard } from "../buy-rule-card/buy-rule-card.module.code.tsx"
import type { InventoryRulesHandlers } from "../inventory-rules-handlers/inventory-rules-handlers.module.code.ts"
import { ItemSearchDialog } from "../item-search-dialog/item-search-dialog.module.code.tsx"

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

  const [searchOpen, setSearchOpen] = useState(false)
  const buyRuleCount = buyRules.length

  const handleItemSelect = (item: MinedItemSearchResult) => {
    handleAddBuyRule({ itemId: item.itemId, itemName: item.name })
  }

  return (
    <PanelCard collapsible forceMount id="buy-rules" title="Buy Rules">
      <ItemSearchDialog
        open={searchOpen}
        onOpenChange={setSearchOpen}
        onSelect={handleItemSelect}
        title="Add Buy Rule"
      />
      {buyRuleCount === 0 ? (
        <Empty>
          <EmptyHeader>
            <EmptyTitle>No buy rules yet</EmptyTitle>
            <EmptyDescription>
              Buy rules maintain a global target quantity of an item by acquiring the shortfall at a
              source. New rules start inactive — activate one to let it spend gold.
            </EmptyDescription>
          </EmptyHeader>
          <Button variant="secondary" size="sm" onClick={() => setSearchOpen(true)}>
            <Plus className="size-3.5" />
            Add Buy Rule
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
            Add Buy Rule
          </button>
        </div>
      )}
    </PanelCard>
  )
}
