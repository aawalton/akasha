import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const reagentHerbs = {
  id: "01a05fcf-f834-7a9b-8680-2ac4f03c887a",
  pageTypeSlug: "temper-item-category-tree",
  slug: "reagent-herbs",
  title: "Herbs",
  parent: "reagents",
  displayOrder: 0,
  specializedItemTypes: [150],
} as const satisfies TemperItemCategoryTree
