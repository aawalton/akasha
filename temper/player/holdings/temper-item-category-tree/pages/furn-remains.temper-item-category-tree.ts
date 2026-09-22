import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const furnRemains = {
  id: "01a05fcf-f80b-7c43-a4d4-25e5eda9d964",
  type: "page-type/temper-item-category-tree",
  slug: "furn-remains",
  title: "Remains",
  parent: "temper-item-category-tree/furn-undercroft",
  displayOrder: 3,
  furnitureSubcategoryIds: [74],
} as const satisfies TemperItemCategoryTree
