import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const prFurnMat = {
  id: "01a05fcf-f832-7bda-998d-4a90603c2be7",
  type: "page-type/temper-item-category-tree",
  slug: "pr-furn-mat",
  title: "Furnishing Materials",
  parent: "temper-item-category-tree/provisioning",
  displayOrder: 0,
  filterTypes: [18],
  itemTypes: [62],
} as const satisfies TemperItemCategoryTree
