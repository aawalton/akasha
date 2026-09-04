import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const companionHelmet = {
  id: "01a05fcf-f7ca-7b44-83e7-ea3aa2bcdfa3",
  pageTypeSlug: "temper-item-category-tree",
  slug: "companion-helmet",
  title: "Helmet",
  parent: "companion-medium",
  displayOrder: 0,
  equipTypes: [1],
} as const satisfies TemperItemCategoryTree
