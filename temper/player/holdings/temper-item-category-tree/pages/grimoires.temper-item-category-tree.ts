import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const grimoires = {
  id: "01a05fcf-f81e-746c-a0f2-abe5708f6e12",
  type: "page-type/temper-item-category-tree",
  slug: "grimoires",
  title: "Grimoires",
  parent: "temper-item-category-tree/scribing",
  displayOrder: 0,
  specializedItemTypes: [3200],
} as const satisfies TemperItemCategoryTree
