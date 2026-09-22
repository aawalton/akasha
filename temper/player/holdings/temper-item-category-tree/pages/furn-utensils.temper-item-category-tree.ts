import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const furnUtensils = {
  id: "01a05fcf-f818-7910-9af3-407295ef9e65",
  type: "page-type/temper-item-category-tree",
  slug: "furn-utensils",
  title: "Utensils",
  parent: "temper-item-category-tree/furn-hearth",
  displayOrder: 13,
  furnitureSubcategoryIds: [81],
} as const satisfies TemperItemCategoryTree
