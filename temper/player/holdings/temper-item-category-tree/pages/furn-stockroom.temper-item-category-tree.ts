import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const furnStockroom = {
  id: "01a05fcf-f80f-7137-bc6d-daf5effa8d9e",
  type: "page-type/temper-item-category-tree",
  slug: "furn-stockroom",
  title: "Stockroom",
  parent: "temper-item-category-tree/furn-hearth",
  displayOrder: 12,
  furnitureSubcategoryIds: [83],
} as const satisfies TemperItemCategoryTree
