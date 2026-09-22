import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const furnThrones = {
  id: "01a05fcf-f814-7a5a-9573-824ff92dad2a",
  type: "page-type/temper-item-category-tree",
  slug: "furn-thrones",
  title: "Thrones",
  parent: "temper-item-category-tree/furn-gallery",
  displayOrder: 6,
  furnitureSubcategoryIds: [92],
} as const satisfies TemperItemCategoryTree
