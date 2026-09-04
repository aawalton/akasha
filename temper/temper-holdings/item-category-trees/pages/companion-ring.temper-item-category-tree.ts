import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const companionRing = {
  id: "01a05fcf-f7cf-72f7-9105-7710429ea987",
  pageTypeSlug: "temper-item-category-tree",
  slug: "companion-ring",
  title: "Ring",
  parent: "companion-jewelry",
  displayOrder: 1,
  equipTypes: [12],
} as const satisfies TemperItemCategoryTree
