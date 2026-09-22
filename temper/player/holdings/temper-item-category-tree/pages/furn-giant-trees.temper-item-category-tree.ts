import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const furnGiantTrees = {
  id: "01a05fcf-f7f9-78b0-8a01-bf77b9f6418f",
  type: "page-type/temper-item-category-tree",
  slug: "furn-giant-trees",
  title: "Giant Trees",
  parent: "temper-item-category-tree/furn-conservatory",
  displayOrder: 6,
  furnitureSubcategoryIds: [149],
} as const satisfies TemperItemCategoryTree
