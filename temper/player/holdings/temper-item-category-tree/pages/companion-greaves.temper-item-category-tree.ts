import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const companionGreaves = {
  id: "01a05fcf-f7c8-7ffc-9c6f-1b343178af90",
  type: "page-type/temper-item-category-tree",
  slug: "companion-greaves",
  title: "Greaves",
  parent: "temper-item-category-tree/companion-heavy",
  displayOrder: 5,
  equipTypes: [9],
} as const satisfies TemperItemCategoryTree
