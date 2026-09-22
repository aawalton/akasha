import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const furnBuildings = {
  id: "01a05fcf-f7eb-76de-97bb-7dc2f742762d",
  type: "page-type/temper-item-category-tree",
  slug: "furn-buildings",
  title: "Buildings",
  parent: "temper-item-category-tree/furn-structures",
  displayOrder: 2,
  furnitureSubcategoryIds: [184],
} as const satisfies TemperItemCategoryTree
