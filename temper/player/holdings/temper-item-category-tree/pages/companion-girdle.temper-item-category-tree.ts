import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const companionGirdle = {
  id: "01a05fcf-f7c7-7cdf-9869-ad081cfd7d42",
  type: "page-type/temper-item-category-tree",
  slug: "companion-girdle",
  title: "Girdle",
  parent: "temper-item-category-tree/companion-heavy",
  displayOrder: 4,
  equipTypes: [8],
} as const satisfies TemperItemCategoryTree
