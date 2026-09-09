import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const furnWardrobes = {
  id: "01a05fcf-f81a-7011-9c04-b59368b2f6f7",
  pageTypeSlug: "temper-item-category-tree",
  slug: "furn-wardrobes",
  title: "Wardrobes",
  parent: "furn-suite",
  displayOrder: 8,
  furnitureSubcategoryIds: [47],
} as const satisfies TemperItemCategoryTree
