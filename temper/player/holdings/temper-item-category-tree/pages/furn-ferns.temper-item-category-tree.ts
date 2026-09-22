import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const furnFerns = {
  id: "01a05fcf-f7f6-7488-9734-889763fc00aa",
  type: "page-type/temper-item-category-tree",
  slug: "furn-ferns",
  title: "Ferns",
  parent: "temper-item-category-tree/furn-conservatory",
  displayOrder: 4,
  furnitureSubcategoryIds: [148],
} as const satisfies TemperItemCategoryTree
