import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const furnOrnaugs = {
  id: "01a05fcf-f805-7525-bc95-62bc78a6e4df",
  pageTypeSlug: "temper-item-category-tree",
  slug: "furn-ornaugs",
  title: "Ornaugs",
  parent: "furn-mounts",
  displayOrder: 13,
  furnitureSubcategoryIds: [201],
} as const satisfies TemperItemCategoryTree
