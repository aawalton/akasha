import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const companionHelm = {
  id: "01a05fcf-f7ca-7e43-9fc7-1e1a7027be74",
  pageTypeSlug: "temper-item-category-tree",
  slug: "companion-helm",
  title: "Helm",
  parent: "companion-heavy",
  displayOrder: 0,
  equipTypes: [1],
} as const satisfies TemperItemCategoryTree
