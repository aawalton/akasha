import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const furnBasins = {
  id: "01a05fcf-f7e7-7d3f-95c7-53c21395542e",
  type: "page-type/temper-item-category-tree",
  slug: "furn-basins",
  title: "Basins",
  parent: "temper-item-category-tree/furn-undercroft",
  displayOrder: 0,
  furnitureSubcategoryIds: [136],
} as const satisfies TemperItemCategoryTree
