import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const furnDurzogs = {
  id: "01a05fcf-f7f4-7880-8a7e-8fba747a7437",
  type: "page-type/temper-item-category-tree",
  slug: "furn-durzogs",
  title: "Durzogs",
  parent: "temper-item-category-tree/furn-mounts",
  displayOrder: 5,
  furnitureSubcategoryIds: [207],
} as const satisfies TemperItemCategoryTree
