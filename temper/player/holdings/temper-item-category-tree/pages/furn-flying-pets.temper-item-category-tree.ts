import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const furnFlyingPets = {
  id: "01a05fcf-f7f7-74ae-a383-17d055f2ce93",
  type: "page-type/temper-item-category-tree",
  slug: "furn-flying-pets",
  title: "Flying Pets",
  parent: "temper-item-category-tree/furn-pets",
  displayOrder: 4,
  furnitureSubcategoryIds: [41],
} as const satisfies TemperItemCategoryTree
