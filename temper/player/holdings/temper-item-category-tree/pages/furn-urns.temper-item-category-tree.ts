import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const furnUrns = {
  id: "01a05fcf-f817-753b-a392-ce1ac3994c11",
  type: "page-type/temper-item-category-tree",
  slug: "furn-urns",
  title: "Urns",
  parent: "temper-item-category-tree/furn-undercroft",
  displayOrder: 8,
  furnitureSubcategoryIds: [77],
} as const satisfies TemperItemCategoryTree
