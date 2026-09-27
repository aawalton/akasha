"use client"

import { assertNever } from "akasha/code/type/narrowing/modules/assert-never/assert-never.module.code.ts"
import { PanelCard } from "akasha/design/interface/layout/modules/panel-card/panel-card.module.code.tsx"
import { ItemRow } from "akasha/design/interface/pattern/modules/item-row/item-row.module.code.tsx"
import { Text } from "akasha/design/interface/primitive/modules/text-body/text-body.module.code.tsx"
import type { AffectedItem } from "akasha/temper/items/rules/core/modules/inventory-rule-matcher-types/inventory-rule-matcher-types.module.code.ts"
import {
  type Phrase,
  usePhrase,
} from "akasha/temper/web/modules/use-web-phrases/use-web-phrases.module.code.tsx"
import { unmappedItemsPanelCardAllCovered } from "akasha/temper/web/phrase/pages/unmapped-items-panel-card-all-covered.temper-web-phrase.ts"
import { unmappedItemsPanelCardHiddenByFilter } from "akasha/temper/web/phrase/pages/unmapped-items-panel-card-hidden-by-filter.temper-web-phrase.ts"
import { unmappedItemsPanelCardLoading } from "akasha/temper/web/phrase/pages/unmapped-items-panel-card-loading.temper-web-phrase.ts"
import { unmappedItemsPanelCardNoInventory } from "akasha/temper/web/phrase/pages/unmapped-items-panel-card-no-inventory.temper-web-phrase.ts"
import { unmappedItemsPanelCardTitle } from "akasha/temper/web/phrase/pages/unmapped-items-panel-card-title.temper-web-phrase.ts"
import { unmappedItemsPanelCardTotal } from "akasha/temper/web/phrase/pages/unmapped-items-panel-card-total.temper-web-phrase.ts"
import { AffectedItemsViews } from "akasha/temper/web/player-inventory-management-ui/modules/affected-items-views/affected-items-views.module.code.tsx"
import { formatGold } from "akasha/temper/web/player-inventory-management-ui/modules/gold-amount/gold-amount.module.code.ts"
import {
  decideUnmappedItemsPanelState,
  type InventoryReadState,
  type UnmappedItemsPanelState,
} from "akasha/temper/web/player-inventory-management-ui/modules/rules-tab-panel-states/rules-tab-panel-states.module.code.ts"
import { useMemo } from "react"

interface UnmappedItemsPanelCardProps extends InventoryReadState {
  items: readonly AffectedItem[]
  totalCount: number
}

function emptyHint(phrase: Phrase, state: Exclude<UnmappedItemsPanelState, "items">): string {
  switch (state) {
    case "loading":
      return phrase(unmappedItemsPanelCardLoading.slug)
    case "no-inventory":
      return phrase(unmappedItemsPanelCardNoInventory.slug)
    case "hidden-by-filter":
      return phrase(unmappedItemsPanelCardHiddenByFilter.slug)
    case "all-covered":
      return phrase(unmappedItemsPanelCardAllCovered.slug)
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
  const phrase = usePhrase()
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
    <PanelCard
      id="unmapped-items"
      collapsible
      forceMount
      title={phrase(unmappedItemsPanelCardTitle.slug)}
    >
      {state !== "items" ? (
        <Text variant="hint" className="py-4 text-center">
          {emptyHint(phrase, state)}
        </Text>
      ) : (
        <AffectedItemsViews
          items={items}
          defaultView="type"
          showFlatTab={false}
          header={
            <ItemRow
              label={phrase(unmappedItemsPanelCardTotal.slug)}
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
