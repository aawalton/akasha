import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const furnBuildingComponents = {
  id: "01a05fcf-f7eb-766b-b0b4-41e549278029",
  type: "page-type/temper-item-category-tree",
  slug: "furn-building-components",
  title: "Building Components",
  parent: "temper-item-category-tree/furn-structures",
  displayOrder: 1,
  furnitureSubcategoryIds: [116],
} as const satisfies TemperItemCategoryTree
