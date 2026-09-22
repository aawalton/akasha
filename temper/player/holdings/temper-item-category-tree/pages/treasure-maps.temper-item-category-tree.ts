import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const treasureMaps = {
  id: "01a05fcf-f845-75c6-9f8b-532f7618f8cc",
  type: "page-type/temper-item-category-tree",
  slug: "treasure-maps",
  title: "Treasure Maps",
  parent: "temper-item-category-tree/tasks",
  displayOrder: 3,
  specializedItemTypes: [100],
} as const satisfies TemperItemCategoryTree
