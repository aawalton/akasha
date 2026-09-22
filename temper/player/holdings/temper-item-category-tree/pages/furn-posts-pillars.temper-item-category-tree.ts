import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const furnPostsPillars = {
  id: "01a05fcf-f808-709e-9abc-83680e6b3f23",
  type: "page-type/temper-item-category-tree",
  slug: "furn-posts-pillars",
  title: "Posts and Pillars",
  parent: "temper-item-category-tree/furn-courtyard",
  displayOrder: 1,
  furnitureSubcategoryIds: [68],
} as const satisfies TemperItemCategoryTree
