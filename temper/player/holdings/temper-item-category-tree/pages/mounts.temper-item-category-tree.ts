import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const mounts = {
  id: "01a05fcf-f82e-7289-9ad4-407e4086d0a3",
  type: "page-type/temper-item-category-tree",
  slug: "mounts",
  title: "Mounts",
  parent: "temper-item-category-tree/appearance",
  displayOrder: 4,
  itemTypes: [50],
} as const satisfies TemperItemCategoryTree
