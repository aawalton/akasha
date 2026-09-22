import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const oneHanded = {
  id: "01a05fcf-f82f-71a1-b0cb-ea1fce60aa17",
  type: "page-type/temper-item-category-tree",
  slug: "one-handed",
  title: "One-Handed",
  parent: "temper-item-category-tree/weapons",
  displayOrder: 0,
  equipTypes: [5],
} as const satisfies TemperItemCategoryTree
