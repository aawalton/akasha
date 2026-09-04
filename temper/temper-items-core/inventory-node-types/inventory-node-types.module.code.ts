import type { ItemTooltipInstance } from "../item-tooltip-types/item-tooltip-types.module.code.ts"

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
