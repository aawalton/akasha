import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const furnMushrooms = {
  id: "01a05fcf-f804-70c3-8448-53e496a4e3f9",
  type: "page-type/temper-item-category-tree",
  slug: "furn-mushrooms",
  title: "Mushrooms",
  parent: "temper-item-category-tree/furn-conservatory",
  displayOrder: 9,
  furnitureSubcategoryIds: [142],
} as const satisfies TemperItemCategoryTree
