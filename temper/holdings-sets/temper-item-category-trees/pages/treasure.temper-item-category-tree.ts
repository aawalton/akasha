import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const treasure = {
  id: "01a05fcf-f845-73f5-8c6c-07272ff8481c",
  pageTypeSlug: "temper-item-category-tree",
  slug: "treasure",
  title: "Treasure",
  parent: "treasures",
  displayOrder: 2,
  itemTypes: [56],
} as const satisfies TemperItemCategoryTree
