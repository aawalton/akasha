import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const alFurnMat = {
  id: "01a05fcf-f7ba-762d-825a-b32fdeabe612",
  type: "page-type/temper-item-category-tree",
  slug: "al-furn-mat",
  title: "Furnishing Materials",
  parent: "temper-item-category-tree/alchemy",
  displayOrder: 0,
  filterTypes: [16],
  itemTypes: [62],
} as const satisfies TemperItemCategoryTree
