import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const furnPlaced = {
  id: "01a05fcf-f807-78a4-92ba-59dc4e483593",
  type: "page-type/temper-item-category-tree",
  slug: "furn-placed",
  title: "Placed",
  parent: "temper-item-category-tree/furnishings",
  displayOrder: 16,
} as const satisfies TemperItemCategoryTree
