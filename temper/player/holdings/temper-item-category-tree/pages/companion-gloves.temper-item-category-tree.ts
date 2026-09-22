import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const companionGloves = {
  id: "01a05fcf-f7c7-774c-90c9-abfc6c553c76",
  type: "page-type/temper-item-category-tree",
  slug: "companion-gloves",
  title: "Gloves",
  parent: "temper-item-category-tree/companion-light",
  displayOrder: 3,
  equipTypes: [13],
} as const satisfies TemperItemCategoryTree
