"use client"

import type { InventoryTypeSummary } from "akasha/temper/items/core/modules/inventory-grouping-types/inventory-grouping-types.module.code.ts"
import type { InventoryNode } from "akasha/temper/items/core/modules/inventory-node-types/inventory-node-types.module.code.ts"
import { useItemCategories } from "akasha/temper/web/modules/item-category-tree-gate/item-category-tree-gate.module.code.tsx"
import { usePhrase } from "akasha/temper/web/modules/use-web-phrases/use-web-phrases.module.code.tsx"
import { inventorySummaryPanelCardCurrencies } from "akasha/temper/web/phrase/pages/inventory-summary-panel-card-currencies.temper-web-phrase.ts"
import { inventorySummaryPanelCardSummary } from "akasha/temper/web/phrase/pages/inventory-summary-panel-card-summary.temper-web-phrase.ts"
import { InventoryPanelCard } from "akasha/temper/web/player-inventory-management-ui/modules/inventory-panel-card/inventory-panel-card.module.code.tsx"

interface InventoryTypeSummaryPanelCardProps {
  summary: InventoryTypeSummary
  title?: React.ReactNode
  currencyCount?: number
  currencyGoldTotal?: number
  onItemClick?: (key: string) => void
  scopeNote?: React.ReactNode
  subdued?: boolean
}

export function InventoryTypeSummaryPanelCard({
  summary,
  title,
  currencyCount,
  currencyGoldTotal,
  onItemClick,
  scopeNote,
  subdued,
}: InventoryTypeSummaryPanelCardProps) {
  const phrase = usePhrase()
  const categories = useItemCategories().keyed
  const items: InventoryNode[] = summary.groups.map((group) => ({
    key: group.category,
    label: categories[group.category]?.name ?? group.category,
    stackCount: group.totalItems,
    totalValue: group.totalValue,
    slotCount: group.occupiedSlots,
  }))

  if (currencyCount !== undefined) {
    items.push({
      key: "currencies",
      label: phrase(inventorySummaryPanelCardCurrencies.slug),
      stackCount: currencyCount,
      totalValue: currencyGoldTotal,
    })
  }

  return (
    <InventoryPanelCard
      id="inventory-summary"
      title={title ?? phrase(inventorySummaryPanelCardSummary.slug)}
      items={items}
      collapseProtected
      onItemClick={onItemClick}
      actionButtonCount={0}
      scopeNote={scopeNote}
      subdued={subdued}
    />
  )
}
