import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const bsFurnMat = {
  id: "01a05fcf-f7be-7425-94ec-bf8d2e4330a8",
  type: "page-type/temper-item-category-tree",
  slug: "bs-furn-mat",
  title: "Furnishing Materials",
  parent: "temper-item-category-tree/blacksmithing",
  displayOrder: 0,
  filterTypes: [13],
  itemTypes: [62],
} as const satisfies TemperItemCategoryTree
