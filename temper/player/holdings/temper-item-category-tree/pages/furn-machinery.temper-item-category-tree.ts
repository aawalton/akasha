import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const furnMachinery = {
  id: "01a05fcf-f800-7583-a49f-605585e7b858",
  type: "page-type/temper-item-category-tree",
  slug: "furn-machinery",
  title: "Machinery",
  parent: "temper-item-category-tree/furn-workshop",
  displayOrder: 1,
  furnitureSubcategoryIds: [169],
} as const satisfies TemperItemCategoryTree
