import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const companionGauntlets = {
  id: "01a05fcf-f7c7-7629-9a01-a5393ea89663",
  type: "page-type/temper-item-category-tree",
  slug: "companion-gauntlets",
  title: "Gauntlets",
  parent: "temper-item-category-tree/companion-heavy",
  displayOrder: 3,
  equipTypes: [13],
} as const satisfies TemperItemCategoryTree
