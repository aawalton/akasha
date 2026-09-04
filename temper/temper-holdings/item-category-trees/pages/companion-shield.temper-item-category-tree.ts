import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const companionShield = {
  id: "01a05fcf-f7d0-7e6d-8571-7ad4e8cf600c",
  pageTypeSlug: "temper-item-category-tree",
  slug: "companion-shield",
  title: "Shield",
  parent: "companion-armor",
  displayOrder: 0,
  equipTypes: [7],
} as const satisfies TemperItemCategoryTree
