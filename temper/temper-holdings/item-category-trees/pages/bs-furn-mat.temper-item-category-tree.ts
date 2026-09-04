import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const bsFurnMat = {
  id: "01a05fcf-f7be-7425-94ec-bf8d2e4330a8",
  pageTypeSlug: "temper-item-category-tree",
  slug: "bs-furn-mat",
  title: "Furnishing Materials",
  parent: "blacksmithing",
  displayOrder: 0,
  filterTypes: [13],
  itemTypes: [62],
} as const satisfies TemperItemCategoryTree
