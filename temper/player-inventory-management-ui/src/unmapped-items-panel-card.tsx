"use client"

import { formatGold } from "@shared/design-primitives/utils/format-gold"
import { PanelCard, Text } from "@shared/design-system"
import { ItemRow } from "@shared/design-patterns/components/item-row"
import { assertNever } from "@shared/utils-narrow/assert-never"
import type { AffectedItem } from "@temper/game-items-rules-core/inventory-rule-matcher-types"
import { useMemo } from "react"
import { AffectedItemsViews } from "./affected-items-views"
import {
  decideUnmappedItemsPanelState,
  type InventoryReadState,
  type UnmappedItemsPanelState,
} from "./rules-tab-panel-states"

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
