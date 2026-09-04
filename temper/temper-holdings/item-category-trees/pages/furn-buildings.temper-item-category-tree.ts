import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const furnBuildings = {
  id: "01a05fcf-f7eb-76de-97bb-7dc2f742762d",
  pageTypeSlug: "temper-item-category-tree",
  slug: "furn-buildings",
  title: "Buildings",
  parent: "furn-structures",
  displayOrder: 2,
  furnitureSubcategoryIds: [184],
} as const satisfies TemperItemCategoryTree
