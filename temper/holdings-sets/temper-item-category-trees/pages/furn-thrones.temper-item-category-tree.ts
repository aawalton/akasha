import type { TemperItemCategoryTree } from "akasha/temper/holdings-sets/temper-item-category-trees/temper-item-category-tree.page-type.types.ts"

export const furnThrones = {
  id: "01a05fcf-f814-7a5a-9573-824ff92dad2a",
  type: "temper-item-category-tree",
  slug: "furn-thrones",
  title: "Thrones",
  parent: "furn-gallery",
  displayOrder: 6,
  furnitureSubcategoryIds: [92],
} as const satisfies TemperItemCategoryTree
