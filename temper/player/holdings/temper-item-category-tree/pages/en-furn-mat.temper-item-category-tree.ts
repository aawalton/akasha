import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const enFurnMat = {
  id: "01a05fcf-f7df-7f7f-bdfd-70479dd8cf8a",
  type: "page-type/temper-item-category-tree",
  slug: "en-furn-mat",
  title: "Furnishing Materials",
  parent: "temper-item-category-tree/enchanting",
  displayOrder: 0,
  filterTypes: [17],
  itemTypes: [62],
} as const satisfies TemperItemCategoryTree
