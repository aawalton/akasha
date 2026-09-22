import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const companionRing = {
  id: "01a05fcf-f7cf-72f7-9105-7710429ea987",
  type: "page-type/temper-item-category-tree",
  slug: "companion-ring",
  title: "Ring",
  parent: "temper-item-category-tree/companion-jewelry",
  displayOrder: 1,
  equipTypes: [12],
} as const satisfies TemperItemCategoryTree
