import type { TemperItemCategoryTree } from "akasha/temper/holdings-sets/temper-item-category-trees/temper-item-category-tree.page-type.types.ts"

export const furnPostsPillars = {
  id: "01a05fcf-f808-709e-9abc-83680e6b3f23",
  type: "temper-item-category-tree",
  slug: "furn-posts-pillars",
  title: "Posts and Pillars",
  parent: "furn-courtyard",
  displayOrder: 1,
  furnitureSubcategoryIds: [68],
} as const satisfies TemperItemCategoryTree
