import type { TemperItemCategoryTree } from "akasha/temper/holdings-sets/temper-item-category-trees/temper-item-category-tree.page-type.types.ts"

export const companionNecklace = {
  id: "01a05fcf-f7cd-7516-9b54-fde4dbd567ba",
  type: "temper-item-category-tree",
  slug: "companion-necklace",
  title: "Necklace",
  parent: "companion-jewelry",
  displayOrder: 0,
  equipTypes: [2],
} as const satisfies TemperItemCategoryTree
