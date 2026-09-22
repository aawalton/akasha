import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const companionEpaulets = {
  id: "01a05fcf-f7c7-749d-b127-31e9908fe11a",
  type: "page-type/temper-item-category-tree",
  slug: "companion-epaulets",
  title: "Epaulets",
  parent: "temper-item-category-tree/companion-light",
  displayOrder: 2,
  equipTypes: [4],
} as const satisfies TemperItemCategoryTree
