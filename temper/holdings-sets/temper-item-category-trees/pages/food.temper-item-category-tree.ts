import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const food = {
  id: "01a05fcf-f7e5-7171-aa4f-e30a23a7b0fb",
  pageTypeSlug: "temper-item-category-tree",
  slug: "food",
  title: "Food",
  parent: "consumables",
  displayOrder: 0,
  itemTypes: [4],
} as const satisfies TemperItemCategoryTree
