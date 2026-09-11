import type { TemperItemCategoryTree } from "akasha/temper/holdings-sets/temper-item-category-trees/temper-item-category-tree.page-type.types.ts"

export const furnRemains = {
  id: "01a05fcf-f80b-7c43-a4d4-25e5eda9d964",
  type: "temper-item-category-tree",
  slug: "furn-remains",
  title: "Remains",
  parent: "furn-undercroft",
  displayOrder: 3,
  furnitureSubcategoryIds: [74],
} as const satisfies TemperItemCategoryTree
