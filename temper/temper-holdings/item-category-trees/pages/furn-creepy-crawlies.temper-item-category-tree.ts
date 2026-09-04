import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const furnCreepyCrawlies = {
  id: "01a05fcf-f7ef-76d9-afc6-55c1abbc665c",
  pageTypeSlug: "temper-item-category-tree",
  slug: "furn-creepy-crawlies",
  title: "Creepy Crawlies",
  parent: "furn-pets",
  displayOrder: 0,
  furnitureSubcategoryIds: [40],
} as const satisfies TemperItemCategoryTree
