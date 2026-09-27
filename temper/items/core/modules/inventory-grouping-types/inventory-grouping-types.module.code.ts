import type {
  CategoryPath,
  ItemCategoryRoots,
} from "akasha/temper/items/core/modules/item-category-tree-types/item-category-tree-types.module.code.ts"
import type { OwnItemValues } from "akasha/temper/items/core/modules/item-tooltip-types/item-tooltip-types.module.code.ts"

export interface InventoryItemRow {
  key: string
  itemName: string
  quality: number
  itemLink?: string
  enchantHeader?: string
  enchantDescription?: string
  ownValues?: OwnItemValues
  requiredLevel?: number
  stackCount: number
  value: number | undefined
  filterType: number
  itemType: number
  specializedItemType?: number
  traitType: number
  equipType?: number
  weaponType?: number
  armorType?: number
  furnitureCategory?: string
  furnitureCategoryId?: number
  furnitureSubcategoryId?: number
  bagId?: number
  stolen?: boolean
  bound?: boolean
  replacementValue?: number
  merchantValue?: number
  saleAvg?: number
  minPrice?: number
  amountCount?: number
  saleAmountCount?: number
  suggestedPrice?: number
}

export type InventoryTypeCategory =
  | "companion"
  | "knowledge"
  | "tasks"
  | "consumables"
  | "equipment"
  | "crafting"
  | "furnishings"
  | "miscellaneous"

export const INVENTORY_TYPE_CATEGORY_ORDER: InventoryTypeCategory[] = [
  "companion",
  "knowledge",
  "tasks",
  "consumables",
  "equipment",
  "crafting",
  "furnishings",
  "miscellaneous",
]

const INVENTORY_TYPE_CATEGORY_SET = new Set<string>(INVENTORY_TYPE_CATEGORY_ORDER)

export function isInventoryTypeCategory(value: unknown): value is InventoryTypeCategory {
  return typeof value === "string" && INVENTORY_TYPE_CATEGORY_SET.has(value)
}

export function inventoryTypeCategoryOf(
  head: string | undefined,
  roots: ItemCategoryRoots
): InventoryTypeCategory {
  const id = roots.find((root) => root.name === head)?.id
  return isInventoryTypeCategory(id) ? id : "miscellaneous"
}

export interface InventoryTypeEntry {
  row: InventoryItemRow
  path: CategoryPath
}

export interface InventoryTypeGroup {
  category: InventoryTypeCategory
  entries: readonly InventoryTypeEntry[]
  totalItems: number
  occupiedSlots: number
  totalValue: number | undefined
}

export interface InventoryTypeSummary {
  totalItems: number
  occupiedSlots: number
  totalValue: number | undefined
  groups: readonly InventoryTypeGroup[]
}
