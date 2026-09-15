import type { TemperItemCategoryTree } from "akasha/temper/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const furnOrnaugs = {
  id: "01a05fcf-f805-7525-bc95-62bc78a6e4df",
  type: "temper-item-category-tree",
  slug: "furn-ornaugs",
  title: "Ornaugs",
  parent: "furn-mounts",
  displayOrder: 13,
  furnitureSubcategoryIds: [201],
} as const satisfies TemperItemCategoryTree
