import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const heavyGauntlets = {
  id: "01a05fcf-f81f-76cb-aa72-41d5a5715bbb",
  type: "page-type/temper-item-category-tree",
  slug: "heavy-gauntlets",
  title: "Gauntlets",
  parent: "temper-item-category-tree/heavy-armor",
  displayOrder: 3,
  equipTypes: [13],
} as const satisfies TemperItemCategoryTree
