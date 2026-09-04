import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const companionBelt = {
  id: "01a05fcf-f7c4-7d93-a545-ab117aef14e2",
  pageTypeSlug: "temper-item-category-tree",
  slug: "companion-belt",
  title: "Belt",
  parent: "companion-medium",
  displayOrder: 4,
  equipTypes: [8],
} as const satisfies TemperItemCategoryTree
