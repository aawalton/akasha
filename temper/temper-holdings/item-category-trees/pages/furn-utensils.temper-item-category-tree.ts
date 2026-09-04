import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const furnUtensils = {
  id: "01a05fcf-f818-7910-9af3-407295ef9e65",
  pageTypeSlug: "temper-item-category-tree",
  slug: "furn-utensils",
  title: "Utensils",
  parent: "furn-hearth",
  displayOrder: 13,
  furnitureSubcategoryIds: [81],
} as const satisfies TemperItemCategoryTree
