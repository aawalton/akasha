import type { TemperItemCategoryTree } from "akasha/temper/holdings-sets/temper-item-category-trees/temper-item-category-tree.page-type.types.ts"

export const lightGloves = {
  id: "01a05fcf-f827-7f6d-a6d9-8a3a30b21a28",
  type: "temper-item-category-tree",
  slug: "light-gloves",
  title: "Gloves",
  parent: "light-armor",
  displayOrder: 3,
  equipTypes: [13],
} as const satisfies TemperItemCategoryTree
