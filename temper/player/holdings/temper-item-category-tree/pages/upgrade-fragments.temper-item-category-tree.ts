import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const upgradeFragments = {
  id: "01a05fcf-f848-7e80-af66-e7f3a4d2e6a4",
  type: "page-type/temper-item-category-tree",
  slug: "upgrade-fragments",
  title: "Upgrade Fragments",
  parent: "temper-item-category-tree/knowledge-collectibles",
  displayOrder: 3,
  specializedItemTypes: [110],
} as const satisfies TemperItemCategoryTree
