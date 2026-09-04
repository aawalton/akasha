import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const furnEsoPlus = {
  id: "01a05fcf-f7f6-7a2d-b328-7f2cf2f40639",
  pageTypeSlug: "temper-item-category-tree",
  slug: "furn-eso-plus",
  title: "ESO Plus",
  parent: "furn-gallery",
  displayOrder: 2,
  furnitureSubcategoryIds: [183],
} as const satisfies TemperItemCategoryTree
