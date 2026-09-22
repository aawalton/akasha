import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const furnPottery = {
  id: "01a05fcf-f809-737a-a32f-152023c8626d",
  type: "page-type/temper-item-category-tree",
  slug: "furn-pottery",
  title: "Pottery",
  parent: "temper-item-category-tree/furn-hearth",
  displayOrder: 10,
  furnitureSubcategoryIds: [79],
} as const satisfies TemperItemCategoryTree
