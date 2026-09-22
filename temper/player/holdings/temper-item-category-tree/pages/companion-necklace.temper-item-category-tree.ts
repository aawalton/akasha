import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const companionNecklace = {
  id: "01a05fcf-f7cd-7516-9b54-fde4dbd567ba",
  type: "page-type/temper-item-category-tree",
  slug: "companion-necklace",
  title: "Necklace",
  parent: "temper-item-category-tree/companion-jewelry",
  displayOrder: 0,
  equipTypes: [2],
} as const satisfies TemperItemCategoryTree
