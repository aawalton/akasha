import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const companionJack = {
  id: "01a05fcf-f7cb-7577-a845-2891699b7f93",
  type: "page-type/temper-item-category-tree",
  slug: "companion-jack",
  title: "Jack",
  parent: "temper-item-category-tree/companion-medium",
  displayOrder: 1,
  equipTypes: [3],
} as const satisfies TemperItemCategoryTree
