import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const furnBraziers = {
  id: "01a05fcf-f7ea-72db-b437-f75b8cba3b47",
  type: "page-type/temper-item-category-tree",
  slug: "furn-braziers",
  title: "Braziers",
  parent: "temper-item-category-tree/furn-lighting",
  displayOrder: 0,
  furnitureSubcategoryIds: [123],
} as const satisfies TemperItemCategoryTree
