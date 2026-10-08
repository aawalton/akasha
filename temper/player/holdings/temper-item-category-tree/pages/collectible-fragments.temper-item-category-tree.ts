import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const collectibleFragments = {
  id: "01a05fcf-f7c1-7656-b545-dd52bf382aa8",
  type: "page-type/temper-item-category-tree",
  slug: "collectible-fragments",
  title: "Collectible Fragments",
  parent: "temper-item-category-tree/knowledge-collectibles",
  displayOrder: 1,
  specializedItemTypes: [109],
  createdAt: "2026-09-02T01:51:00.033Z",
  updatedAt: "2026-09-22T20:49:49.000Z",
} as const satisfies TemperItemCategoryTree
