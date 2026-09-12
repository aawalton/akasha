import type { ItemTooltipInstance } from "akasha/temper/items-core/item-tooltip-types/item-tooltip-types.module.code.ts"

interface InventoryBranchNode {
  key: string
  label: string
  children: readonly InventoryNode[]
  slotCount?: number
  bagCapacity?: number
}

export interface InventoryLeafNode {
  key: string
  label: string
  stackCount: number
  quality?: number
  value?: number
  totalValue?: number
  slotCount?: number
  bagCapacity?: number
  replacementValue?: number
  merchantValue?: number
  saleAvg?: number
  minPrice?: number
  amountCount?: number
  saleAmountCount?: number
  suggestedPrice?: number
  itemLink?: string
  tooltipInstance?: ItemTooltipInstance
}

export type InventoryNode = InventoryBranchNode | InventoryLeafNode

export function hasAnyValue(nodes: readonly InventoryNode[]): boolean {
  for (const node of nodes) {
    if ("children" in node) {
      if (hasAnyValue(node.children)) return true
    } else if (node.totalValue !== undefined || node.value !== undefined) {
      return true
    }
  }
  return false
}
