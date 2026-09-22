import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const furnAquatic = {
  id: "01a05fcf-f7e5-7210-9363-f4ff2e3a2c66",
  type: "page-type/temper-item-category-tree",
  slug: "furn-aquatic",
  title: "Aquatic",
  parent: "temper-item-category-tree/furn-conservatory",
  displayOrder: 0,
  furnitureSubcategoryIds: [129],
} as const satisfies TemperItemCategoryTree
