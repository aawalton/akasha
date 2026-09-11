import type { TemperItemCategoryTree } from "akasha/temper/holdings-sets/temper-item-category-trees/temper-item-category-tree.page-type.types.ts"

export const tools = {
  id: "01a05fcf-f844-7aa5-9763-04785479ddd2",
  type: "temper-item-category-tree",
  slug: "tools",
  title: "Tools",
  parent: "miscellaneous",
  displayOrder: 3,
  itemTypes: [9],
} as const satisfies TemperItemCategoryTree
