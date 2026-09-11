import type { TemperItemCategoryTree } from "akasha/temper/holdings-sets/temper-item-category-trees/temper-item-category-tree.page-type.types.ts"

export const furnBasins = {
  id: "01a05fcf-f7e7-7d3f-95c7-53c21395542e",
  type: "temper-item-category-tree",
  slug: "furn-basins",
  title: "Basins",
  parent: "furn-undercroft",
  displayOrder: 0,
  furnitureSubcategoryIds: [136],
} as const satisfies TemperItemCategoryTree
