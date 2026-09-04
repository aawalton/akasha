import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const jcFurnMat = {
  id: "01a05fcf-f823-7a33-b37c-92b8fc0497fe",
  pageTypeSlug: "temper-item-category-tree",
  slug: "jc-furn-mat",
  title: "Furnishing Materials",
  parent: "jewelry-crafting",
  displayOrder: 0,
  filterTypes: [24],
  itemTypes: [62],
} as const satisfies TemperItemCategoryTree
