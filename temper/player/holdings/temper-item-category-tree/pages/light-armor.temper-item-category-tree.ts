import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const lightArmor = {
  id: "01a05fcf-f826-74c2-9b85-d6d3b26d1006",
  type: "page-type/temper-item-category-tree",
  slug: "light-armor",
  title: "Light Armor",
  parent: "temper-item-category-tree/armor",
  displayOrder: 1,
  armorTypes: [1],
  createdAt: "2026-09-02T01:51:00.134Z",
  updatedAt: "2026-09-22T20:49:49.000Z",
} as const satisfies TemperItemCategoryTree
