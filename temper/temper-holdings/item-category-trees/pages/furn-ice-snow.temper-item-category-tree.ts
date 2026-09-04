import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const furnIceSnow = {
  id: "01a05fcf-f7fc-7362-8341-1aaa9c27efc7",
  pageTypeSlug: "temper-item-category-tree",
  slug: "furn-ice-snow",
  title: "Ice and Snow",
  parent: "furn-conservatory",
  displayOrder: 8,
  furnitureSubcategoryIds: [170],
} as const satisfies TemperItemCategoryTree
