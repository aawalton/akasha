import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const furnMaps = {
  id: "01a05fcf-f800-712d-954c-692d7091eb76",
  type: "page-type/temper-item-category-tree",
  slug: "furn-maps",
  title: "Maps",
  parent: "temper-item-category-tree/furn-library",
  displayOrder: 2,
  furnitureSubcategoryIds: [63],
} as const satisfies TemperItemCategoryTree
