import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const furnVvardvarks = {
  id: "01a05fcf-f81a-7b67-b9ac-4be2682c674d",
  type: "page-type/temper-item-category-tree",
  slug: "furn-vvardvarks",
  title: "Vvardvarks",
  parent: "temper-item-category-tree/furn-mounts",
  displayOrder: 21,
  furnitureSubcategoryIds: [208],
} as const satisfies TemperItemCategoryTree
