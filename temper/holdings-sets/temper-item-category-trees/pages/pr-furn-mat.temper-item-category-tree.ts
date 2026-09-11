import type { TemperItemCategoryTree } from "akasha/temper/holdings-sets/temper-item-category-trees/temper-item-category-tree.page-type.types.ts"

export const prFurnMat = {
  id: "01a05fcf-f832-7bda-998d-4a90603c2be7",
  type: "temper-item-category-tree",
  slug: "pr-furn-mat",
  title: "Furnishing Materials",
  parent: "provisioning",
  displayOrder: 0,
  filterTypes: [18],
  itemTypes: [62],
} as const satisfies TemperItemCategoryTree
