import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.types.ts"

export const tools = {
  id: "01a05fcf-f844-7aa5-9763-04785479ddd2",
  pageTypeSlug: "temper-item-category-tree",
  type: "temper-item-category-tree",
  slug: "tools",
  title: "Tools",
  parent: "miscellaneous",
  displayOrder: 3,
  itemTypes: [9],
} as const satisfies TemperItemCategoryTree
