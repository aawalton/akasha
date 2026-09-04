import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const rareFish = {
  id: "01a05fcf-f832-715c-82e8-cffc41f00b6c",
  pageTypeSlug: "temper-item-category-tree",
  slug: "rare-fish",
  title: "Rare Fish",
  parent: "treasures",
  displayOrder: 1,
  specializedItemTypes: [80],
} as const satisfies TemperItemCategoryTree
