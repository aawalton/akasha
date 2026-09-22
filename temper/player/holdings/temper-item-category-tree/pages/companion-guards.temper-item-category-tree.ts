import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const companionGuards = {
  id: "01a05fcf-f7c9-7dbd-b2a5-62deefc4c7ec",
  type: "page-type/temper-item-category-tree",
  slug: "companion-guards",
  title: "Guards",
  parent: "temper-item-category-tree/companion-medium",
  displayOrder: 5,
  equipTypes: [9],
} as const satisfies TemperItemCategoryTree
