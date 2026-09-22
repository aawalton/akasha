import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const furnEnvironment = {
  id: "01a05fcf-f7f5-7f8f-9e27-5348d8e023f9",
  type: "page-type/temper-item-category-tree",
  slug: "furn-environment",
  title: "Environment",
  parent: "temper-item-category-tree/furn-miscellaneous",
  displayOrder: 1,
  furnitureSubcategoryIds: [166],
} as const satisfies TemperItemCategoryTree
