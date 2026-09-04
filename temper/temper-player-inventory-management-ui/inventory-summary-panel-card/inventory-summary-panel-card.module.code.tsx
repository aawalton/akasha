"use client"

import type { InventoryTypeSummary } from "@akasha/temper-items-core/inventory-grouping-types"
import type { InventoryNode } from "@akasha/temper-items-core/inventory-node-types"
import { InventoryPanelCard } from "../inventory-panel-card/inventory-panel-card.module.code.tsx"

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
  title = "Summary",
  currencyCount,
  currencyGoldTotal,
  onItemClick,
  scopeNote,
  subdued,
}: InventoryTypeSummaryPanelCardProps) {
  const items: InventoryNode[] = summary.groups.map((group) => ({
    key: group.category,
    label: group.category,
    stackCount: group.totalItems,
    totalValue: group.totalValue,
    slotCount: group.occupiedSlots,
  }))

  if (currencyCount !== undefined) {
    items.push({
      key: "currencies",
      label: "Currencies",
      stackCount: currencyCount,
      totalValue: currencyGoldTotal,
    })
  }

  return (
    <InventoryPanelCard
      id="inventory-summary"
      title={title}
      items={items}
      collapseProtected
      onItemClick={onItemClick}
      actionButtonCount={0}
      scopeNote={scopeNote}
      subdued={subdued}
    />
  )
}
