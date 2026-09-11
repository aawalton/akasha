import type { TemperItemCategoryTree } from "akasha/temper/holdings-sets/temper-item-category-trees/temper-item-category-tree.page-type.types.ts"

export const furnIceSnow = {
  id: "01a05fcf-f7fc-7362-8341-1aaa9c27efc7",
  type: "temper-item-category-tree",
  slug: "furn-ice-snow",
  title: "Ice and Snow",
  parent: "furn-conservatory",
  displayOrder: 8,
  furnitureSubcategoryIds: [170],
} as const satisfies TemperItemCategoryTree
