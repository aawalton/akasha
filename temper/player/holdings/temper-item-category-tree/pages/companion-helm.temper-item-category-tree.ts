import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const companionHelm = {
  id: "01a05fcf-f7ca-7e43-9fc7-1e1a7027be74",
  type: "page-type/temper-item-category-tree",
  slug: "companion-helm",
  title: "Helm",
  parent: "temper-item-category-tree/companion-heavy",
  displayOrder: 0,
  equipTypes: [1],
} as const satisfies TemperItemCategoryTree
