import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const furnHorses = {
  id: "01a05fcf-f7fb-719d-a490-6bc5109de89f",
  type: "page-type/temper-item-category-tree",
  slug: "furn-horses",
  title: "Horses",
  parent: "temper-item-category-tree/furn-mounts",
  displayOrder: 9,
  furnitureSubcategoryIds: [23],
} as const satisfies TemperItemCategoryTree
