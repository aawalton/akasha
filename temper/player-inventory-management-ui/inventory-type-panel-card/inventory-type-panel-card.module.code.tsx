"use client"

import type { SortDirection } from "akasha/design/patterns/sort-types/sort-types.module.code.ts"
import type { InventoryTypeGroup } from "akasha/temper/items-core/inventory-grouping-types/inventory-grouping-types.module.code.ts"
import { buildInventoryTypeNodes } from "akasha/temper/items-core/inventory-type-tree-builder/inventory-type-tree-builder.module.code.ts"
import { useMemo } from "react"
import {
  InventoryPanelCard,
  type InventorySortMode,
} from "../inventory-panel-card/inventory-panel-card.module.code.tsx"

interface InventoryTypePanelCardProps {
  group: InventoryTypeGroup
  sortMode?: InventorySortMode
  sortDirection?: SortDirection
}

export function InventoryTypePanelCard({
  group,
  sortMode,
  sortDirection,
}: InventoryTypePanelCardProps) {
  const categoryId = group.category.toLowerCase().replace(/\s+/g, "-")

  const nodes = useMemo(
    () => buildInventoryTypeNodes(group.entries, group.category),
    [group.entries, group.category]
  )

  return (
    <InventoryPanelCard
      id={`inventory-${categoryId}`}
      title={group.category}
      items={nodes}
      sortMode={sortMode}
      sortDirection={sortDirection}
      actionButtonCount={1}
    />
  )
}
