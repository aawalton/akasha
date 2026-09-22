import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const furnIceSnow = {
  id: "01a05fcf-f7fc-7362-8341-1aaa9c27efc7",
  type: "page-type/temper-item-category-tree",
  slug: "furn-ice-snow",
  title: "Ice and Snow",
  parent: "temper-item-category-tree/furn-conservatory",
  displayOrder: 8,
  furnitureSubcategoryIds: [170],
} as const satisfies TemperItemCategoryTree
