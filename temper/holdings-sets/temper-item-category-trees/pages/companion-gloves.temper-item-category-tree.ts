import type { TemperItemCategoryTree } from "akasha/temper/holdings-sets/temper-item-category-trees/temper-item-category-tree.page-type.types.ts"

export const companionGloves = {
  id: "01a05fcf-f7c7-774c-90c9-abfc6c553c76",
  type: "temper-item-category-tree",
  slug: "companion-gloves",
  title: "Gloves",
  parent: "companion-light",
  displayOrder: 3,
  equipTypes: [13],
} as const satisfies TemperItemCategoryTree
