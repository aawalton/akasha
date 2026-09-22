import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const foodRagout = {
  id: "01a05fcf-f7e3-7a9f-a8bf-3abda843f704",
  type: "page-type/temper-item-category-tree",
  slug: "food-ragout",
  title: "Ragout",
  parent: "temper-item-category-tree/food",
  displayOrder: 4,
  specializedItemTypes: [5],
} as const satisfies TemperItemCategoryTree
