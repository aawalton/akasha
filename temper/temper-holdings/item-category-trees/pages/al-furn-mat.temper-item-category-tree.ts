import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const alFurnMat = {
  id: "01a05fcf-f7ba-762d-825a-b32fdeabe612",
  pageTypeSlug: "temper-item-category-tree",
  slug: "al-furn-mat",
  title: "Furnishing Materials",
  parent: "alchemy",
  displayOrder: 0,
  filterTypes: [16],
  itemTypes: [62],
} as const satisfies TemperItemCategoryTree
