import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const heavyArmor = {
  id: "01a05fcf-f81f-7606-9925-a09f16dbe15e",
  type: "page-type/temper-item-category-tree",
  slug: "heavy-armor",
  title: "Heavy Armor",
  parent: "temper-item-category-tree/armor",
  displayOrder: 3,
  armorTypes: [3],
} as const satisfies TemperItemCategoryTree
