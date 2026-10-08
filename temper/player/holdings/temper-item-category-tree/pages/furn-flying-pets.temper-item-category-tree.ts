import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const furnFlyingPets = {
  id: "01a05fcf-f7f7-74ae-a383-17d055f2ce93",
  type: "page-type/temper-item-category-tree",
  slug: "furn-flying-pets",
  title: "Flying Pets",
  parent: "temper-item-category-tree/furn-pets",
  displayOrder: 4,
  furnitureSubcategoryIds: [41],
  createdAt: "2026-09-02T01:51:00.087Z",
  updatedAt: "2026-09-22T20:49:49.000Z",
} as const satisfies TemperItemCategoryTree
