import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const armorTraits = {
  id: "01a05fcf-f7bb-7740-8241-b0a3cf634a6e",
  type: "page-type/temper-item-category-tree",
  slug: "armor-traits",
  title: "Armor Traits",
  parent: "temper-item-category-tree/trait-items",
  displayOrder: 0,
  itemTypes: [45],
} as const satisfies TemperItemCategoryTree
