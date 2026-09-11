import type { TemperItemCategoryTree } from "akasha/temper/holdings-sets/temper-item-category-trees/temper-item-category-tree.page-type.types.ts"

export const companionHelmet = {
  id: "01a05fcf-f7ca-7b44-83e7-ea3aa2bcdfa3",
  type: "temper-item-category-tree",
  slug: "companion-helmet",
  title: "Helmet",
  parent: "companion-medium",
  displayOrder: 0,
  equipTypes: [1],
} as const satisfies TemperItemCategoryTree
