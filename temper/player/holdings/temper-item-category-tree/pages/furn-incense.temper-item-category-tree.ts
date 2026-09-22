import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const furnIncense = {
  id: "01a05fcf-f7fc-70a1-806d-4b6c229d2abe",
  type: "page-type/temper-item-category-tree",
  slug: "furn-incense",
  title: "Incense",
  parent: "temper-item-category-tree/furn-undercroft",
  displayOrder: 2,
  furnitureSubcategoryIds: [104],
} as const satisfies TemperItemCategoryTree
