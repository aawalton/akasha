import type { TemperItemCategoryTree } from "akasha/temper/holdings-sets/temper-item-category-trees/temper-item-category-tree.page-type.types.ts"

export const furnStockroom = {
  id: "01a05fcf-f80f-7137-bc6d-daf5effa8d9e",
  type: "temper-item-category-tree",
  slug: "furn-stockroom",
  title: "Stockroom",
  parent: "furn-hearth",
  displayOrder: 12,
  furnitureSubcategoryIds: [83],
} as const satisfies TemperItemCategoryTree
