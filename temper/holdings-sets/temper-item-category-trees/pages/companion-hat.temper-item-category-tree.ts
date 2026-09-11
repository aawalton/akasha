import type { TemperItemCategoryTree } from "akasha/temper/holdings-sets/temper-item-category-trees/temper-item-category-tree.page-type.types.ts"

export const companionHat = {
  id: "01a05fcf-f7c9-7a87-81ac-3fac8b528ac4",
  type: "temper-item-category-tree",
  slug: "companion-hat",
  title: "Hat",
  parent: "companion-light",
  displayOrder: 0,
  equipTypes: [1],
} as const satisfies TemperItemCategoryTree
