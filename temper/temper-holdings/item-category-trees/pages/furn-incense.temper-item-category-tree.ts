import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const furnIncense = {
  id: "01a05fcf-f7fc-70a1-806d-4b6c229d2abe",
  pageTypeSlug: "temper-item-category-tree",
  slug: "furn-incense",
  title: "Incense",
  parent: "furn-undercroft",
  displayOrder: 2,
  furnitureSubcategoryIds: [104],
} as const satisfies TemperItemCategoryTree
