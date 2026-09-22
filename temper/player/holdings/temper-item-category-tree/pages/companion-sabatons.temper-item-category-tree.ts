import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const companionSabatons = {
  id: "01a05fcf-f7cf-732c-a359-861c739a0faf",
  type: "page-type/temper-item-category-tree",
  slug: "companion-sabatons",
  title: "Sabatons",
  parent: "temper-item-category-tree/companion-heavy",
  displayOrder: 6,
  equipTypes: [10],
} as const satisfies TemperItemCategoryTree
