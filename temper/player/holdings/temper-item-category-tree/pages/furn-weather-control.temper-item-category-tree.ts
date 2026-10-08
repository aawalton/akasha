import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const furnWeatherControl = {
  id: "01a05fcf-f81b-7d9a-b703-70e664d2cc9b",
  type: "page-type/temper-item-category-tree",
  slug: "furn-weather-control",
  title: "Weather Control",
  parent: "temper-item-category-tree/furn-services",
  displayOrder: 16,
  furnitureSubcategoryIds: [206],
  createdAt: "2026-09-02T01:51:00.123Z",
  updatedAt: "2026-09-22T20:49:49.000Z",
} as const satisfies TemperItemCategoryTree
