"use client"

import type { SortDirection } from "akasha/design/interface/pattern/modules/sort-types/sort-types.module.code.ts"
import type { InventoryTypeGroup } from "akasha/temper/items/core/modules/inventory-grouping-types/inventory-grouping-types.module.code.ts"
import { buildInventoryTypeNodes } from "akasha/temper/items/core/modules/inventory-type-tree-builder/inventory-type-tree-builder.module.code.ts"
import { useItemCategories } from "akasha/temper/web/modules/item-category-tree-gate/item-category-tree-gate.module.code.tsx"
import {
  InventoryPanelCard,
  type InventorySortMode,
} from "akasha/temper/web/player-inventory-management-ui/modules/inventory-panel-card/inventory-panel-card.module.code.tsx"
import { useMemo } from "react"

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

  const categories = useItemCategories().keyed

  const nodes = useMemo(
    () => buildInventoryTypeNodes(group.entries, group.category, categories),
    [group.entries, group.category, categories]
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
