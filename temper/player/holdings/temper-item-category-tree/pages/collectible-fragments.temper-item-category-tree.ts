import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const collectibleFragments = {
  id: "01a05fcf-f7c1-7656-b545-dd52bf382aa8",
  type: "page-type/temper-item-category-tree",
  slug: "collectible-fragments",
  title: "Collectible Fragments",
  parent: "temper-item-category-tree/knowledge-collectibles",
  displayOrder: 1,
  specializedItemTypes: [109],
} as const satisfies TemperItemCategoryTree
