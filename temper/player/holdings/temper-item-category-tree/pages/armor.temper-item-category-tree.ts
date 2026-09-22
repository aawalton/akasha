import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const armor = {
  id: "01a05fcf-f7bc-776c-96b0-33d346b903f5",
  type: "page-type/temper-item-category-tree",
  slug: "armor",
  title: "Armor",
  parent: "temper-item-category-tree/equipment",
  displayOrder: 1,
  filterTypes: [2],
} as const satisfies TemperItemCategoryTree
