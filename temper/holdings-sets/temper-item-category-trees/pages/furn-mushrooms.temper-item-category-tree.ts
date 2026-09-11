import type { TemperItemCategoryTree } from "akasha/temper/holdings-sets/temper-item-category-trees/temper-item-category-tree.page-type.types.ts"

export const furnMushrooms = {
  id: "01a05fcf-f804-70c3-8448-53e496a4e3f9",
  type: "temper-item-category-tree",
  slug: "furn-mushrooms",
  title: "Mushrooms",
  parent: "furn-conservatory",
  displayOrder: 9,
  furnitureSubcategoryIds: [142],
} as const satisfies TemperItemCategoryTree
