import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const furnIndriks = {
  id: "01a05fcf-f7fc-7b19-940b-86f129ad6a60",
  pageTypeSlug: "temper-item-category-tree",
  slug: "furn-indriks",
  title: "Indriks",
  parent: "furn-mounts",
  displayOrder: 10,
  furnitureSubcategoryIds: [210],
} as const satisfies TemperItemCategoryTree
