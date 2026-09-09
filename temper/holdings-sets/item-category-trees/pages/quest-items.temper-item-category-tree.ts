import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const questItems = {
  id: "01a05fcf-f832-70b8-af24-c20f7265b033",
  pageTypeSlug: "temper-item-category-tree",
  slug: "quest-items",
  title: "Quest Items",
  parent: "tasks",
  displayOrder: 5,
  filterTypes: [7, 26],
} as const satisfies TemperItemCategoryTree
