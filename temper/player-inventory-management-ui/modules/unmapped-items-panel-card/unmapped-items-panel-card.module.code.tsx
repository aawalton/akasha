"use client"

import { assertNever } from "akasha/code/type/narrowing/modules/assert-never/assert-never.module.code.ts"
import { PanelCard } from "akasha/design/interface/layout/modules/panel-card/panel-card.module.code.tsx"
import { ItemRow } from "akasha/design/interface/pattern/modules/item-row/item-row.module.code.tsx"
import { formatGold } from "akasha/design/interface/primitive/modules/format-gold/format-gold.module.code.ts"
import { Text } from "akasha/design/interface/primitive/modules/text-body/text-body.module.code.tsx"
import type { AffectedItem } from "akasha/temper/items-rules-core/modules/inventory-rule-matcher-types/inventory-rule-matcher-types.module.code.ts"
import { AffectedItemsViews } from "akasha/temper/player-inventory-management-ui/modules/affected-items-views/affected-items-views.module.code.tsx"
import {
  decideUnmappedItemsPanelState,
  type InventoryReadState,
  type UnmappedItemsPanelState,
} from "akasha/temper/player-inventory-management-ui/modules/rules-tab-panel-states/rules-tab-panel-states.module.code.ts"
import { useMemo } from "react"

interface UnmappedItemsPanelCardProps extends InventoryReadState {
  items: readonly AffectedItem[]
  totalCount: number
}

function emptyHint(state: Exclude<UnmappedItemsPanelState, "items">): string {
  switch (state) {
    case "loading":
      return "Loading your inventory."
    case "no-inventory":
      return "No inventory has reached this page, so nothing has been checked against your rules."
    case "hidden-by-filter":
      return "Every unmapped item is at another location. Clear the location filter to see them."
    case "all-covered":
      return "All inventory items are covered by a rule."
    default:
      return assertNever(state)
  }
}

export function UnmappedItemsPanelCard({
  items,
  totalCount,
  isInventoryLoading,
  hasInventory,
}: UnmappedItemsPanelCardProps) {
  const total = useMemo(() => {
    let stackCount = 0
    let totalValue: number | undefined
    for (const entry of items) {
      stackCount += entry.item.stackCount
      if (entry.item.marketValue !== undefined) {
        totalValue = (totalValue ?? 0) + entry.item.marketValue * entry.item.stackCount
      }
    }
    return { stackCount, totalValue }
  }, [items])

  const state = decideUnmappedItemsPanelState({
    isInventoryLoading,
    hasInventory,
    visibleCount: items.length,
    totalCount,
  })

  return (
    <PanelCard id="unmapped-items" collapsible forceMount title="Unmapped Items">
      {state !== "items" ? (
        <Text variant="hint" className="py-4 text-center">
          {emptyHint(state)}
        </Text>
      ) : (
        <AffectedItemsViews
          items={items}
          defaultView="type"
          showFlatTab={false}
          header={
            <ItemRow
              label="Total"
              quantity={total.stackCount}
              value={total.totalValue !== undefined ? formatGold(total.totalValue) : undefined}
              accent
              actionButtonCount={1}
            />
          }
        />
      )}
    </PanelCard>
  )
}
