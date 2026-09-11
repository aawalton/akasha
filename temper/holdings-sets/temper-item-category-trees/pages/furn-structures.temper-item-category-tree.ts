import type { TemperItemCategoryTree } from "akasha/temper/holdings-sets/temper-item-category-trees/temper-item-category-tree.page-type.types.ts"

export const furnStructures = {
  id: "01a05fcf-f811-746b-9a41-df5ba1e035d9",
  type: "temper-item-category-tree",
  slug: "furn-structures",
  title: "Structures",
  parent: "furnishings",
  displayOrder: 11,
  furnitureCategoryIds: [12],
} as const satisfies TemperItemCategoryTree
