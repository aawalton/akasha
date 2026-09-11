"use client"

import { PanelCard } from "akasha/design/interfaces/layout/panel-card/panel-card.module.code.tsx"
import { ItemRow } from "akasha/design/interfaces/patterns/item-row/item-row.module.code.tsx"
import { formatGold } from "akasha/design/interfaces/primitives/format-gold/format-gold.module.code.ts"
import { Text } from "akasha/design/interfaces/primitives/text-body/text-body.module.code.tsx"
import type { AffectedItem } from "akasha/temper/items-rules-core/inventory-rule-matcher-types/inventory-rule-matcher-types.module.code.ts"
import { AffectedItemsViews } from "akasha/temper/player-inventory-management-ui/affected-items-views/affected-items-views.module.code.tsx"
import {
  decideUnmappedItemsPanelState,
  type InventoryReadState,
  type UnmappedItemsPanelState,
} from "akasha/temper/player-inventory-management-ui/rules-tab-panel-states/rules-tab-panel-states.module.code.ts"
import { assertNever } from "akasha/utils/narrow/assert-never/assert-never.module.code.ts"
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
      if (entry.item.estimatedValue !== undefined) {
        totalValue = (totalValue ?? 0) + entry.item.estimatedValue * entry.item.stackCount
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
