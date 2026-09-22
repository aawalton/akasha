import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const companionHeavy = {
  id: "01a05fcf-f7c9-7762-9137-7be0453b8d1d",
  type: "page-type/temper-item-category-tree",
  slug: "companion-heavy",
  title: "Heavy Armor",
  parent: "temper-item-category-tree/companion-armor",
  displayOrder: 3,
  armorTypes: [3],
} as const satisfies TemperItemCategoryTree
