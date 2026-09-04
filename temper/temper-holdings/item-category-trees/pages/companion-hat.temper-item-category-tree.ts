import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const companionHat = {
  id: "01a05fcf-f7c9-7a87-81ac-3fac8b528ac4",
  pageTypeSlug: "temper-item-category-tree",
  slug: "companion-hat",
  title: "Hat",
  parent: "companion-light",
  displayOrder: 0,
  equipTypes: [1],
} as const satisfies TemperItemCategoryTree
