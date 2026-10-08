import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const furnPlatforms = {
  id: "01a05fcf-f808-7096-9ce4-44c3fd771373",
  type: "page-type/temper-item-category-tree",
  slug: "furn-platforms",
  title: "Platforms",
  parent: "temper-item-category-tree/furn-structures",
  displayOrder: 5,
  furnitureSubcategoryIds: [137],
  createdAt: "2026-09-02T01:51:00.104Z",
  updatedAt: "2026-09-22T20:49:49.000Z",
} as const satisfies TemperItemCategoryTree
