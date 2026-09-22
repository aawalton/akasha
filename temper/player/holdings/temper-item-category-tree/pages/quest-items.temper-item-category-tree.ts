import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const questItems = {
  id: "01a05fcf-f832-70b8-af24-c20f7265b033",
  type: "page-type/temper-item-category-tree",
  slug: "quest-items",
  title: "Quest Items",
  parent: "temper-item-category-tree/tasks",
  displayOrder: 5,
  filterTypes: [7, 26],
} as const satisfies TemperItemCategoryTree
