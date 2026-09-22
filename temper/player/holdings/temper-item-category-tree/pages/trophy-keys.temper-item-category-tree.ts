import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const trophyKeys = {
  id: "01a05fcf-f847-74a7-8f47-afa52b06bc3d",
  type: "page-type/temper-item-category-tree",
  slug: "trophy-keys",
  title: "Keys",
  parent: "temper-item-category-tree/trophies",
  displayOrder: 0,
  specializedItemTypes: [107],
} as const satisfies TemperItemCategoryTree
