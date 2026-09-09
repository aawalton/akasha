import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const treasureMaps = {
  id: "01a05fcf-f845-75c6-9f8b-532f7618f8cc",
  pageTypeSlug: "temper-item-category-tree",
  slug: "treasure-maps",
  title: "Treasure Maps",
  parent: "tasks",
  displayOrder: 3,
  specializedItemTypes: [100],
} as const satisfies TemperItemCategoryTree
